import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalPostNatal({ beneficiary, onClose }) {
  const [postNatalInfo, setPostNatalInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostNatalInfo = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarPostNatalesBene/${beneficiary.ID_BENEFICIARIO}`);
        setPostNatalInfo(response.data[0]); 
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener la información:', error);
      }
    };

    fetchPostNatalInfo();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarPostNatalInfo = async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBenePostnatales/${beneficiary.ID_BENEFICIARIO}`, postNatalInfo);
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
        <input type="text" value={postNatalInfo.TRATAMIENTO} onChange={(e) => setPostNatalInfo({ ...postNatalInfo, TRATAMIENTO: e.target.value })} />
      </div>
      <div>
        <label>Infecciones:</label>
        <input type="text" value={postNatalInfo.INFECCIONES} onChange={(e) => setPostNatalInfo({ ...postNatalInfo, INFECCIONES: e.target.value })} />
      </div>
      <div>
        <label>Fiebre:</label>
        <input type="text" value={postNatalInfo.FIEBRE} onChange={(e) => setPostNatalInfo({ ...postNatalInfo, FIEBRE: e.target.value })} />
      </div>
      <div>
        <label>Convulsiones:</label>
        <input type="text" value={postNatalInfo.CONVULCIONES} onChange={(e) => setPostNatalInfo({ ...postNatalInfo, CONVULCIONES: e.target.value })} />
      </div>
      <div>
        <label>Lenguaje:</label>
        <input type="text" value={postNatalInfo.LENGUAJE} onChange={(e) => setPostNatalInfo({ ...postNatalInfo, LENGUAJE: e.target.value })} />
      </div>
      <div>
        <label>Camina:</label>
        <input type="text" value={postNatalInfo.CAMINA} onChange={(e) => setPostNatalInfo({ ...postNatalInfo, CAMINA: e.target.value })} />
      </div>
      <div>
        <label>Observaciones:</label>
        <input type="text" value={postNatalInfo.OBSERVACIONES} onChange={(e) => setPostNatalInfo({ ...postNatalInfo, OBSERVACIONES: e.target.value })} />
      </div>
      <button onClick={actualizarPostNatalInfo}>Actualizar</button>
     
    </div>
  );
}

export default ModalPostNatal;