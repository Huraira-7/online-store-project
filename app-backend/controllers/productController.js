// import User  from "../models/user.js";
// import Trade from "../models/trade.js";
import Product from "../models/product.js";

const productController = {

    async addproduct(req,res,next) {
        const {title,description,category,price} = req.body
        try{
            let product;
             const productToAdd = new Product({
                images : [req.file.filename],
                title : title,
                category : category,
                description : description,
                price: price,
                is_deleted: false,
                is_out_stock: false,
            });
            product = await productToAdd.save();
            return res.status(201).json({product:product});
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
            return res.status(200).json({ products: products});
        } catch(e) {  console.log("one",e); return next(e);  }
    }
}

export default productController;