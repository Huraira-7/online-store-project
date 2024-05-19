import Image from "../models/image.js";
import User from "../models/user.js";
import Product from "../models/product.js";

const productController = {

    async addproduct(req,res,next) {
        const {title,description,category,price} = req.body
        try{
            let product;
             const productToAdd = new Product({
                images : [
                    new Image({
                        imagestring: req.file.filename,
                        is_deleted : false
                    })
                ],
                title : title,
                category : category,
                description : description,
                price: price,
                is_deleted: false,
                is_out_stock: false,
                best_selling: false,
                date: Date.now()
            });
            product = await productToAdd.save();
            return res.status(201).json({product:product});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async editproduct(req,res,next) {
        const {_id,title,description,price,is_out_stock,best_selling,imgdel} = req.body
        try{
            let product = await Product.findById(_id);
            product.title = title;
            product.description = description;
            if(product.price != price) {  product.oldprice = product.price;  }
            product.price = price;
            product.is_out_stock = is_out_stock;
            product.best_selling = best_selling;
            for (var i in product.images) {
                product.images[i]['is_deleted'] = imgdel[i];
            }
            await product.save();
            return res.status(202).json({product:product});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async editproductaddphoto(req,res,next) {
        const {_id,title,description,price,is_out_stock,best_selling,imgdel} = req.body
        try{
            let product = await Product.findById(_id);
            product.title = title;
            product.description = description;
            if(product.price != price) {  product.oldprice = product.price;  }
            product.price = price;
            product.is_out_stock = is_out_stock;
            product.best_selling = best_selling;
            for (var i in product.images) {
                product.images[i]['is_deleted'] = imgdel[i];
            }
            product.images.push(new Image({
                imagestring: req.file.filename,
                is_deleted : false
            }))
            await product.save();
            return res.status(202).json({product:product});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async deleteproduct(req,res,next) {
        const {_id} = req.body
        try{
            let product = await Product.findByIdAndDelete(_id);
            return res.status(202).json({product:product});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async fetchproductbycategory(req,res,next){
        const  {category} = req.body;
        let products; 
        try {
            products = await Product.find({category});
            return res.status(200).json({ products: products});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async fetchallproducts(req,res,next){
        let products; 
        try {
            products = await Product.find();
            let user = await User.findOne({role:'downtime'});
            let down = user.email === 'false' ? false : true
            return res.status(200).json({ products: products, down});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async fetchinitialdata(req,res,next){
        let products; 
        let titles = [];
        let latestproducts;
        let bestselling;
        let sale = [];
        let categorywise = {};
        // const categories = new Set(['Earrings', 'Necklace', 'Bracelet', 'Beauty', 'Rings']); // Set of valid categories
        try {
            products = await Product.find();
            if(products.length>0){
                for (const item of products) {
                    if (!categorywise[item.category]) { categorywise[item.category] = item; }
                }
                for (var i in products) {  
                    titles.push({'title':products[i].title,'category':products[i].category,'img':products[i].images[0].imagestring,'id':products[i]._id})  // fetch ids,titles of all products to use for search
                    if(products[i].oldprice && products[i].oldprice > products[i].price) { sale.push(products[i])  }
                }   
                
                latestproducts = products.sort((a, b) => b.date - a.date).slice(0, 5);  //store fresh arrivals
                bestselling = products.filter(item => item.best_selling === true);   //store best selling products
            }
            let user = await User.findOne({role:'downtime'});
            let down = user.email === 'false' ? false : true
            return res.status(200).json({ titles, latestproducts, bestselling, categorywise,  products, sale, down });
        }  catch(e) {  console.log("one",e); return next(e);  }
        // fetch home page navbar images
        // fetch home page titles on top
        // save all of it to redux state on home page so reloading isnt required when come back to home page 
    },

    
}

export default productController;