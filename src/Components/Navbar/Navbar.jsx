import React, {useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

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
            <label htmlFor="">Echeveria</label>
            <label htmlFor="">Rol</label>
          </div>

          <div className="Menu-Left__Buttons">
            <ul>
              {menus.map((x, index) => (
                <>
                  <li className="Menu-Left__Buttons-Li" hidden={!x.permiso} >
                    <Link key={index} to={x.path}>{x.title}</Link>
                  </li>
                </>
              ))}
            </ul>
            <button onClick={() => { localStorage.clear(); location.reload(); }}>Cerrar sesion</button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;
