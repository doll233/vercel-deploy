import './Nav.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar =()=>{
    return(
        <div className='navbaro '>
            <div className='logo d-flex'>
                 <img src='./images/sbag.png' alt="nav-logo" className='nav-logo w-auto' style={{height:'30px'}}></img>
                 <h3>Shoppy</h3>
            </div>
            <div className='profile'>
                <img src='./images/nav-profile2.jpg' alt="nav-profile"  className='nav-profile w-auto' style={{height:'30px'}}></img>
            </div>
        </div>
    )
}

export default Navbar