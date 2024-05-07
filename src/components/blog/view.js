import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";


function ViewPost() {
    var user = useSelector(store=>store.auth.user);
    var token = user?.token
    var {postId} = useParams()
    var [post,setPost] = useState({name:'',company:'',expiry_date:''})

    const specifiedDate = new Date("2024-03-28");
    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+postId, {
            headers:{'Authorization':"Bearer "+ token}} ).then(response=>{
            setPost(response.data)
        })
    },[postId ,token]);

    // // Function to check if date is after specified date
    const isDateAfterSpecified = (date) => {
        const postDate = new Date(date);
        return postDate > specifiedDate;
    };

    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-12" style={{margin : '50px'}}>
                    <div className="card">
                        <div className="card-header "><h3> {post.name}</h3></div>
                        <div className="card-body "> {post.company}</div>
                        {/* <div className="card-body"> {post.expiry_date}</div> */}
                        <div className="card-body" style={{ color: isDateAfterSpecified(post.expiry_date) ? 'red' : 'green' }}>
                                {post.expiry_date}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(ViewPost);