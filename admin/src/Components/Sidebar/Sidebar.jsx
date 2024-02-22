import { Link } from 'react-router-dom'
import './Sidebar.css'

const Sidebar= () =>{
    return(
        <div className='sidebar  '>
            <Link to={'/addproduct'} style={{textDecoration:"none"}}>
                <div className='sidebar-item '>
                    <img src='images/addprd.png' alt='addproduct-icon'></img>
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={'/listproduct'} style={{textDecoration:"none"}}>
                <div className='sidebar-item'>
                    <img src='images/listprd.jpg' alt='listproduct-icon'></img>
                    <p>Product List</p>
                </div>
            </Link>
           
        </div>
    )
}

export default Sidebar