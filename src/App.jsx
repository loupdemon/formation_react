import React from 'react';
//import { Routes, Route, NavLink } from 'react-router-dom';
import Menue from './component/navbar/navbar';
import './App.css';
import Footer from './component/footer/footer';
function App() {
  return (
    <>
      <Menue/>
      <Footer/>
     {/*} <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container align-items-start text-start">
          <img src={logo} width={`18px`}/>
          <NavLink to="/" className="navbar-brand align-items-start">Calcul de l'IMC</NavLink>
          <NavLink to="/conso" className="navbar-brand align-items-start ">Conso</NavLink>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Imc />} />
          <Route path="/conso" element={<Conso />} />
        </Routes>
      </div>
*/}
 
    </>
  );
}

export default App;
