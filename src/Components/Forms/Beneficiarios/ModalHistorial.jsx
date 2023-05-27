import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ModalHistorial({ beneficiary, onClose }) {
  const [historial, setHistorial] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await axios.get(`https://amordownapi-production.up.railway.app/beneficiarios/buscarHistorialClinicoBene/${beneficiary.ID_BENEFICIARIO}`);
        setHistorial(response.data[0]); // Asumiendo que la respuesta es un arreglo de un solo elemento
        setIsLoading(false);
      } catch (error) {
        alert('Error al obtener el historial clínico:', error);
      }
    };

    fetchHistorial();
  }, [beneficiary.ID_BENEFICIARIO]);

  const actualizarHistorial = async () => {
    try {
      await axios.post(`https://amordownapi-production.up.railway.app/beneficiarios/updateInfoBeneHistorialClinico/${beneficiary.ID_BENEFICIARIO}`, historial);
      alert('Historial actualizado correctamente');
    } catch (error) {
      alert('Error al actualizar el historial clínico:', error);
    }
  };

  if (isLoading) {
    return <div>Cargando historial clínico...</div>;
  }

  return (
    
    <div>
      <span className="close" onClick={onClose}>
          &times;
        </span>
      <h2>Historial Clínico</h2>
      <div>
        <label>Enfermedad que padece:</label>
        <input type="text" value={historial.ENFERMEDAD_PADECE} onChange={(e) => setHistorial({ ...historial, ENFERMEDAD_PADECE: e.target.value })} />
      </div>
      <div>
        <label>Medicamentos que ingiere:</label>
        <input type="text" value={historial.MEDICAMENTOS_INGIERE} onChange={(e) => setHistorial({ ...historial, MEDICAMENTOS_INGIERE: e.target.value })} />
      </div>
      <div>
        <label>Vacunas:</label>
        <input type="text" value={historial.VACUNAS} onChange={(e) => setHistorial({ ...historial, VACUNAS: e.target.value })} />
      </div>
      <div>
        <label>Audición:</label>
        <input type="text" value={historial.AUDICION} onChange={(e) => setHistorial({ ...historial, AUDICION: e.target.value })} />
      </div>
      <div>
        <label>Problemas oftalmológicos:</label>
        <input type="text" value={historial.ORFTAMOLOGICAS} onChange={(e) => setHistorial({ ...historial, ORFTAMOLOGICAS: e.target.value })} />
      </div>
      <div>
        <label>Aparato auditivo:</label>
        <input type="text" value={historial.APARATO_AUDITIVO} onChange={(e) => setHistorial({ ...historial, APARATO_AUDITIVO: e.target.value })} />
      </div>
      <div>
        <label>Lentes:</label>
        <input type="text" value={historial.LENTES} onChange={(e) => setHistorial({ ...historial, LENTES: e.target.value })} />
      </div>
      <div>
        <label>Cirugías:</label>
        <input type="text" value={historial.CIRUJIAS} onChange={(e) => setHistorial({ ...historial, CIRUJIAS: e.target.value })} />
      </div>
      <div>
        <label>Discapacidad:</label>
        <input type="text" value={historial.DISCAPACIDAD} onChange={(e) => setHistorial({ ...historial, DISCAPACIDAD: e.target.value })} />
      </div>
      <div>
        <label>Diagnóstico:</label>
        <input type="text" value={historial.DIAGNOSTICO} onChange={(e) => setHistorial({ ...historial, DIAGNOSTICO: e.target.value })} />
      </div>
      <div>
        <label>Otras:</label>
        <input type="text" value={historial.OTRAS} onChange={(e) => setHistorial({ ...historial, OTRAS: e.target.value })} />
      </div>
      <button onClick={actualizarHistorial}>Actualizar</button>
      
    </div>
  );
}

export default ModalHistorial;





