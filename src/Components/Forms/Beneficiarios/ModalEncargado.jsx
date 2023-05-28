import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalEncargados({ beneficiary, onClose }) {
  const [encargados, setEncargados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEncargados = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarEncargadoBene/${beneficiary.ID_BENEFICIARIO}`);
        setEncargados(response.data);
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    fetchEncargados();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarEncargado = async (idEncargado, encargadoActualizado) => {
    try {
      // ...
      
      const response = await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateEncargadosBene/${idEncargado}`, encargadoActualizado);
      alert('Información actualizada correctamente');
      console.log(response);
      setEncargados(updatedEncargados);
    } catch (error) {
      alert('Error al actualizar la información:', error);
    }
  };

  if (isLoading) {
    return <div>Cargando información...</div>;
  }
  return (
    <div>
    <span className="close" onClick={onClose}>
      &times;
    </span>
    <h2>Editar Información de Encargados</h2>
    {encargados.map((encargado) => (
      <div key={encargado.ID_ENCARGADO}>
        <h3>Encargado {encargado.ID_ENCARGADO}</h3>
        <div>
          <label>Primer nombre:</label>
          <input
            type="text"
            value={encargado.NOMBRE1}
            onChange={(e) => {
              const updatedEncargados = encargados.map((enc) =>
                enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, NOMBRE1: e.target.value } : enc
              );
              setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Segundo nombre:</label>
            <input
              type="text"
              value={encargado.NOMBRE2}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, NOMBRE2: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Tercer nombre:</label>
            <input
              type="text"
              value={encargado.NOMBRE3}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, NOMBRE3: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Primer apellido:</label>
            <input
              type="text"
              value={encargado.APELLIDO1}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, APELLIDO1: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Segundo apellido:</label>
            <input
              type="text"
              value={encargado.APELLIDO2}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, APELLIDO2: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              type="text"
              value={encargado.TELEFONO}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, TELEFONO: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Tipo:</label>
            <input
              type="text"
              value={encargado.TIPO}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, TIPO: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Escolaridad:</label>
            <input
              type="text"
              value={encargado.ESCOLARIDAD}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, ESCOLARIDAD: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Ocupación:</label>
            <input
              type="text"
              value={encargado.OCUPACION}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, OCUPACION: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <div>
            <label>Fecha de nacimiento:</label>
            <input
              type="date"
              value={encargado.FECHA_NACIMIENTO.slice(0, 10)}
              onChange={(e) => {
                const updatedEncargados = encargados.map((enc) =>
                  enc.ID_ENCARGADO === encargado.ID_ENCARGADO ? { ...enc, FECHA_NACIMIENTO: e.target.value } : enc
                );
                setEncargados(updatedEncargados);
              }}
            />
          </div>
          <button onClick={() => actualizarEncargado(encargado.ID_ENCARGADO, encargado)}>Actualizar</button>
        </div>
      ))}
    </div>
  );
}

export default ModalEncargados;