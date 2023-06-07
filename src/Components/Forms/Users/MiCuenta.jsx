import React, { useState, useEffect } from "react";
import styles from "./MiCuenta.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function MiCuenta() {
  const [userData, setUserData] = useState([]);

  const getUser = async () => {
    axios
      .post(`https://amordownapi-production.up.railway.app/usuarios/user`, {
        id: localStorage.getItem("id"),
      })
      .then(function (response) {
        setUserData(response.data[0]);
      })
      .catch(function (error) {
        alert(error);
        console.error(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.Container}>
      <h1 className={styles.Titulo}>Mi Cuenta</h1>

      <div className={styles.Imagen}>
        <FontAwesomeIcon icon="fa-solid fa-circle-user" />
      </div>

      <form className={styles.Form}>
        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              value={userData.email}
              disabled={true}
              placeholder=" "
              type="email"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Correo Electronico
            </span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              placeholder=" "
              type="text"
              disabled={true}
              value={userData.nombre}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>Nombre</span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              placeholder=" "
              type="text"
              disabled={true}
              value={userData.nivel}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>Nivel</span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              placeholder=" "
              type="text"
              disabled={true}
              value={userData.rol}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>Rol</span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              value={userData.empresa}
              disabled={true}
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>Empresa</span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              disabled={true}
              value={userData.area}
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>Area</span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              disabled={true}
              value={userData.telefono}
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Numero de Telefono
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MiCuenta;
