import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/LogoLetras.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Navbar.module.scss";
import jwt_Decode from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("Auth");
  const decoded = jwt_Decode(token);

  const [menuBeneficiario, setMenuBeneficiario] = React.useState([
    { title: "Ficha de Ingreso", path: "/formBene", icon: "", permiso: true },
    {
      title: "Listado de Beneficiarios",
      path: "/FormListarBeneficiarios",
      icon: "",
      permiso: true,
    },
  ]);

  const [menuReportes, setMenuReportes] = React.useState([
    {
      title: "Reporte de Areas",
      path: "/FormReporteArea",
      icon: "",
      permiso: true,
    },
    {
      title: "Reporte de Beneficiarios",
      path: "/FormReporteBeneficiario",
      icon: "",
      permiso: true,
    },
    {
      title: "Reporte de Citas",
      path: "/FormListarCitas",
      icon: "",
      permiso: true,
    },
    { title: "Reporte F9", path: "/FormReporteF9", icon: "", permiso: true },
    {
      title: "Reporte Cuantitativo",
      path: "/FormReporteCuantitativo",
      icon: "",
      permiso: true,
    },
    {
      title: "Reporte Cualitativo",
      path: "/FormReporteCualitativo",
      icon: "",
      permiso: true,
    },
    {
      title: "Reporte Estadistico",
      path: "/FormReporteEstadistico",
      icon: "",
      permiso: true,
    },
    {
      title: "Reporte Informe de Servicio",
      path: "/FormReporteInformeServicio",
      icon: "",
      permiso: true,
    },
  ]);

  const [menuSeguridad, setMenuSeguridad] = React.useState([
    { title: "Areas", path: "/FormAreas", icon: "", permiso: true },
    { title: "Usuarios", path: "/FormUsuarios", icon: "", permiso: true },
    { title: "Roles", path: "/ListRol", icon: "", permiso: true },
  ]);

  const [Dropdown, setDropdown] = React.useState({
    drop1: false,
    drop2: false,
    drop3: false,
    drop4: false,
  });
  const [menu, setMenu] = React.useState(false);

  const openDropdown = (num) => {
    if (num == 1) {
      setDropdown({ drop1: !Dropdown.drop1 });
    } else if (num == 2) {
      setDropdown({ drop2: !Dropdown.drop2 });
    } else if (num == 3) {
      setDropdown({ drop3: !Dropdown.drop3 });
    } else if (num == 4) {
      setDropdown({ drop4: !Dropdown.drop4 });
    }
  };

  const closeDropdown = (num) => {
    if (num == 1) {
      setDropdown({ drop1: false });
      setMenu(false);
    } else if (num == 2) {
      setDropdown({ drop2: false });
      setMenu(false);
    } else if (num == 3) {
      setDropdown({ drop3: false });
      setMenu(false);
    } else if (num == 4) {
      setDropdown({ drop4: false });
      setMenu(false);
    }
  };

  const ShowMenu = () => {
    setMenu(!menu);
  };

  const menuResponsive = useRef();
  const buttonResponsive = useRef();
  const menuRef1 = useRef();
  const menuRef2 = useRef();
  const menuRef3 = useRef();
  const menuRef4 = useRef();

  const ModifySubMenus = () => {

    if(decoded.crear_bene == 0) {
      menuBeneficiario[0].permiso = false;
    }

    if (decoded.ver_reportes == 0) {
      menuReportes[3].permiso = false;
      menuReportes[4].permiso = false;
      menuReportes[5].permiso = false;
      menuReportes[6].permiso = false;
      menuReportes[7].permiso = false;
    }

    if (decoded.ver_sesiones == 0) {
      menuReportes[2].permiso = false;
    }

    if (decoded.nivel == 3) {
      menuSeguridad[2].permiso = false;
    }

    if (decoded.ver_usuarios == 0) {
      menuSeguridad[1].permiso = false;
    }
  };

  useEffect(() => {
    let DropDown = (e) => {
      if (
        !menuRef1.current.contains(e.target) &&
        !menuRef2.current.contains(e.target) &&
        !menuRef3.current.contains(e.target) &&
        !menuRef4.current.contains(e.target) &&
        !menuResponsive.current.contains(e.target) &&
        !buttonResponsive.current.contains(e.target)
      ) {
        setDropdown({ drop1: false });
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", DropDown);

    ModifySubMenus();

    return () => {
      document.removeEventListener("mousedown", DropDown);
    };
  });

  useEffect(() => {
    ModifySubMenus();
  });

  const Menus = [
    {
      title: "BENEFICIARIO",
      ref1: menuRef1,
      drop: Dropdown.drop1,
      permiso: true,
    },
    { title: "REPORTES", ref1: menuRef2, drop: Dropdown.drop2, permiso: true },
    {
      title: "SEGURIDAD",
      ref1: menuRef3,
      drop: Dropdown.drop3,
      permiso: false,
    },
  ];

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
              <div ref={row.ref1} key={index} className={styles.Dropdown}>
                <button
                  className={styles.Button}
                  onClick={() => openDropdown(index + 1)}
                >
                  <span className={styles.Button__Span}>{row.title}</span>
                  <div
                    className={
                      row.drop ? styles.Button__IconoUp : styles.Button__Icono
                    }
                  >
                    <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                  </div>
                </button>
                <div
                  className={`${styles.Dropdown__Options} ${
                    row.drop ? styles.Dropdown__Options_open : ""
                  }`}
                >
                  {row.title == "BENEFICIARIO"
                    ? menuBeneficiario.map((row, index) =>
                        row.permiso ? (
                          <Link
                            key={index}
                            className={styles.Dropdown__Option}
                            onClick={() => closeDropdown(1)}
                            to={row.path}
                          >
                            {row.title}
                          </Link>
                        ) : null
                      )
                    : row.title == "REPORTES"
                    ? menuReportes.map((row, index) =>
                        row.permiso ? (
                          <Link
                            key={index}
                            className={styles.Dropdown__Option}
                            onClick={() => closeDropdown(2)}
                            to={row.path}
                          >
                            {row.title}
                          </Link>
                        ) : null
                      )
                    : row.title == "SEGURIDAD"
                    ? menuSeguridad.map((row, index) =>
                        row.permiso ? (
                          <Link
                            key={index}
                            className={styles.Dropdown__Option}
                            onClick={() => closeDropdown(3)}
                            to={row.path}
                          >
                            {row.title}
                          </Link>
                        ) : null
                      )
                    : null}
                </div>
              </div>
            ))}
          </div>

          <div ref={menuRef4} className={styles.Dropdown}>
            <button className={styles.Button} onClick={() => openDropdown(4)}>
              <div className={styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
              <span className={styles.Button__Span}>Perfil</span>
              <div
                className={
                  Dropdown.drop4 ? styles.Button__IconoUp : styles.Button__Icono
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </div>
            </button>
            <div
              className={`${styles.Dropdown__Options} ${
                Dropdown.drop4 ? styles.Dropdown__Options_open : ""
              }`}
            >
              <Link
                className={styles.Dropdown__Option}
                onClick={() => closeDropdown(4)}
                to="/MiCuenta"
              >
                Mi Cuenta
              </Link>
              <Link
                to={"/"}
                className={styles.Dropdown__Option}
                onClick={() => {
                  localStorage.clear();
                  location.reload();
                }}
              >
                Cerrar Sesion
              </Link>
            </div>
          </div>

          <button
            ref={buttonResponsive}
            onClick={ShowMenu}
            className={styles.ButtonIcon}
          >
            <div className={styles.ButtonIcon__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-bars" />
            </div>
          </button>
        </div>

        <div
          ref={menuResponsive}
          hidden={!menu}
          className={styles.Dropdown_Menu}
        >
          {Menus.map((row, index) => (
            <div key={index} className={styles.Dropdown}>
              <button
                className={styles.Button}
                onClick={() => openDropdown(index + 1)}
              >
                <span className={styles.Button__Span}>{row.title}</span>
                <div
                  className={
                    row.drop ? styles.Button__IconoUp : styles.Button__Icono
                  }
                >
                  <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                </div>
              </button>
              <div
                className={`${styles.Dropdown__Options} ${
                  row.drop ? styles.Dropdown__Options_open : ""
                }`}
              >
                {row.title == "BENEFICIARIO"
                  ? menuBeneficiario.map((row, index) =>
                      row.permiso ? (
                        <Link
                          key={index}
                          className={styles.Dropdown__Option}
                          onClick={() => closeDropdown(1)}
                          to={row.path}
                        >
                          {row.title}
                        </Link>
                      ) : null
                    )
                  : row.title == "REPORTES"
                  ? menuReportes.map((row, index) =>
                      row.permiso ? (
                        <Link
                          key={index}
                          className={styles.Dropdown__Option}
                          onClick={() => closeDropdown(2)}
                          to={row.path}
                        >
                          {row.title}
                        </Link>
                      ) : null
                    )
                  : row.title == "SEGURIDAD"
                  ? menuSeguridad.map((row, index) =>
                      row.permiso ? (
                        <Link
                          key={index}
                          className={styles.Dropdown__Option}
                          onClick={() => closeDropdown(3)}
                          to={row.path}
                        >
                          {row.title}
                        </Link>
                      ) : null
                    )
                  : null}
              </div>
            </div>
          ))}

          <div className={styles.Dropdown}>
            <button className={styles.Button} onClick={() => openDropdown(4)}>
              <div className={styles.Button__Icono}>
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
              <span className={styles.Button__Span}>Perfil</span>
              <div
                className={
                  Dropdown.drop4 ? styles.Button__IconoUp : styles.Button__Icono
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
              </div>
            </button>
            <div
              className={`${styles.Dropdown__Options} ${
                Dropdown.drop4 ? styles.Dropdown__Options_open : ""
              }`}
            >
              <Link
                className={styles.Dropdown__Option}
                onClick={() => closeDropdown(4)}
                to="/MiCuenta"
              >
                Mi Cuenta
              </Link>
              <Link
                to={"/"}
                className={styles.Dropdown__Option}
                onClick={() => {
                  localStorage.clear();
                  location.reload();
                }}
              >
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
