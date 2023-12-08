import "./App.scss"; // Importar estilos
import Login from "./Components/Login/Login";
import React, { useState, useEffect } from "react";
import FormBeneficiario from "./Components/Forms/Beneficiarios/FormBeneficiario";
import Navbar from "./Components/Navbar/Navbar";
import ListarBeneficiarios from "./Components/Forms/Beneficiarios/FomListarBeneficiarios";
import ReporteBeneficiario from "./Components/Forms/Reports/FormReporteBeneficiario";
import ReporteArea from "./Components/Forms/Reports/FormReporteArea";
import ListadoCitas from "./Components/Forms/Reports/FormListarCitas";
import ReporteF9 from "./Components/Forms/Reports/FormReporteF9";
import Estadistico from "./Components/Forms/Reports/FormReporteEstadistico";
import InformeServicio from "./Components/Forms/Reports/FormReporteInformeServicio";
import ReporteCuantitativo from "./Components/Forms/Reports/FormReporteCuantitativo";
import ReporteCualitativo from "./Components/Forms/Reports/FormReporteCualitativo";
import Usuarios from "./Components/Forms/Users/FormUsuarios";
import MiCuenta from "./Components/Forms/Users/MiCuenta";
import AreaActualizar from "./Components/Forms/Areas/AreaActualizar";
import Areas from "./Components/Forms/Areas/FormAreas";
import AreaCrear from "./Components/Forms/Areas/AreaCrear";
import AddUser from "./Components/Forms/Users/FormAgregarUsuario";
import ListaRoles from './Components/Forms/Roles/ListaRoles';
import UpdateRol from './Components/Forms/Roles/UpdateRol';
import Asistencia from './Components/Forms/Beneficiarios/FormAsistenciaBeneficiario'

import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home from "./Components/Home/Home";
import {useAuth} from "../src/context/authContext.jsx"
function App() {
  library.add(fas);
  
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { Api } = useAuth();
  const validateAuth = () => {
    axios
      .post(`${Api}auth/verifyToken`, {
        token: localStorage.getItem("Auth")
      })
      .then(({ data }) => {
        if (data.auth) {
          setIsLoggedIn(data.auth);
        } else {
          setIsLoggedIn(data.auth);
          localStorage.clear();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    validateAuth();
    // Función para verificar cambios en el localStorage
    const checkLocalStorage = () => {
      // Comprueba si el valor almacenado en el localStorage ha cambiado
      const localStorageValue = localStorage.getItem('id'); // Reemplaza 'myKey' con la clave que deseas observar
      const storedValue = JSON.parse(localStorageValue);
      // Aquí puedes realizar cualquier lógica adicional en función del cambio en el valor del localStorage

      // Recarga la página si se ha producido un cambio
      window.location.reload();
      alert('Solo personal Autorizado');
    };

    // Observa los cambios en el localStorage
    window.addEventListener('storage', checkLocalStorage);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('storage', checkLocalStorage);
    };
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="Container-Home">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/formBene" element={<FormBeneficiario />} />
              <Route path="/form" />
              <Route path="/FormListarBeneficiarios" element={<ListarBeneficiarios />}/>
              <Route path="/FormReporteBeneficiario" element={<ReporteBeneficiario />}/>
              <Route path="/FormReporteArea" element={<ReporteArea />} />
              <Route path="/FormListarCitas" element={<ListadoCitas />} />
              <Route path="/FormUsuarios" element={<Usuarios />} />
              <Route path="/MiCuenta" element={<MiCuenta />} />
              <Route path="/FormAgregarUsuario" element={<AddUser />} />
              <Route path="/AreaActualizar" element={<AreaActualizar />} />
              <Route path="/FormAreas" element={<Areas />} />
              <Route path="/AreaCrear" element={<AreaCrear />} />
              <Route path="/FormReporteF9" element={<ReporteF9 />} />
              <Route path="/FormReporteCuantitativo" element={<ReporteCuantitativo />}/>
              <Route path="/FormReporteCualitativo" element={<ReporteCualitativo />}/>
              <Route path="/FormReporteEstadistico" element={<Estadistico />}/>
              <Route path="/FormReporteInformeServicio" element={<InformeServicio />}/>
              <Route path="/Formasis" element={<Asistencia/>}/>
              <Route path="/ListRol" element={<ListaRoles/>}/>
              <Route path="/UpdateRol" element={<UpdateRol/>}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App ;