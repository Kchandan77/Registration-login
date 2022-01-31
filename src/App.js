
import {Routes, Route } from "react-router-dom";
import { Registration } from './components/Registration';
import { Contact, Login } from './components/Login';
import { Home } from './components/Home';
import { SignInUpPage } from "./components";
import { AddProduct } from "./components/AddProduct";
import '../src/App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Registration/>}/>
      {/* <Route path="/login" element={<Login/>}/> */}
      <Route path="/home" element={<Home/>}/>
      <Route path="/about-us" element={<SignInUpPage/>}/>
      <Route path="/contact-us" element={<Contact/>}/>
      <Route path="/product-list" element={<AddProduct/>}/>
    </Routes>
    </>
  );
}

export default App;
