import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.scss";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownClose, setIsDropdownClose] = useState(true);

  const Cerrar = () => {
    setIsDropdownClose(!isDropdownClose);
  };
  const Abrir = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menus = [
    { title: "Beneficiario", path: "/formBene", icon: "", permiso: true },
    { title: "Reportes", path: "/FormReportes", icon: "", permiso: false },
    { title: "Citas", path: "/FormCitas", icon: "", permiso: true },
    { title: "VER beneficiarios", path: "/formRoles", icon: "", permiso: true },
    { title: "Beneficiario", path: "/formBene", icon: "", permiso: false },
  ];

  return (
    <>
      <div className="Navbar">
        <div className="Navbar__Buttons">
          {menus.map((x, index) => (
            <li hidden={!x.permiso} key={index}>
              <Link className="Button" to={x.path}>
                {x.title}
              </Link>
            </li>
          ))}
          
         <div className="Dropdown">
            <button className="Button" onClick={Abrir}>
              Reportes 
            </button>
            <div
              className={`Dropdown__Options ${
                isDropdownOpen ? "Dropdown__Options--open" : ""
              }`}
            >
              <Link className="Dropdown__Option" onClick={Cerrar} to="/FormReporteArea" >
                Reporte de Areas
              </Link>
              <Link className="Dropdown__Option" onClick={Cerrar} to="/FormReporteBeneficiario">
                Reporte de Beneficiarios
              </Link>
              <Link className="Dropdown__Option" onClick={Cerrar} to="/FormReporteCitas">
                Reporte de Citas
              </Link>
            </div>

            
          </div>
          
          <button
            className="Button"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Cerrar sesion
          </button>

         
        </div>

        <div className="Navbar__User">
          <label htmlFor="">Echeveria</label>
          <div className="Navbar__User__Imagen">
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
