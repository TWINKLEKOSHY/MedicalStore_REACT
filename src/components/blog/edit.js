import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import checkAuth from '../auth/checkAuth';
import { useSelector } from 'react-redux';
import ResponseModal from '../ResponseModal';
import { Link } from 'react-router-dom';

function EditPost() {
  var user = useSelector((store) => store.auth.user);
  var token = user?.token;
  const { postId } = useParams();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [expiry_date, setExpiry_date] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://medicalstore.mashupstack.com/api/medicine/' + postId, {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then((response) => {
        setName(response.data.name);
        setCompany(response.data.company);
        setExpiry_date(response.data.expiry_date);
      });
  }, [postId, token]);

  function updatePost() {
    axios
      .post(
        'https://medicalstore.mashupstack.com/api/medicine/' + postId,
        {
          name: name,
          company: company,
          expiry_date: expiry_date,
        },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      )
      .then((response) => {
        setResponseMessage(response.data.message);
        handleShowModal();
      });
    
  }

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/blog/posts'); // Navigate after closing modal
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto rounded border p-4 m-4">
            <h1 className="text-center mb-5">Edit Medicine</h1>
            <div className="row mb-3">
              <label className='col-sm-4 col-form-label'>Name</label>
              <div className='col-sm-8'>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              </div>
            </div>
            <div className="row mb-3">
              <label className='col-sm-4 col-form-label'>Company</label>
              <div className='col-sm-8'>
              <input
                className="form-control"
                value={company}
                onChange={(event) => {
                  setCompany(event.target.value);
                }}
              />
              </div>
            </div>
            <div className="row mb-3">
              <label className='col-sm-4 col-form-label'>ExpiryDate</label>
              <div className='col-sm-8'>
              <input
                type="date"
                className="form-control"
                value={expiry_date}
                onChange={(event) => {
                  setExpiry_date(event.target.value);
                }}
              />
              </div>
            </div>

            <div className="row">
              <div className='offset-sm-4 col-sm-4 d-grid'>
              <button
                className="btn btn-success"
                onClick={updatePost}
              >
                Submit
              </button>
              </div>
              <div class="col-sm-4 d-grid">
                <Link to="/blog/posts" class="btn btn-outline-danger" role="button">Cancel</Link>	
	            </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Render the ResponseModal component */}
      <ResponseModal
        show={showModal}
        handleClose={handleCloseModal}
        message={responseMessage}
      />
    </div>
  );
}

export default checkAuth(EditPost)