import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalPreNatal({ beneficiary, onClose }) {
  const [preNatalInfo, setPreNatalInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPreNatalInfo = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarPrenatalesBene/${beneficiary.ID_BENEFICIARIO}`);
        setPreNatalInfo(response.data[0]);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    fetchPreNatalInfo();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPreNatalInfo = async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePrenatales/${beneficiary.ID_BENEFICIARIO}`, preNatalInfo);
      alert('Información actualizada correctamente');
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
      <h2>Información Prenatal</h2>
      <div>
        <label>Embarazo a término:</label>
        <input type="text" value={preNatalInfo.EMBARAZO_TERMINO} onChange={(e) => setPreNatalInfo({ ...preNatalInfo, EMBARAZO_TERMINO: e.target.value })} />
      </div>
      <div>
        <label>Explique el embarazo:</label>
        <input type="text" value={preNatalInfo.EXPLIQUE_EMBARAZO} onChange={(e) => setPreNatalInfo({ ...preNatalInfo, EXPLIQUE_EMBARAZO: e.target.value })} />
      </div>
      <div>
        <label>Parto normal:</label>
        <input type="text" value={preNatalInfo.PARTO_NORMAL} onChange={(e) => setPreNatalInfo({ ...preNatalInfo, PARTO_NORMAL: e.target.value })} />
      </div>
      <div>
        <label>Explique el parto:</label>
        <input type="text" value={preNatalInfo.EXPLIQUE_PARTO} onChange={(e) => setPreNatalInfo({ ...preNatalInfo, EXPLIQUE_PARTO: e.target.value })} />
      </div>
      <div>
        <label>Complicaciones:</label>
        <input type="text" value={preNatalInfo.COMPLICACIONES} onChange={(e) => setPreNatalInfo({ ...preNatalInfo, COMPLICACIONES: e.target.value })} />
      </div>
      <div>
        <label>Explique la complicación:</label>
        <input type="text" value={preNatalInfo.EXPLIQUE_COMPLICACION} onChange={(e) => setPreNatalInfo({ ...preNatalInfo, EXPLIQUE_COMPLICACION: e.target.value })} />
      </div>
      <button onClick={actualizarPreNatalInfo}>Actualizar</button>
      <button onClick={closeModal}>Cerrar</button>
    </div>
  );
}

export default ModalPreNatal;