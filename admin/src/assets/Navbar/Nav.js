// import sbag from '../sbag.png'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Nav.css';
// import { useContext, useState } from 'react';
// import { Link } from "react-router-dom";
// import { ShopContext } from '../../../Context/ShopContext';

// const Navs = () => {
//   const[menu,setMenu]=useState("shop")
//   const{getTotalCartItems}=useContext(ShopContext)

//   return (
//     <header className='navbars '>
   
//       <div className='nav-logo'> 
//       <img src={sbag} alt='logo' height={30}></img>
//       <p>SHOPPY</p>
//       </div>
//       <ul className='nav-menu text-decoration-none'>
//         {/* change hr */}
//         <li onClick={()=>{setMenu("shop")}}><Link to='/' className='text-decoration-none'>Shop</Link>{menu==="shop"?<hr/>:<></>} </li>
//         <li onClick={()=>{setMenu("mens")}}><Link to='/mens' className='text-decoration-none'>Men</Link> {menu==="mens"?<hr/>:<></>} </li>
//         <li onClick={()=>{setMenu("womens")}}><Link to='/womens' className='text-decoration-none'>Women</Link> {menu==="womens"?<hr/>:<></>}</li>
//         <li onClick={()=>{setMenu("kids")}}><Link to='/kids' className='text-decoration-none'>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
//       </ul>
//       <div className='nav-login flex align-items-center'> 
//         <Link to='/signUp' className='text-decoration-none'>
//             <button>Login</button>
//         </Link>
//         <Link to='/cart' className='text-decoration-none'>
//            <img src={'image/cart.png'} alt='logo' height={30}></img>
//         </Link>
//         <div className='nav-cart-count'>{getTotalCartItems()}</div>
//       </div>
//     </header>
//   )
// };

// export default Navs;