import React from 'react';
import styles from './MiCuenta.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MiCuenta() {

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
              autoComplete='off'
              name="email"
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
              autoComplete='off'
              name="nombre"
              placeholder=" "
              type="text"
              disabled={true}
              value={localStorage.getItem('nombreUsuario')}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Nombre
            </span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              autoComplete='off'
              name="nombre"
              placeholder=" "
              type="text"
              disabled={true}
              value={localStorage.getItem('nivel')}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Nivel
            </span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              autoComplete='off'
              name="nombre"
              placeholder=" "
              type="text"
              disabled={true}
              value={localStorage.getItem('nombreRol')}
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Rol
            </span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              autoComplete='off'
              name="nombre"
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Empresa
            </span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              autoComplete='off'
              name="nombre"
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Area
            </span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <div className={styles.ContainerInput}>
            <input
              autoComplete='off'
              name="telefono"
              placeholder=" "
              type="text"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>
              Numero de Telefono
            </span>
          </div>
        </div>

        <div className={styles.Form__item}>
          <button id="button-Historial" className={styles.Button}>
            <div className={styles.Button__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-user-plus" />
            </div>
            <span className={styles.Button__Span}>Guardar Usuario</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MiCuenta