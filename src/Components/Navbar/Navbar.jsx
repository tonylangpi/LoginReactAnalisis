import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [Dropdown, setDropdown] = React.useState({
    drop1: false,
    drop2: false,
    drop3: false
  })
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [dropdownClose, setIsDropdownClose] = useState(true);

  const openDropdown = (num) => {
    if (num == 1) {
      setDropdown({drop1: !Dropdown.drop1});
    } else if (num == 2) {
      setDropdown({drop2: !Dropdown.drop2});
    } else if (num == 3) {
      setDropdown({drop3: !Dropdown.drop3});
    }
  };

  const closeDropdown = (num) => {
    if (num == 1) {
      setDropdown({drop1 : false})
    } else if (num == 2) {
      setDropdown({drop1 : false})
    } else if (num == 3) {
      setDropdown({drop3 : false})
    }
  };

  const menus = [
    { title: "Beneficiario", path: "/formBene", icon: "", permiso: true },
    { title: "Reportes", path: "/FormReportes", icon: "", permiso: false },
    { title: "VER beneficiarios", path: "/formRoles", icon: "", permiso: true },
    { title: "Beneficiario", path: "/formBene", icon: "", permiso: false },
  ];

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.Navbar__Buttons}>
          {/* {menus.map((x, index) => (
            <li hidden={!x.permiso} key={index}>
              <Link className="Button" to={x.path}>
                {x.title}
              </Link>
            </li>
          ))} */}

          <div className={styles.Dropdown}>
            <button className={styles.Button} onClick={() => openDropdown(1)}>
              Beneficiario
            </button>
            <div className={`${styles.Dropdown__Options} ${Dropdown.drop1 ? styles.Dropdown__Options_open : ""}`}>
              <Link className={styles.Dropdown__Option} onClick={()=>closeDropdown(1)} to="/formBene" >
                Ficha de Ingreso
              </Link>
              <Link className={styles.Dropdown__Option} onClick={()=>closeDropdown(1)} to="/formRoles">
                Listado de Beneficiarios
              </Link>
              <Link className={styles.Dropdown__Option} onClick={()=>closeDropdown(1)} to="/FormServicios">
                Servicios
              </Link>
            </div>
          </div>
          
         <div className={styles.Dropdown}>
            <button className={styles.Button} onClick={()=>openDropdown(2)}>
              Reportes
            </button>
            <div className={`${styles.Dropdown__Options} ${Dropdown.drop2 ? styles.Dropdown__Options_open : ""}`}>
              <Link className={styles.Dropdown__Option} onClick={()=>closeDropdown(2)} to="/FormReporteArea" >
                Reporte de Areas
              </Link>
              <Link className={styles.Dropdown__Option} onClick={()=>closeDropdown(2)} to="/FormReporteBeneficiario">
                Reporte de Beneficiarios
              </Link>
              <Link className={styles.Dropdown__Option} onClick={()=>closeDropdown(2)} to="/FormListarCitas">
                Reporte de Citas
              </Link>
            </div> 
          </div>

          <div className={styles.Dropdown}>
            <button className={styles.Button} onClick={() => openDropdown(3)}>
              Seguridad
            </button>
            <div className={`${styles.Dropdown__Options} ${Dropdown.drop3 ? styles.Dropdown__Options_open : ""}`}>
              <Link className={styles.Dropdown__Option} onClick={()=>closeDropdown(3)} to="/FormArea" >
                Area
              </Link>
              <Link className={styles.Dropdown__Option} onClick={()=>closeDropdown(3)} to="/FormUsuarios">
                Usuarios
              </Link>
            </div>
          </div>
          
          <button
            className={styles.Button}
            onClick={() => {
              localStorage.clear();
              location.reload();}}>
            Cerrar sesion
          </button>

         
        </div>

        <div className={styles.Navbar__User}>
          <div className={styles.User__Data}>
            <label>{localStorage.getItem('nombreUsuario')}</label>
            <label>{localStorage.getItem('nombreRol')}</label>
          </div>
          <div className={styles.Navbar__User__Imagen}>
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
