import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalPreNatal({ beneficiary, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [prenatal, setPrenatal] = useState({});
  useEffect(() => {
    const fetchPrenatal = async () => {

      console.log(beneficiary.ID_BENEFICIARIO);
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarPrenatalesBene/${beneficiary.ID_BENEFICIARIO}`);
        setPrenatal(response.data[0]);
       setIsLoading(false);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    fetchPrenatal();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPrenatal= async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePrenatales/${beneficiary.ID_BENEFICIARIO}`, prenatal);
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
        <input type="text" value={prenatal.EMBARAZO_TERMINO} onChange={(e) => setPrenatal({ ...prenatal, EMBARAZO_TERMINO: e.target.value })} />
      </div>
      <div>
        <label>Explique el embarazo:</label>
        <input type="text" value={prenatal.EXPLIQUE_EMBARAZO} onChange={(e) => setPrenatal({ ...prenatal, EXPLIQUE_EMBARAZO: e.target.value })} />
      </div>
      <div>
        <label>Parto normal:</label>
        <input type="text" value={prenatal.PARTO_NORMAL} onChange={(e) => setPrenatal({ ...prenatal, PARTO_NORMAL: e.target.value })} />
      </div>
      <div>
        <label>Explique el parto:</label>
        <input type="text" value={prenatal.EXPLIQUE_PARTO} onChange={(e) => setPrenatal({ ...prenatal, EXPLIQUE_PARTO: e.target.value })} />
      </div>
      <div>
        <label>Complicaciones:</label>
        <input type="text" value={prenatal.COMPLICACIONES} onChange={(e) => setPrenatal({ ...prenatal, COMPLICACIONES: e.target.value })} />
      </div>
      <div>
        <label>Explique la complicación:</label>
        <input type="text" value={prenatal.EXPLIQUE_COMPLICACION} onChange={(e) => setPrenatal({ ...prenatal, EXPLIQUE_COMPLICACION: e.target.value })} />
      </div>
      <button onClick={actualizarPrenatal}>Actualizar</button>
  
    </div>
  );
}

export default ModalPreNatal;