import React  from 'react';
import Navbar from './components/Navbar';



function App() {
  return(
    <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
    <Navbar />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white' }}>
 
    <h1 style={{ color: "#333333"}}><b>WELCOME TO MEDSHOP</b></h1>
    <p style={{ fontSize: '1.2rem',color: "#333333" }}>Explore our wide range of
     medicines and healthcare products at MedShop. We provide
      high-quality products
     to meet your medical needs.</p>

<br/>

   
  </div>
   
  </div>
);
}

export default App;
