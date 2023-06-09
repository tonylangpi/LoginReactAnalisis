import React, { useState, useEffect, redire } from "react";
import axios from "axios";
import styles from "./UpdateRol.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UpdateRol() {
  const [permisos, setPermisos] = useState([]);

  const listarPermisos = async () => {
    const result = await axios(
      `https://amordownapi-production.up.railway.app/roles/getRolID/${sessionStorage.getItem(
        "idRol"
      )}`
    );
    setPermisos(result.data[0]);
  };

  const UpdatePermisos = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://amordownapi-production.up.railway.app/roles/updateRoles`,
        permisos
      )
      .then(function (response) {
        console.log(response);
        location.href = '/ListRol';
      })
      .catch(function (error) {
        alert(error);
      });
  };

  useEffect(() => {
    listarPermisos();
  }, []);

  const changeName = (e) => {
    setPermisos({
      ...permisos,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setPermisos({
      ...permisos,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className={styles.Container}>
      <form onSubmit={UpdatePermisos} className={styles.Grid}>
        <div className={styles.Grid__item}>
          <div className={styles.ContainerInput}>
            <input
              autoComplete="off"
              onChange={changeName}
              required
              name="NOMBRE_ROL"
              defaultValue={permisos.NOMBRE_ROL}
              placeholder=" "
              type="text"
              pattern="^[a-zA-Z]{1}[a-zA-Z\s]{3,18}[a-zA-Z]{1}$"
              className={styles.ContainerInput__Input}
            />
            <span className={styles.ContainerInput__Span}>Nombre del Rol</span>
          </div>
        </div>

        <div className={styles.Grid__button}>
          <Link to='/ListRol' className={styles.Button}>
            <div className={styles.Button__Icono}>
              <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
            </div>
            <span className={styles.Button__Span}>Actualizar Rol</span>
          </Link>
        </div>
      </form>

      <div className={styles.ContainerTable}>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th colSpan={2}>BENEFICIARIO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Crear Beneficiario</td>
              <td>
                <input
                  onClick={handleChange}
                  name="CREAR_BENE"
                  defaultChecked={permisos.CREAR_BENE}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Actualizar Ficha de Beneficiario</td>
              <td>
                <input
                  onClick={handleChange}
                  name="ACTUALIZA_BENE"
                  defaultChecked={permisos.ACTUALIZA_BENE}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Inhabilitar Beneficiario</td>
              <td>
                <input
                  onClick={handleChange}
                  name="INHABILITAR_BENE"
                  defaultChecked={permisos.INHABILITAR_BENE}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Ver Listado de Beneficiario</td>
              <td>
                <input
                  onClick={handleChange}
                  name="VER_BENEFICIARIOS"
                  defaultChecked={permisos.VER_BENEFICIARIOS}
                  type="checkbox"
                />
              </td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th colSpan={2}>CITAS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ver Citas</td>
              <td>
                <input
                  onClick={handleChange}
                  name="VER_SESIONES"
                  defaultChecked={permisos.VER_SESIONES}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Crear Citas</td>
              <td>
                <input
                  onClick={handleChange}
                  name="CREAR_SESIONES"
                  defaultChecked={permisos.CREAR_SESIONES}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Actualizar Citas</td>
              <td>
                <input
                  onClick={handleChange}
                  name="ACTUALIZAR_SESIONES"
                  defaultChecked={permisos.ACTUALIZAR_SESIONES}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Eliminar Citas</td>
              <td>
                <input
                  onClick={handleChange}
                  name="BORRAR_SESIONES"
                  defaultChecked={permisos.BORRAR_SESIONES}
                  type="checkbox"
                />
              </td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th colSpan={2}>REPORTES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ver Reportes</td>
              <td>
                <input
                  onClick={handleChange}
                  name="VER_REPORTES"
                  defaultChecked={permisos.VER_REPORTES}
                  type="checkbox"
                />
              </td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th colSpan={2}>AREAS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ver Areas</td>
              <td>
                <input
                  onClick={handleChange}
                  name="VER_AREAS"
                  defaultChecked={permisos.VER_AREAS}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Crear Areas</td>
              <td>
                <input
                  onClick={handleChange}
                  name="CREAR_AREAS"
                  defaultChecked={permisos.CREAR_AREAS}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Eliminar Areas</td>
              <td>
                <input
                  onClick={handleChange}
                  name="BORRAR_AREAS"
                  defaultChecked={permisos.BORRAR_AREAS}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Actualizar Areas</td>
              <td>
                <input
                  onClick={handleChange}
                  name="ACTUALIZAR_AREAS"
                  defaultChecked={permisos.ACTUALIZAR_AREAS}
                  type="checkbox"
                />
              </td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th colSpan={2}>USUARIOS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ver Usuarios</td>
              <td>
                <input
                  onClick={handleChange}
                  name="VER_USUARIOS"
                  defaultChecked={permisos.VER_USUARIOS}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Crear Usuarios</td>
              <td>
                <input
                  onClick={handleChange}
                  name="CREAR_USUARIOS"
                  defaultChecked={permisos.CREAR_USUARIOS}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Actualizar Usuarios</td>
              <td>
                <input
                  onClick={handleChange}
                  name="ACTUALIZAR_USUARIOS"
                  defaultChecked={permisos.ACTUALIZAR_USUARIOS}
                  type="checkbox"
                />
              </td>
            </tr>
            <tr>
              <td>Inhabilitar Usuarios</td>
              <td>
                <input
                  onClick={handleChange}
                  name="INHABILITAR_USUARIOS"
                  defaultChecked={permisos.INHABILITAR_USUARIOS}
                  type="checkbox"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UpdateRol;
