// import User  from "../models/user.js";
import Image from "../models/image.js";
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
            return res.status(200).json({ products: products});
        } catch(e) {  console.log("one",e); return next(e);  }
    },

    async fetchinitialdata(req,res,next){
        let products; 
        let titles = [];
        let categoriesdone = []; //one product, latest product, best selling product from all categories
        try {
            products = await Product.find();
            for (var i in products) {  titles.push(products[i].title) }   // fetch ids,titles of all products to use for search
            return res.status(200).json({ titles, });
        }  catch(e) {  console.log("one",e); return next(e);  }
        // fetch home page navbar images
        // save it to redux state on home page so reloading isnt required when come back to home page 
    }
}

export default productController;