import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalPostNatal({ beneficiary, onClose }) {
  const [postnatal, setPostnatal] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostnatal = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarPostNatalesBene/${beneficiary.ID_BENEFICIARIO}`);
        setPostnatal(response.data[0]); 
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    fetchPostnatal();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPostnatal = async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePostnatales/${beneficiary.ID_BENEFICIARIO}`, postnatal);
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
      <h2>Información Postnatal</h2>
      <div>
        <label>Tratamiento:</label>
        <input type="text" value={postnatal.TRATAMIENTO} onChange={(e) => setPostnatal({ ...postnatal, TRATAMIENTO: e.target.value })} />
      </div>
      <div>
        <label>Infecciones:</label>
        <input type="text" value={postnatal.INFECCIONES} onChange={(e) => setPostnatal({ ...postnatal, INFECCIONES: e.target.value })} />
      </div>
      <div>
        <label>Fiebre:</label>
        <input type="text" value={postnatal.FIEBRE} onChange={(e) => setPostnatal({ ...postnatal, FIEBRE: e.target.value })} />
      </div>
      <div>
        <label>Convulsiones:</label>
        <input type="text" value={postnatal.CONVULCIONES} onChange={(e) => setPostnatal({ ...postnatal, CONVULCIONES: e.target.value })} />
      </div>
      <div>
        <label>Lenguaje:</label>
        <input type="text" value={postnatal.LENGUAJE} onChange={(e) => setPostnatal({ ...postnatal, LENGUAJE: e.target.value })} />
      </div>
      <div>
        <label>Camina:</label>
        <input type="text" value={postnatal.CAMINA} onChange={(e) => setPostnatal({ ...postnatal, CAMINA: e.target.value })} />
      </div>
      <div>
        <label>Observaciones:</label>
        <input type="text" value={postnatal.OBSERVACIONES} onChange={(e) => setPostnatal({ ...postnatal, OBSERVACIONES: e.target.value })} />
      </div>
      <button onClick={actualizarPostnatal}>Actualizar</button>
     
    </div>
  );
}

export default ModalPostNatal;