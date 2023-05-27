import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalPeri({ beneficiary, onClose }) {
  const [peri, setPeri] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeri = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarPerinatalesBene/${beneficiary.ID_BENEFICIARIO}`);
        setPeri(response.data[0]); 
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    

    fetchPeri();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPeri = async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePerinatales/${beneficiary.ID_BENEFICIARIO}`, peri);
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
      <h2>Editar Informacion PeriNatal</h2>
      <div>
        <label>Lloro inmediatamente al nacer:</label>
        <input type="text" value={peri.LLORO_INMEDIATAMENTE} onChange={(e) => setPeri({ ...peri, LLORO_INMEDIATAMENTE: e.target.value })} />
      </div>
      <div>
        <label>Coloración:</label>
        <input type="text" value={peri.COLORACION} onChange={(e) => setPeri({ ...peri, COLORACION: e.target.value })} />
      </div>
      <div>
        <label>Incubadora:</label>
        <input type="text" value={peri.INCUBADORA} onChange={(e) => setPeri({ ...peri, INCUBADORA: e.target.value })} />
      </div>
      <div>
        <label>Color:</label>
        <input type="text" value={peri.COLOR} onChange={(e) => setPeri({ ...peri, COLOR: e.target.value })} />
      </div>
      <button onClick={actualizarPeri}>Actualizar</button>
     
    </div>
  );
}

export default ModalPeri;