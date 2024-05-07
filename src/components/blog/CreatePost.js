
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CreatePost() {
    var user = useSelector(store=>store.auth.user);
    var token = user?.token
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    var navigate = useNavigate()
    function addPost() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{
            name: name,
            company: company,
           expiry_date : expiry_date
        },{
            headers:{'Authorization':"Bearer "+ token}}).then(response=>{
            navigate('/blog/posts')
        })
    }
    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4 m-4">
                   
                    <h1 className="text-center mb-5">Add Medicine</h1>
                    <div className="row mb-3">
                       <br/> <label className="col-sm-4 col-form-label">Name</label>
                       <div className="col-sm-8">
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Company</label>
                        <div className="col-sm-8">
                        <input 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-4 col-form-label">Expiry Date</label>
                        <div className="col-sm-8">
                        <input 
                        type="date" 
                        className="form-control" 
                        value={expiry_date} 
                        onChange={(event)=>{setExpiry_date(event.target.value)}}
                        required/>
                        </div>  
                    </div>

                    <div className="row">
                        <div className="offset-sm-4 col-sm-4 d-grid"> 
                        <button className="btn btn-success " onClick={addPost}>Submit</button>
                        </div>
                        <div class="col-sm-4 d-grid">
				            <Link to="/blog/posts" className="btn btn-outline-danger"  role="button">Cancel</Link>	
	                    </div>   
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default checkAuth(CreatePost);