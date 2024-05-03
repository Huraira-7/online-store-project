import Trade from "../models/trade.js";
import User  from "../models/user.js";
import Offer  from "../models/offer.js";

const tradeController = {

    async createtrade(req,res,next) {
        // console.log("create_trade-----",req.body);
        const {title, desc, conditions, username} = req.body;

        let trade;
        try {
              const tradeToAdd = new Trade({
                title,
                description : desc,
                conditions,
                list_offers: []
            });
      
            trade = await tradeToAdd.save();

        } catch (error) { console.log("one",error); return next(error);  }

        try {

            let user = await User.findOne({ username });
            user.trades.push(trade._id); 
            await user.save();

        } catch (error) { console.error("two", error);  return next(error); }

        return res.status(201).json({ trade:trade});
    },

    async acceptoffer(req,res,next) {
        // console.log("accept_offer & end_trade-----",req.body);
        const { username, offer_id, trade_id} = req.body;
        try {
            let trade = await Trade.findById(trade_id);
            trade.accepted_offer = offer_id; 
            await trade.save();

            let user = await User.findOne({ username });
            let offer = await Offer.findById(offer_id);
            user.cash -= offer.cash_offered;
            user.num_owned_items -= offer.list_items_offered.length;
            await user.save();

            return res.status(200).json({ trade:trade});
        } catch (error) { console.error("one", error);  return next(error); }

    },

    async declineoffer(req,res,next) {
        // console.log("decline_offer-----",req.body);
        const {offer_id, trade_id} = req.body;
        try {
            let trade = await Trade.findById(trade_id);
            trade.list_offers = trade.list_offers.filter(offer => offer.toString() !== offer_id);
            await trade.save();

            let offer = await Offer.findById(offer_id);
            offer.is_rejected = true;
            await offer.save();

            return res.status(200).json({ trade:trade});
        } catch (error) { console.error("one", error);  return next(error); }

    },

    async gettradesandoffersforthisuser(req,res,next){
        const { username } = req.body;
        let user = await User.findOne({username});   
        let trades = [];
        // console.log("got trades for ", username);
        try{
            for(var idx in user.trades){
                const trade = await Trade.findById(user.trades[idx]);
                trades.push(trade);
            }
        } catch(error) { console.error("one",error);  return next(error);}

        let alloffers_sent = await Offer.find({ sender: user._id });
        let offers = []
        try{
            for(var idx in alloffers_sent){
                const trade = await Trade.findById(alloffers_sent[idx].trade);
                if (trade.accepted_offer == undefined)  {  
                    let flag = 0;
                    for(var idxx in trade.list_offers){
                        if (trade.list_offers[idxx]._id.toString() == alloffers_sent[idx]._id.toString()){
                            flag = 1;  
                            break;
                        }
                    }
                    if (flag == 1 ) {offers.push({...alloffers_sent[idx], status:"pending"}); }
                    else {offers.push({...alloffers_sent[idx], status:"rejected"}); }
                } else {
                    if(trade.accepted_offer.toString() == alloffers_sent[idx]._id.toString()){
                        offers.push({...alloffers_sent[idx], status:"accepted"});   
                    } else{
                        offers.push({...alloffers_sent[idx], status:"rejected"}); 
                    }
                }
            }
            return res.status(200).json({ trades: trades, offers: offers });

        } catch(e) { console.error("two",e);  return next(e); }
        // console.log("got offers for ", username);

    },

    async getongoingtrades(req,res,next){
        try {
            const ongoingTrades = await Trade.find({ accepted_offer: {  $exists: false } });
            // let trades = [];
            // const { username } = req.body;
            // let user = await User.findOne({username});  
            // if(user.trades.length === 0) {trades = ongoingTrades}
            // else{
            //     for(var idx in ongoingTrades){
            //         let tid = ongoingTrades[idx]._id;
            //         for (var idx2 in user.trades){
            //             let tid2 = user.trades[idx2];
            //             if (tid.toString() != tid2.toString()) { trades.push(ongoingTrades[idx]); }
            //         }
            //     }
            // }
            // return res.status(200).json({trades: trades});
            return res.status(200).json({trades: ongoingTrades});

        } catch (error) {  console.error("one",error);  return next(error);    }
    },


}

export default tradeController;