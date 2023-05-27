import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalPeri({ beneficiary, onClose }) {
  const [informacion, setInformacion] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInformacion = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarPerinatalesBene/${beneficiary.ID_BENEFICIARIO}`);
        setInformacion(response.data[0]); 
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    fetchInformacion();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarInformacion = async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePerinatales/${beneficiary.ID_BENEFICIARIO}`, informacion);
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
        <input type="text" value={informacion.LLORO_INMEDIATAMENTE} onChange={(e) => setInformacion({ ...informacion, LLORO_INMEDIATAMENTE: e.target.value })} />
      </div>
      <div>
        <label>Coloración:</label>
        <input type="text" value={informacion.COLORACION} onChange={(e) => setInformacion({ ...informacion, COLORACION: e.target.value })} />
      </div>
      <div>
        <label>Incubadora:</label>
        <input type="text" value={informacion.INCUBADORA} onChange={(e) => setInformacion({ ...informacion, INCUBADORA: e.target.value })} />
      </div>
      <div>
        <label>Color:</label>
        <input type="text" value={informacion.COLOR} onChange={(e) => setInformacion({ ...informacion, COLOR: e.target.value })} />
      </div>
      <button onClick={actualizarInformacion}>Actualizar</button>
     
    </div>
  );
}

export default ModalPeri;