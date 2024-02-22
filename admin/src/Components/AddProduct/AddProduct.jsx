import { useState } from 'react';
import './AddProduct.css'


const AddProduct =()=>{

    const[image,setImage]=useState(false)
    const[productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"womens",
        old_price:"",
        new_price:""
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0])
    }

    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product =async(e)=>{
        console.log(productDetails);
        let responseData;
        let product = { ...productDetails }; // Create a copy of productDetails


        let formData = new FormData();
        formData.append('product',image)

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((res)=>res.json()).then((data)=>{responseData = data})

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
        
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(product),
            })
            .then((res) => res.json())
            .then((data) => {
                data.success ? alert("Product Added") : alert("Failed");
            });
        }
        

    }

    return(
        <div className='addproduct'>
            <div className='addprd-itemField'>
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type Here '></input>
            </div>
            <div className='addprd-price'>
                <div className='addprd-itemField'>
                    <p>Old Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type Here '></input>
                </div>
                <div className='addprd-itemField'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type Here '></input>
                 </div>
            </div>
            <div className='addprd-itemField'>
                <p>Product Category</p>
                <select name='category' className='addprd-selector' value={productDetails.category} onChange={changeHandler} >
                    <option value="womens">Women</option>
                    <option value="mens">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <div className='addprd-itemField'>
               <label htmlFor='file-input'>
               <img className='addproduct-thumbnail-img' src={image ? URL.createObjectURL(image) : './images/upload_img.jpg'} alt='upload_img'></img>

               </label>
               <input onChange={imageHandler} type='file' name='image' id='file-input' hidden></input>
            </div>
            <button onClick={()=>{Add_Product()}} className='addprd-btn' style={{marginTop:"20px",width:'160px',height:'50px',borderRadius:'6px',background:"#6079ff",border:"none",cursor:'pointer',color:'white',fontSize:'16px',fontWeight:"500"}}>Add</button>
        </div>
    )
}

export default AddProduct;