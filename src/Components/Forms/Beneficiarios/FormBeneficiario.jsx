import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormEncargado from "./FormEncargado";
import FormHistorialClinico from "./formHistorialClinico";
import FormPrenatales from "./FormPrenatales";
import FormPerinatales from "./FormPerinatales";
import axios from "axios";
import FormPostNatal from "./FormPostNatal";
import styles from './Beneficiario.module.scss';


const FormBeneficiario = () => {
  const [archivo, setArchivo] = useState(null);
  const [idBeneficiary, setIdBeneficiary] = useState(null);
  const [isBeneficiary, setisBeneficiary] = useState(false);

  const selectImageList = (e) => {
    const uplodad = e.target.files;
    // console.log(uplodad.length)
    if (uplodad.length > 2) {
      alert("No puedes subir más de 2 archivos");
      setArchivo(null);
    } else {
      const uplodadList = [];

      for (let i = 0; i < uplodad?.length; i++) {
        uplodadList.push(uplodad.item(i));
      }
      setArchivo(uplodadList);
    }
  };

  const [beneficiario, setBeneficiario] = React.useState({
    ID_EMPRESA: 1,
    NOMBRE1: "",
    NOMBRE2: "",
    NOMBRE3: "",
    APELLIDO1: "",
    APELLIDO2: "",
    ESCOLARIDAD: "",
    SEXO: "",
    FECHA_NACIMIENTO: "",
    DIRECCION: "",
    REFERENCIA: "",
    NUMERO_HERMANOS: 0,
    NUMERO_OCUPA: 0,
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setBeneficiario({
      ...beneficiario,
      [e.target.name]: e.target.value,
    });
  };

  const fileSubmit = (e) => {
    if (!archivo) {
      e.preventDefault();
      alert("tiene que tener archivos");
    } else {
      e.preventDefault();
      try {
        const data = new FormData();
        data.append("ID_EMPRESA", beneficiario.ID_EMPRESA);
        data.append("NOMBRE1", beneficiario.NOMBRE1);
        data.append("NOMBRE2", beneficiario.NOMBRE2);
        data.append("NOMBRE3", beneficiario.NOMBRE3);
        data.append("APELLIDO1", beneficiario.APELLIDO1);
        data.append("APELLIDO2", beneficiario.APELLIDO2);
        data.append("ESCOLARIDAD", beneficiario.ESCOLARIDAD);
        data.append("SEXO", beneficiario.SEXO);
        data.append("FECHA_NACIMIENTO", beneficiario.FECHA_NACIMIENTO);
        data.append("DIRECCION", beneficiario.DIRECCION);
        data.append("REFERENCIA", beneficiario.REFERENCIA);
        data.append("NUMERO_HERMANOS", beneficiario.NUMERO_HERMANOS);
        data.append("NUMERO_OCUPA", beneficiario.NUMERO_OCUPA);

        for (let i = 0; i < archivo?.length; i++) {
          data.append("files", archivo[i]);
        }

        axios({
          method: "post",
          url: "http://localhost:4000/beneficiarios/create",
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            const idBeneficiaryCurrent =
              response?.data?.idBeneficiario[0]?.ID_BENE_INGRESADO;
            !idBeneficiaryCurrent
              ? alert("no existe beneficiario")
              : setIdBeneficiary(idBeneficiaryCurrent);
            setisBeneficiary(true);
          })
          .catch(function (response) {
            alert("No se ha encontrado un registro");
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={styles.Container}>
        {/* DATOS DEL BENEFICIARIO */}
        {!isBeneficiary ? (
          <div id="FormBeneficiario" className={styles.Container}>
            <div className={styles.Titulo}>
              <h1>Datos del Beneficiarios</h1>
            </div>

            <form onSubmit={fileSubmit} className={styles.Grid}>
              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    required
                    disabled={isBeneficiary}
                    name="NOMBRE1"
                    onChange={saveDataTemporaly}
                    placeholder=" "
                    type="text"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Primer Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    required
                    disabled={isBeneficiary}
                    placeholder=" "
                    name="NOMBRE2"
                    onChange={saveDataTemporaly}
                    type="text"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Segundo Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    disabled={isBeneficiary}
                    placeholder=" "
                    name="NOMBRE3"
                    onChange={saveDataTemporaly}
                    type="text"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Tercer Nombre
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    required
                    disabled={isBeneficiary}
                    name="APELLIDO1"
                    onChange={saveDataTemporaly}
                    placeholder=" "
                    type="text"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Primer Apellido
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    disabled={isBeneficiary}
                    name="APELLIDO2"
                    onChange={saveDataTemporaly}
                    placeholder=" "
                    type="text"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Segundo Apellido
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <select
                    required
                    disabled={isBeneficiary}
                    className={styles.ContainerInput__Input}
                    name="ESCOLARIDAD"
                    onChange={saveDataTemporaly}>
                    <option value=""></option>
                    <option value="No Tiene">No Tiene</option>
                    <option value="No Aplica">No Aplica</option>
                    <option value="PrePrimaria">PrePrimaria</option>
                    <option value="Primaria">Primaria</option>
                    <option value="Basico">Basico</option>
                    <option value="Diversificado">Diversificado</option>
                    <option value="Universitario">Universitario</option>
                  </select>
                  <span className={styles.ContainerInput__Span}>
                    Escolaridad
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <select
                    required
                    disabled={isBeneficiary}
                    className={styles.ContainerInput__Input}
                    name="SEXO"
                    onChange={saveDataTemporaly}>
                    <option value=""></option>
                    <option value="M">MASCULINO</option>
                    <option value="F">FEMENINO</option>
                  </select>
                  <span className={styles.ContainerInput__Span}>
                    GENERO
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    required
                    disabled={isBeneficiary}
                    name="FECHA_NACIMIENTO"
                    onChange={saveDataTemporaly}
                    placeholder=" "
                    type="date"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Fecha de Nacimiento
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    disabled={isBeneficiary}
                    name="DIRECCION"
                    onChange={saveDataTemporaly}
                    placeholder=" "
                    type="text"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Direccion
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <select
                    required
                    disabled={isBeneficiary}
                    className={styles.ContainerInput__Input}
                    name="REFERENCIA"
                    onChange={saveDataTemporaly}
                    id=""
                  >
                    <option value=""></option>
                    <option value="NO APLICA">----NO APLICA ------</option>
                    <option value="CENTRO DE SALUD">CENTRO DE SALUD</option>
                  </select>
                  <span className={styles.ContainerInput__Span}>
                    REFERENCIA
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    required
                    disabled={isBeneficiary}
                    name="NUMERO_HERMANOS"
                    onChange={saveDataTemporaly}
                    placeholder=" "
                    type="number"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Numero de Hermanos
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className={styles.ContainerInput}>
                  <input
                    required
                    disabled={isBeneficiary}
                    name="NUMERO_OCUPA"
                    onChange={saveDataTemporaly}
                    placeholder=" "
                    type="number"
                    className={styles.ContainerInput__Input}
                  />
                  <span className={styles.ContainerInput__Span}>
                    Numero que Ocupa
                  </span>
                </div>
              </div>

              <div className={styles.Grid__item}>
                <div className="Container-Input-file">
                  <span className="Container-Input-file__Span">
                    Referencia de Centro Medico
                  </span>
                  <input
                    required
                    disabled={isBeneficiary}
                    multiple
                    name="files"
                    onChange={selectImageList}
                    placeholder=" "
                    type="file"
                    className="Container-Input-file__Input"
                  />
                </div>
              </div>

              <div className={styles.Grid__button}>
                <button id="button-beneficiario" className="Button Button--Guardar">
                  <div className="Button__Icono">
                    <FontAwesomeIcon icon="fa-solid fa-file-export" />
                  </div>
                  <span className="Button__Span Iniciar">Guardar</span>
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* DATOS DEL ENCARGADO */}
        <FormEncargado idBene={idBeneficiary} />
        {/* HISTORIAL */}
        <FormHistorialClinico idBenefi={idBeneficiary} />
        {/* PRE-NATALES */}
        <FormPrenatales idBen={idBeneficiary} />
        {/* PERINATALES    */}
        <FormPerinatales idBen={idBeneficiary} />
        {/* POSTNATALES */}
        <FormPostNatal idBen={idBeneficiary} />
      </div>
    </>
  );
};

export default FormBeneficiario;
