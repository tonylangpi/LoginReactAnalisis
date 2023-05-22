import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/LogoLetras.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Navbar.module.scss";

const Navbar = () => {

  const [Dropdown, setDropdown] = React.useState({
    drop1: false,
    drop2: false,
    drop3: false,
    drop4: false
  })
  const [menu, setMenu] = React.useState({
    DropMenu: false,
  })

  const openDropdown = (num) => {
    if (num == 1) {
      setDropdown({drop1: !Dropdown.drop1});
    } else if (num == 2) {
      setDropdown({drop2: !Dropdown.drop2});
    } else if (num == 3) {
      setDropdown({drop3: !Dropdown.drop3});
    } else if (num == 4) {
      setDropdown({drop4: !Dropdown.drop4});
    }
  };

  const closeDropdown = (num) => {
    if (num == 1) {
      setDropdown({drop1 : false})
    } else if (num == 2) {
      setDropdown({drop2 : false})
    } else if (num == 3) {
      setDropdown({drop3 : false})
    } else if (num == 4) {
      setDropdown({drop4 : false})
    }
  };

  const ShowMenu = ()=>{
    setMenu({DropMenu: !menu.DropMenu})
  }

  const Menus = [
    { title: "BENEFICIARIO", drop: Dropdown.drop1, permiso: true },
    { title: "REPORTES", drop: Dropdown.drop2, permiso: true },
    { title: "SEGURIDAD", drop: Dropdown.drop3, permiso: true },
  ];

  const subMenuBeneficiario = [
    { title: "Ficha de Ingreso", path: "/formBene", icon: "", permiso: true },
    { title: "Listado de Beneficiarios", path: "/FormListarBeneficiarios", icon: "", permiso: true },
    { title: "Servicios", path: "/FormServicios", icon: "", permiso: true }
  ]

  const subMenuReportes = [
    { title: "Reporte de Areas", path: "/FormReporteArea", icon: "", permiso: true },
    { title: "Reporte de Beneficiarios", path: "/FormReporteBeneficiario", icon: "", permiso: true },
    { title: "Reporte de Citas", path: "/FormListarCitas", icon: "", permiso: true }
  ]

  const subMenuSeguridad = [
    { title: "Areas", path: "/FormAreas", icon: "", permiso: true },
    { title: "Usuarios", path: "/FormUsuarios", icon: "", permiso: true },
  ]

  return (
    <>
      <div className={styles.Header}>

        <div className={styles.Navbar}>

          <div className={styles.Navbar__Imagen}>
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className={styles.Navbar__Buttons}>

            {Menus.map((row, index) => (
              <div key={index} className={styles.Dropdown}>
                <button className={styles.Button} onClick={() => openDropdown(index+1)}>
                  <span className={styles.Button__Span}>{row.title}</span>
                  <div className={row.drop ? styles.Button__IconoUp : styles.Button__Icono}>
                    <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                  </div>
                </button>
                <div className={`${styles.Dropdown__Options} ${row.drop ? styles.Dropdown__Options_open : ""}`}>
                  {
                  row.title == 'BENEFICIARIO' ?
                    subMenuBeneficiario.map((row, index) => (
                    <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(1)} to={row.path} >
                      {row.title}
                    </Link>
                  )) : row.title == 'REPORTES' ? subMenuReportes.map((row, index) => (
                    <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(2)} to={row.path} >
                      {row.title}
                    </Link>
                  )) : row.title == 'SEGURIDAD' ? subMenuSeguridad.map((row, index) => (
                    <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(3)} to={row.path} >
                      {row.title}
                    </Link>
                  )) : null
                }
                </div>
              </div>
            ))}

            {/* <div className={styles.Dropdown}>
              <button className={styles.Button} onClick={() => openDropdown(1)}>
                <span className={styles.Button__Span}>Beneficiario</span>
                <div className={Dropdown.drop1 ? styles.Button__IconoUp : styles.Button__Icono}>
                  <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                </div>
              </button>
              <div className={`${styles.Dropdown__Options} ${Dropdown.drop1 ? styles.Dropdown__Options_open : ""}`}>
                {subMenuBeneficiario.map((row, index) => (
                  <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(1)} to={row.path} >
                    {row.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.Dropdown}>
              <button className={styles.Button} onClick={() => openDropdown(2)}>
                <span className={styles.Button__Span}>Reportes</span>
                <div className={Dropdown.drop2 ? styles.Button__IconoUp : styles.Button__Icono}>
                  <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                </div>
              </button>
              <div className={`${styles.Dropdown__Options} ${Dropdown.drop2 ? styles.Dropdown__Options_open : ""}`}>
                {subMenuReportes.map((row, index) => (
                  <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(2)} to={row.path} >
                    {row.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className={`${styles.Dropdown} ${styles.Profile}`}>
              <button className={styles.Button} onClick={() => openDropdown(3)}>
                <span className={styles.Button__Span}>Seguridad</span>
                <div className={Dropdown.drop3 ? styles.Button__IconoUp : styles.Button__Icono}>
                  <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                </div>
              </button>
              <div className={`${styles.Dropdown__Options} ${Dropdown.drop3 ? styles.Dropdown__Options_open : ""}`}>
                {subMenuSeguridad.map((row, index) => (
                  <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(3)} to={row.path} >
                    {row.title}
                  </Link>
                ))}
              </div>
            </div> */}
          </div>

          <div className={styles.Dropdown}>
            <button className={styles.Button} onClick={() => openDropdown(4)}>
              <div className={styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
              <span className={styles.Button__Span}>Perfil</span>
              <div className={Dropdown.drop4 ? styles.Button__IconoUp : styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </div>
            </button>
            <div className={`${styles.Dropdown__Options} ${Dropdown.drop4 ? styles.Dropdown__Options_open : ""}`}>
              <Link className={styles.Dropdown__Option} onClick={() => closeDropdown(4)} to="/FormAreas" >
                Mi Cuenta
              </Link>
              <Link className={styles.Dropdown__Option} onClick={() => { localStorage.clear(); location.reload(); }}>
                Cerrar Sesion
              </Link>
            </div>
          </div>

          <button onClick={ShowMenu} className={styles.ButtonIcon}>
            <div className={styles.ButtonIcon__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-bars" />
            </div>
          </button>

        </div>

        <div hidden={!menu.DropMenu} className={styles.Dropdown_Menu}>

          {Menus.map((row, index) => (
            <div key={index} className={styles.Dropdown}>
              <button className={styles.Button} onClick={() => openDropdown(index + 1)}>
                <span className={styles.Button__Span}>{row.title}</span>
                <div className={row.drop ? styles.Button__IconoUp : styles.Button__Icono}>
                  <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                </div>
              </button>
              <div className={`${styles.Dropdown__Options} ${row.drop ? styles.Dropdown__Options_open : ""}`}>
                {
                  row.title == 'BENEFICIARIO' ?
                    subMenuBeneficiario.map((row, index) => (
                      <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(1)} to={row.path} >
                        {row.title}
                      </Link>
                    )) : row.title == 'REPORTES' ? subMenuReportes.map((row, index) => (
                      <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(2)} to={row.path} >
                        {row.title}
                      </Link>
                    )) : row.title == 'SEGURIDAD' ? subMenuSeguridad.map((row, index) => (
                      <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(3)} to={row.path} >
                        {row.title}
                      </Link>
                    )) : null
                }
              </div>
            </div>
          ))}

          {/* <div className={styles.Dropdown}>
            <button className={styles.Button} onClick={() => openDropdown(1)}>
              <span className={styles.Button__Span}>Beneficiario</span>
              <div className={Dropdown.drop1 ? styles.Button__IconoUp : styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </div>
            </button>
            <div className={`${styles.Dropdown__Options} ${Dropdown.drop1 ? styles.Dropdown__Options_open : ""}`}>
              {subMenuBeneficiario.map((row, index) => (
                <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(1)} to={row.path} >
                  {row.title}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.Dropdown}>
            <button className={styles.Button} onClick={() => openDropdown(2)}>
              <span className={styles.Button__Span}>Reportes</span>
              <div className={Dropdown.drop2 ? styles.Button__IconoUp : styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </div>
            </button>
            <div className={`${styles.Dropdown__Options} ${Dropdown.drop2 ? styles.Dropdown__Options_open : ""}`}>
              {subMenuReportes.map((row, index) => (
                <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(1)} to={row.path} >
                  {row.title}
                </Link>
              ))}
            </div>
          </div>

          <div className={`${styles.Dropdown} ${styles.Profile}`}>
            <button className={styles.Button} onClick={() => openDropdown(3)}>
              <span className={styles.Button__Span}>Seguridad</span>
              <div className={Dropdown.drop3 ? styles.Button__IconoUp : styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </div>
            </button>
            <div className={`${styles.Dropdown__Options} ${Dropdown.drop3 ? styles.Dropdown__Options_open : ""}`}>
              {subMenuSeguridad.map((row, index) => (
                <Link key={index} className={styles.Dropdown__Option} onClick={() => closeDropdown(3)} to={row.path} >
                  {row.title}
                </Link>
              ))}
            </div>
          </div> */}

          <div className={styles.Dropdown}>
            <button className={styles.Button} onClick={() => openDropdown(4)}>
              <div className={styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
              <span className={styles.Button__Span}>Perfil</span>
              <div className={Dropdown.drop4 ? styles.Button__IconoUp : styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </div>
            </button>
            <div className={`${styles.Dropdown__Options} ${Dropdown.drop4 ? styles.Dropdown__Options_open : ""}`}>
              <Link className={styles.Dropdown__Option} onClick={`${() => closeDropdown(4)} ${ShowMenu}`} to="/FormAreas" >
                Mi Cuenta
              </Link>
              <Link className={styles.Dropdown__Option} onClick={() => { localStorage.clear(); location.reload(); }}>
                Cerrar Sesion
              </Link>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Navbar;
