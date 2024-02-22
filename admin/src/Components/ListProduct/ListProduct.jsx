import { useEffect } from "react";
import { useState } from "react";
import './ListProduct.css'

const ListProduct=()=>{
    const[allProducts,setAllProducts] = useState([])

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setAllProducts(data);
            });
    }
    
    useEffect(()=>{
        fetchInfo()
    },[])

    const removeprd = async(id) =>{
        await fetch('http://localhost:4000/removeproduct',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
      
        await fetchInfo();
    }
    
    return(
    <div className="list-prd">
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="listprd-allprd">
            <hr/>
            {
                allProducts.map((product,index)=>{
                    return(
                        <>
                        <div key={index} className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="image" className="listprd-icon"></img>
                        <p>{product.name}</p>
                        <p>{product.old_price}</p>
                        <p>{product.new_price}</p>
                        <p>{product.category}</p>
                       <img src="./dustbin.jpg" height={'30px' } alt='remove' className="cross-icon" onClick={()=>{removeprd(product.id)}}></img>
                    </div>
                    <hr/>
                    </>
                    )
                    
                })
            }
        </div>
    </div>
)
}

export default ListProduct;