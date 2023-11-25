import React, { useState, useEffect } from "react";
import styles from "../../assets/scss/Modal.module.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ onClose, visible, dataSelect }) => {
  const [archivo, setArchivo] = useState(null);
  const [Sesiones, setSesiones] = useState([])
  const fileSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id_beneficiario", dataSelect.ID_BENEFICIARIO);
      formData.append("token", localStorage.getItem("Auth"));
      formData.append("id_sesion", citas.id_sesion);
      formData.append("tipo_sesion", citas.tipo_sesion);
      formData.append("observacion", citas.observacion);
      formData.append("fecha", citas.fecha);
      for (let i = 0; i < archivo?.length; i++) {
        formData.append("evaluaciones", archivo[i]);
      }
      axios({
        method: "POST",
        url: "http://localhost:4000/sesiones/createSesion",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          alert("cita insertada correctamente");
        })
        .catch(function (response) {
          alert("No se ha encontrado un registro");
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setCitas({
      ...citas,
      [e.target.name]: e.target.value,
    });
  };

  const [citas, setCitas] = React.useState({
    id_beneficiario: "",
    id_usuario: localStorage.getItem("id"),
    id_sesion: "",
    tipo_sesion: "",
    observacion: "",
    fecha: "",
  });
  useEffect(() => {
    async function fetchData() {
        const TSesiones = await axios.post('http://localhost:4000/sesiones/SesionesDisponibles', {Fecha: citas.fecha, Beneficiario:dataSelect.ID_BENEFICIARIO});
        setSesiones(TSesiones.data);
    }
    fetchData();
  }, [citas.fecha]);

  const sesion = [
    { id: 1, title: "Sesion 1" },
    { id: 2, title: "Sesion 2" },
    { id: 3, title: "Sesion 3" },
    { id: 4, title: "Sesion 4" },
    { id: 5, title: "Sesion 5" },
    { id: 6, title: "Sesion 6" },
    { id: 7, title: "Sesion 7" },
    { id: 8, title: "Sesion 8" },
    { id: 9, title: "Sesion 9" },
    { id: 10, title: "Sesion 10" },
    { id: 11, title: "Sesion 11" },
    { id: 12, title: "Sesion 12" },
    { id: 13, title: "Sesion 13" },
    { id: 14, title: "Sesion 14" },
  ];

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

  const handleOnClose = () => {
    onClose();
  };
  if (!visible) return null;
  return (
    <div className={styles.ModalBeneficiary}>
      <form
        className={styles.ModalBeneficiary__Content}
        onSubmit={fileSubmit}
        action=""
      >
        <div className={styles.Grid}>
          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                onChange={saveDataTemporaly}
                value={`${dataSelect.NOMBRE1} ${dataSelect.APELLIDO1}`}
                id="NombreBeneficiario"
                type="text"
                name="id_beneficiario"
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>
                Nombre Beneficia
              </span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <select
                onChange={saveDataTemporaly}
                className={styles.ContainerInput__Input}
                name="id_sesion"
                id=""
              >
                <option value=""></option>
                {Sesiones.map((item) => (
                  <option key={item.ID_SESION} value={item.ID_SESION}>
                   Sesion No. {item.NUMERO_SESION}
                  </option>
                ))}
              </select>
              <span className={styles.ContainerInput__Span}>Sessiones</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                onChange={saveDataTemporaly}
                type="date"
                name="fecha"
                placeholder=" "
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>Fecha</span>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <label>¿Tipo de Sessión?</label>
            <div className={styles.ContainerRadio}>
              <div className={styles.ContainerRadio__Radio}>
                <input
                  onMouseDown={saveDataTemporaly}
                  type="radio"
                  value={"Normal"}
                  name="tipo_sesion"
                />
                Normal
              </div>
              <div className={styles.ContainerRadio__Radio}>
                <input
                  onMouseDown={saveDataTemporaly}
                  type="radio"
                  value={"Inicial"}
                  name="tipo_sesion"
                />
                Inicial
              </div>
            </div>
          </div>

          <div className={styles.Grid__item}>
            <div className={styles.ContainerInput}>
              <input
                placeholder=" "
                onChange={saveDataTemporaly}
                type="text"
                name="observacion"
                className={styles.ContainerInput__Input}
              />
              <span className={styles.ContainerInput__Span}>
                Observaciones:
              </span>
            </div>
          </div>

          {citas.tipo_sesion == "Inicial" ? (
            <div className={styles.Grid__item}>
              <div className="Container-Input-file">
                <span className="Container-Input-file__Span">Hoja</span>
                <input
                  name="files"
                  onChange={selectImageList}
                  placeholder=" "
                  type="file"
                  className="Container-Input-file__Input"
                />
              </div>
            </div>
          ) : null}

          <button className="Button">Registrar Cita</button>

          <div className={styles.Grid__button}>
            <span className={styles.Close} onClick={handleOnClose}>
              <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
              {/* &times; */}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
