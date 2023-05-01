import './App.scss'; // Importar estilos
import Login from "./Components/Login/Login";
import React, { useEffect } from "react";
import Register from './Components/Register/Register';
import FormBeneficiario from './Components/Forms/FormBeneficiario';
import Navbar  from "./Components/Navbar/Navbar";
import RolesForm from "./Components/Forms/FomRoles"
import Servicios from './Components/Forms/FormServicio';
import Citas from './Components/Forms/FormCitas';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home from "./Components/Home/Home";
import ValidarToken from './Components/Validar/validarToken'; 
function App() {

  library.add(fas);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const validateAuth =  () => {
     
     axios('https://analisisapi.netlify.app/auth', {headers: {
        'x-access-token': localStorage.getItem('Auth')
    }} )
    .then(({data}) => {
      if(!data.auth){
        setIsLoggedIn(data.auth);
      }else{
        setIsLoggedIn(data.auth); 
      }
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    validateAuth();
  }, []);

  return (
    <>
      {isLoggedIn ?
        <>
          <div className="Container-Home">
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/formBene' element={<FormBeneficiario />} />
              <Route path='/form' />
              <Route path='/formRoles' element={<RolesForm />} />
              <Route path='/FormServicios' element={<Servicios />} />
              <Route path='/FormCitas' element={<Citas />} />
              
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </div>
        </> : <>
          <Routes>
            <Route path='/registrar' element={<Register />} />
            <Route path='/' element={<Login />} />
            <Route path='/validarToken' element={<ValidarToken />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </>
      }
    </>
  );
}

export default App;