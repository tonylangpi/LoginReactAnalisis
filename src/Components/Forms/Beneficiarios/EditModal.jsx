import React, { useState } from 'react';
import axios from 'axios';

const EditModal = ({ beneficiary, onClose }) => {
  const [updatedData, setUpdatedData] = useState({
    NOMBRE1: beneficiary.NOMBRE1,
    NOMBRE2: beneficiary.NOMBRE2,
    APELLIDO1: beneficiary.APELLIDO1,
    APELLIDO2: beneficiary.APELLIDO2,
    ESCOLARIDAD: beneficiary.ESCOLARIDAD,
    SEXO: beneficiary.SEXO,
    FECHA_NACIMIENTO: beneficiary.FECHA_NACIMIENTO.slice(0, 10),
    DIRECCION: beneficiary.DIRECCION,
    REFERENCIA: beneficiary.REFERENCIA, 
    NUMERO_HERMANOS: beneficiary.NUMERO_HERMANOS, 
    NUMERO_OCUPA: beneficiary.NUMERO_OCUPA
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBeneGeneral/${beneficiary.ID_BENEFICIARIO}`, updatedData)
      .then(function (response) {
        alert('Datos actualizados:', response.data);
     
      })
      .catch(function (error) {
        console.log(updatedData);
        console.log(beneficiary);
        alert('Error al actualizar los datos:', error);
      });
  };

  const handleInputChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Editar Beneficiario</h2>
        <form onSubmit={handleFormSubmit}>
          <div hidden>
            <label>ID Beneficiario:</label>
            <input type="number" value={beneficiary.ID_BENEFICIARIO} readOnly />
          </div>
          <div>
            <label>Primer Nombre:</label>
            <input
              type="text"
              name="NOMBRE1"
              value={updatedData.NOMBRE1}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Segundo Nombre:</label>
            <input
              type="text"
              name="NOMBRE2"
              value={updatedData.NOMBRE2}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Primer Apellido:</label>
            <input
              type="text"
              name="APELLIDO1"
              value={updatedData.APELLIDO1}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Segundo Apellido:</label>
            <input
              type="text"
              name="APELLIDO2"
              value={updatedData.APELLIDO2}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>ESCOLARIDAD:</label>
            <input
              type="text"
              name="ESCOLARIDAD"
              value={updatedData.ESCOLARIDAD}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>SEXO:</label>
            <input
              type="text"
              name="SEXO"
              value={updatedData.SEXO}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>FECHA DE NACIMIENTO:</label>
            <input
              type="date"
              name="FECHA_NACIMIENTO"
              value={updatedData.FECHA_NACIMIENTO.slice(0, 10)}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>DIRECCION:</label>
            <input
              type="text"
              name="DIRECCION"
              value={updatedData.DIRECCION}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>REFERENCIA:</label>
            <input
              type="text"
              name="REFERENCIA"
              value={updatedData.REFERENCIA}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>NUMERO DE HERMANOS:</label>
            <input
              type="number"
              name="NUMERO_HERMANOS"
              value={updatedData.NUMERO_HERMANOS}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>NUMERO QUE OCUPA:</label>
            <input
              type="number"
              name="NUMERO_OCUPA"
              value={updatedData.NUMERO_OCUPA}
              onChange={handleInputChange}
            />
          </div>
         
          <button type="submit">Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditModal;
