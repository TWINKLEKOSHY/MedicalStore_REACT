
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";
import './Navbar.css';

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch ();
    const navigate= useNavigate();
    function logout(){
        if(user){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
                headers:{'Authorization':"Bearer "+ user.token}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    }
  return (

<header class="header">
<div class="logo">MEDSHOP</div>
<nav class="nav-menu">
  <ul>
    <li><NavLink to={"/"} className="navlink"> Home</NavLink></li>
    <li>{user?<NavLink to={"/blog/posts"} className="navlink">Medicine</NavLink>:<NavLink to={"/login"} className="navlink"> 
    Medicine</NavLink>}</li>
    <li><NavLink to={"/SignUp"} className="navlink">SignUp</NavLink></li>
    {user?<li><span onClick={logout}>Logout</span></li>:<li>
          <NavLink to={"/login"} className="navlink">Login </NavLink></li>}
  </ul>
</nav>
</header>
    );
}

export default Navbar;