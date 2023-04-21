import React, {useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import "../Home/Home.scss";

const Navbar = () => {
   
  const menus = [
    { title: "Beneficiario", path: "/formBene", icon: "", permiso:true },
    { title: "Roles", path: "/formRoles", icon: "", permiso:true},
    { title: "Beneficiario", path: "/formBene", icon: "" , permiso:false},
  ];
  return (
    <>
      <div className="Container-Home">
        <div className="Menu-Left">
          <div className="Menu-Left__User">
            <div className="Menu-Left__User__Imagen">
              <Link to={"/"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <label htmlFor="">Nombre</label>
            <label htmlFor="">Rol</label>
          </div>
          <div className="Menu-Left__Buttons">
            <ul>
              {menus.map((x, index) => (
                <>
                  <li  hidden={!x.permiso} >
                    <Link key={index} to={x.path}>{x.title}</Link>
                  </li>
                </>
              ))}
            </ul>
            <button onClick={()=>{localStorage.clear(); location.reload(); }}>Cerrar sesion</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
