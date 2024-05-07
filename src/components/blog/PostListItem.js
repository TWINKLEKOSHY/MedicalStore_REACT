
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostListItem(props) {
    const user = useSelector(store => store.auth.user);
    const token = user?.token;
    const [showModal, setShowModal] = useState(false);

    const deletePost = () => {
        axios.delete('https://medicalstore.mashupstack.com/api/medicine/' + props.post.id, {
            headers: { 'Authorization': "Bearer " + token }
        }).then(response => {
            props.refresh();
        }).catch(error => {
            console.error("Error deleting post: ", error.message);
        });
        setShowModal(false); // Close modal after delete operation
    }

    return (
        <div className="card">
            <div className="card-body">
                {props.post.name}
                <button className="btn btn-primary float-right btn-danger ml-2" onClick={() => setShowModal(true)}>Delete</button>
                <Link to={"/blog/posts/" + props.post.id + "/edit"} className="btn btn-primary float-right" style={{marginLeft:'9px'}}>Edit</Link>
                <Link to={"/blog/posts/" + props.post.id} className="btn btn-warning float-right">View</Link>
            </div>

            {/* Modal for confirming delete operation */}
            {showModal &&
               <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: '0', right: '0', bottom: '0', left: '0' }}>
               <div className="modal-dialog" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Confirm Delete</h5>
                     <button type="button" className="close" onClick={() => setShowModal(false)}>
                    <span aria-hidden="true">&times;</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     Are you sure you want to delete this post?
                   </div>
                   <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                     <button type="button" className="btn btn-danger" onClick={deletePost}>Delete</button>
                   </div>
                 </div>
               </div>
             </div>
            }
        </div>
    );
}

export default PostListItem;