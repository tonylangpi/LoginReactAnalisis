import './App.scss'; // Importar estilos
import Login from "./Components/Login/Login";
import React, { useEffect } from "react";
import FormBeneficiario from './Components/Forms/Beneficiarios/FormBeneficiario';
import Navbar  from "./Components/Navbar/Navbar";
import ListarBeneficiarios from "./Components/Forms/Beneficiarios/FomListarBeneficiarios"
import ReporteBeneficiario from './Components/Forms/Reports/FormReporteBeneficiario';
import ReporteArea from './Components/Forms/Reports/FormReporteArea';
import ListadoCitas from './Components/Forms/Reports/FormListarCitas';
import ReporteF9 from './Components/Forms/Reports/FormReporteF9';
import ReporteCuantitativo from './Components/Forms/Reports/FormReporteCuantitativo';
import Usuarios from './Components/Forms/Users/FormUsuarios';
import MiCuenta from './Components/Forms/Users/MiCuenta';
import AreaActualizar from './Components/Forms/Areas/AreaActualizar';
import Servicios from './Components/Forms/FormServicios';
import Areas from './Components/Forms/Areas/FormAreas';
import AreaCrear from './Components/Forms/Areas/AreaCrear';
import AddUser from './Components/Forms/Users/FormAgregarUsuario'

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

function App() {

  library.add(fas);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const validateAuth =  () => {
     
     axios.post('https://amordownapi-production.up.railway.app/auth/verifyToken', {
      token : localStorage.getItem('Auth'),
      nivel : localStorage.getItem('nivel')

    })
    .then(({data}) => {
      if(data.auth){
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
              <Route path='/FormListarBeneficiarios' element={<ListarBeneficiarios />} />
              <Route path='/FormReporteBeneficiario' element={<ReporteBeneficiario/>} />
              <Route path='/FormReporteArea' element={<ReporteArea />} />
              <Route path='/FormListarCitas' element={<ListadoCitas />} />
              <Route path='/FormUsuarios' element={<Usuarios />} />
              <Route path='/MiCuenta' element={<MiCuenta />} />
              <Route path='/FormAgregarUsuario' element={<AddUser />} />
              <Route path='/AreaActualizar' element={<AreaActualizar />} />
              <Route path='/FormAreas' element={<Areas/>} />
              <Route path='/AreaCrear' element={<AreaCrear/>} />
              <Route path='/FormServicios' element={<Servicios />} /> 
              <Route path='/FormReporteF9' element={<ReporteF9 />} /> 
              <Route path='/FormReporteCuantitativo' element={<ReporteCuantitativo />} /> 

              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </div>
        </> : <>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </>
      }
    </>
  );
}

export default App;