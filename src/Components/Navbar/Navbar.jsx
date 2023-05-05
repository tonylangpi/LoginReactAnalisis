import React, {useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Navbar.scss';

const Navbar = () => {

  const menus = [
    { title: "Beneficiario", path: "/formBene", icon: "", permiso:true },
    { title: "Servicios", path: "/FormServicios", icon: "", permiso:true },
    { title: "Citas", path: "/FormCitas", icon: "", permiso:true },
    { title: "VER beneficiarios", path: "/formRoles", icon: "", permiso:true},
    { title: "Beneficiario", path: "/formBene", icon: "" , permiso:false},
  ];

  return (
    <>
      <div className="Navbar">

        <div className="Navbar__Buttons">
          {menus.map((x, index) => (
            <>
              <li hidden={!x.permiso} >
                <Link className="Button" key={index} to={x.path}>{x.title}</Link>
              </li>
            </>
          ))}
          <button className="Button" onClick={() => { localStorage.clear(); location.reload(); }}>Cerrar sesion</button>
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
