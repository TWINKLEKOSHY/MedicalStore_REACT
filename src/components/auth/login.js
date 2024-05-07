
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSignUp = () => {
      navigate("/SignUp");
    };

    
    function attemptLogin() {
        axios.post('https://medicalstore.mashupstack.com/api/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user));
            navigate("/");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    return (<div>

        <Navbar/>
        <div className="main">
        <div className="formcontainer">
                    <h1>Login</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="formgroup">
                        <label>Email</label>
                        <input type="text" placeholder="Enter  email"
                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div>
                    <div className="formgroup">
                        <label>Password</label>
                        <input type="password" placeholder="Enter  password"
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="formgroup">
                        <button type='submit' onClick={attemptLogin}>Login</button>
                    </div>
                    <div className="row mt-3">
        <div className="col-12 text-center">
          <h6>Register here..&nbsp;</h6>
          <button
            className="btn btn-success mt-1"
            onClick={handleSignUp}>
            Register
          </button>
        </div>
      </div>
                </div>
        </div>
    </div>)
}

export default Login;