const port = 4000;
const express = require("express");
const app = express();
const mogoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { log, error } = require("console");

app.use(express.json());
app.use(cors());

// DB connection with mongodb

mogoose.connect("mongodb+srv://patelsaxi26:shoppy@cluster0.ygmljtk.mongodb.net/shoppy")

//Api Creation

app.get("/",(req,res)=>{
    res.send("Express app is running!")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// creating Upload endpoint of image
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

const Product = mogoose.model('Product',{
    id:{
        type:Number,
        require:true,
    },
    name:{
        type:String,
         require:true,
    },
    image:{
        type:String,
         require:true,
    },
    category:{
        type:String,
        require:true,
    },
    new_price:{
        type:Number,
         require:true,
    },
    old_price:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

// app.post('/addproduct',async(req,res)=>{
//     let products = await Product.find({});
//     let id;
//     if(products.length>0){
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id = last_product.id+1;
//     }
//     else{
//         id=1;
//     }
//     const product = new Product({
//         id:id,
//         name:req.body.name,
//         image:req.body.image,
//         category:req.body.category,
//         new_price:req.body.new_price,
//         old_price:req.body.old_price,
//     })
//     console.log(product);
//     await product.save();
//     console.log("saved")
//     res.json({
//         success:true,
//         name:req.body.name,
//     })
// })

// // create api for delete product

// app.post('/removeproduct',async(req,res)=>{
//     await Product.findOneAndDelete({id:req.body.id})
//     console.log("removedd");
//     res.json({
//         success:true,
//         name:req.body.name,
//     })
// })

// // create Api for getting all products

// app.get('/allproducts',async(req,res)=>{
//     let products = await Product.find({});
//     console.log("All Products Fetched");
//     res.send(products);
// })

// Add error handling and request validation
app.post('/addproduct', async (req, res) => {
    try {
        if (!req.body.name || !req.body.image || !req.body.category || !req.body.new_price || !req.body.old_price) {
            return res.status(400).json({ success: false, error: "Missing required fields." });
        }

        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("Product saved:", product);
        res.json({ success: true, product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Add error handling
app.post('/removeproduct', async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(400).json({ success: false, error: "Missing product ID." });
        }

        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product removed:", req.body.id);
        res.json({ success: true, id: req.body.id });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Ensure consistent response format
app.get('/allproducts', async (req, res) => {
    // try {
    //     let products = await Product.find({});
    //     console.log("All Products Fetched:", products.length);
    //     res.json({ success: true, products });
       
    // } catch (error) {
    //     console.error("Error fetching all products:", error);
    //     res.status(500).json({ success: false, error: "Internal Server Error" });
    // }
    let products = await Product.find({});
    console.log("All Products Fetched");
     res.send(products);
});

//Scema creation For USER model

const Users = mogoose.model('Users',{
   
    name:{
        type:String
    },
   
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating End Point of Registering User

app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});

    if (check) {
        return res.status(400).json({success:false,errors:"Existing UserFound WithSame EmailID"})
    } 

    let cart = {}
    for (let i = 0; i < 300; i++) {
         cart[i]=0;   
    }
    const user = new Users({
        name:req.body.user,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,

    })
    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// End Point Of User Login

app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data={
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
           
        }
        else{
            res.json({success:false,errors:"Wrong Password!"})
        }
    }
    else{
        res.json({success:false,errors:"Wrong EmailID !"})
    }
})
//Creating End Point of Popular in Women

app.get('/popwomen',async(req,res)=>{
    // let products = await Product.find({category:"womens"});
    // let popwomen =  products.slice(0,4);
    // console.log("Pop Women Fetched !");
    // res.send(popwomen);

    try {
        let products = await Product.find({ category: "womens" });

        if (products.length === 0) {
            return res.status(404).send("No products found for women's category.");
        }

        let popwomen = products.slice(0, 4);
        console.log("Pop Women Fetched !");
        res.send(popwomen);
        } 
        catch (error) {
            console.error("Error fetching popular women's products:", error);
            res.status(500).send("Internal Server Error");
        }

})

//Creating End Point of New Collection data

app.get('/newcollection',async(req,res)=>{
    let products = await Product.find({});
    let newcollection =  products.slice(1).slice(-4)
    console.log("New Collection Fetched !");
    res.send(newcollection);

})

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
      try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
      } catch (error) {
        res.status(401).send({ errors: "Please authenticate" });
      }
    }
  };
  
  // Creating End Point of adding Product in cartdata
  
//   app.post('/addtocart', fetchUser, async (req, res) => {
//     // console.log(req.body, req.user);
//     console.log("add",req.body.itemId)

//     let userData = await Users.findOne({_id:req.user.id});
//     userData.cartData[req.body.itemId] += 1;

//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
//     res.send("Added")
//   });

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("add", req.body.itemID);
  
    try {
      let userData = await Users.findOne({ _id: req.user.id });
  
      if (!userData.cartData) {
        userData.cartData = {};
      }
  
    //   userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
       userData.cartData[req.body.itemID] += 1;

  
      await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
      res.send("Added");
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
  // Creating End Point of remove Product in cartdata
  app.post('/remove', fetchUser, async (req, res) => {
    console.log("remove",req.body.itemID);
   
    try {
        let userData = await Users.findOne({ _id: req.user.id });
    
        if (!userData.cartData) {
          userData.cartData = {};
        }
    
      //   userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
         userData.cartData[req.body.itemID] -= 1;
  
    
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
      } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).send("Internal Server Error");
      }
  });

  //Get cart data 

  app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
  })

app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port" +port)
    }
    else{
        console.log("Error:"+error)
    }
})
