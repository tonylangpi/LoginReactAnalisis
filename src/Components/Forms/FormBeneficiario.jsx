import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const FormBeneficiario = () => {
  const [archivo, setArchivo] = useState(null)
  const [idBeneficiary, setIdBeneficiary] = useState(null)
  const [isBeneficiary, setisBeneficiary] = useState(false)
  
 
  
  const selectImageList = (e) => {
    const uplodad = e.target.files
    // console.log(uplodad.length)
    if (uplodad.length > 2) {
      alert("No puedes subir más de 2 archivos")
      setArchivo(null)
    } else {
      const uplodadList = []

      for (let i = 0; i < uplodad?.length; i++) {
        uplodadList.push(uplodad.item(i))
      }
      setArchivo(uplodadList)
    }
  }

  const [beneficiario, setBeneficiario] = React.useState({
    ID_EMPRESA: 1,
    NOMBRE1: "",
    NOMBRE2: "",
    NOMBRE3: "",
    APELLIDO1: "",
    APELLIDO2: "",
    ESCOLARIDAD: "",
    SEXO: "",
    FECHA_NACIMIENTO: "",
    DIRECCION: "",
    REFERENCIA: "",
    NUMERO_HERMANOS: 0,
    NUMERO_OCUPA: 0,
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setBeneficiario({
      ...beneficiario,
      [e.target.name]: e.target.value
    })
  }

  const fileSubmit = (e) => {
    if (!archivo) {
      e.preventDefault()
      alert("tiene que tener archivos")
    } else {

      e.preventDefault();
      try {

        const data = new FormData();
        data.append('ID_EMPRESA', beneficiario.ID_EMPRESA)
        data.append('NOMBRE1', beneficiario.NOMBRE1)
        data.append('NOMBRE2', beneficiario.NOMBRE2)
        data.append('NOMBRE3', beneficiario.NOMBRE3)
        data.append('APELLIDO1', beneficiario.APELLIDO1)
        data.append('APELLIDO2', beneficiario.APELLIDO2)
        data.append('ESCOLARIDAD', beneficiario.ESCOLARIDAD)
        data.append('SEXO', beneficiario.SEXO)
        data.append('FECHA_NACIMIENTO', beneficiario.FECHA_NACIMIENTO)
        data.append('DIRECCION', beneficiario.DIRECCION)
        data.append('REFERENCIA', beneficiario.REFERENCIA)
        data.append('NUMERO_HERMANOS', beneficiario.NUMERO_HERMANOS)
        data.append('NUMERO_OCUPA', beneficiario.NUMERO_OCUPA)

        for (let i = 0; i < archivo?.length; i++) {
          data.append('files', archivo[i])
        }

        axios({
          method: "post",
          url: "http://localhost:4000/beneficiarios/create",
          data: data,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {

            const idBeneficiaryCurrent = response?.data?.idBeneficiario[0]?.ID_BENE_INGRESADO
            !idBeneficiaryCurrent ? alert("no existe beneficiario") : setIdBeneficiary(idBeneficiaryCurrent)
            setisBeneficiary(true)
          })
          .catch(function (response) {
            alert("No se ha encontrado un registro")
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
// CAMPOS DEL ENCARGADO
  const [Encargado, setEncargado] = React.useState({
    ID_EMPRESA: 1,
    NOMBRE1: "",
    NOMBRE2: "",
    NOMBRE3: "",
    APELLIDO1: "",
    APELLIDO2: "",
    TELEFONO: "",
    TIPOENCARGADO: "",
    ESCOLARIDAD: "",
    OCUPACION: "",
    FECHA_NACIMIENTO: ""
  });
      axios.post('http://localhost:4000/beneficiarios/unionBeneficiarioEncargado',Encargado)
      .then(function (response) {
      console.log(response)
      })
      .catch(function (response) {
        alert("No se ha encontrado un registro")
        console.log(response);
      });
// CAMPOS DEL HISTORIAL
      const [Historial, setHistorial] = React.useState({
        ID_BENEFICIARIO: 1,
        ENFERMEDAD_PADECE: "",
        MEDICAMENTOS_INGIERE: "",
        VACUNAS: "",
        AUDICION: "",
        ORFTAMOLOGICAS: "",
        APARATO_AUDITIVO: "",
        LENTES: "",
        CIRUJIAS: "",
        OTRAS: "",
      });
      axios.post('http://localhost:4000/beneficiarios/createHistorialClinico',Historial)
      .then(function (response) {
      console.log(response)
      })
      .catch(function (response) {
        alert("No se ha encontrado un registro")
        console.log(response);
      });

// CAMPOS DEL PRENATALES
      const [Prenatales, setPrenatales] = React.useState({
        ID_BENEFICIARIO: 1,
        EMBARAZO_TERMINO: "",
        EXPLIQUE_EMBARAZO: "",
        PARTO_NORMAL: "",
        EXPLIQUE_PARTO: "",
        COMPLICACIONES: "",
        EXPLIQUE_COMPLICACION: "",
      });
      axios.post('http://localhost:4000/beneficiarios//createPrenatales',Prenatales)
      .then(function (response) {
      console.log(response)
      })
      .catch(function (response) {
        alert("No se ha encontrado un registro")
        console.log(response);
      });

 // CAMPOS DEL PERINATALES
       const [Perinatales, setPerinatales] = React.useState({
        ID_BENEFICIARIO: 1,
        LLORO_INMEDIATAMENTE: "",
        COLORACION: "",
        INCUBADORA: "",
        COLOR: "",
      });
      axios.post('http://localhost:4000/beneficiarios/createPeriNatales',Perinatales)
      .then(function (response) {
      console.log(response)
      })
      .catch(function (response) {
        alert("No se ha encontrado un registro")
        console.log(response);
      });

// CAMPOS DEL PERINATALES
        const [Postnatales, setPostnatales] = React.useState({
          ID_BENEFICIARIO: 1,
          TRATAMIENTO: "",
          INFECCIONES: "",
          FIEBRE: "",
          CONVULCIONES: "",
          LENGUAJE: "",
          CAMINA: "",
          OBSERVACIONES: "",
        });
        axios.post('http://localhost:4000/beneficiarios/createPostNatales',Postnatales)
        .then(function (response) {
        console.log(response)
        })
        .catch(function (response) {
          alert("No se ha encontrado un registro")
          console.log(response);
        });
  

  return (
    <>
      <div className='Container-Beneficiario'>
{/* DATOS DEL BENEFICIARIO */}
      {
              !isBeneficiary ?
        <div id='FormBeneficiario' className='Container-Beneficiario Datos-Beneficiario'>
          <div className='Container-Beneficiario__item Titulo'>
            <h1>Datos del Beneficiarios</h1>
          </div>

          <form onSubmit={fileSubmit} className='Container-Beneficiario__Grid'>
            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  name='NOMBRE1'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Primer Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  placeholder=" "
                  name='NOMBRE2'
                  onChange={saveDataTemporaly}
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Segundo Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  placeholder=" "
                  name='NOMBRE3'
                  onChange={saveDataTemporaly}
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Tercer Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  name='APELLIDO1'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Primer Apellido</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  name='APELLIDO2'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Segundo Apellido</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <select required disabled={isBeneficiary} className='Beneficiario-Container-Input__Input' name="ESCOLARIDAD" onChange={saveDataTemporaly} id="">
                  <option value="Primaria">Primaria</option>
                  <option value="Basico">Basico</option>
                  <option value="Diversificado">Diversificado</option>
                  <option value="Universidad">Universidad</option>
                </select>
                <span className="Beneficiario-Container-Input__Span">Escolaridad</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  name='SEXO'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Genero</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  name='FECHA_NACIMIENTO'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="date"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Fecha de Nacimiento</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  name='DIRECCION'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Direccion</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <select required disabled={isBeneficiary} className='Beneficiario-Container-Input__Input' name="REFERENCIA" onChange={saveDataTemporaly} id="">
                  <option value="Primaria">Primaria</option>
                  <option value="Basico">Basico</option>
                  <option value="Diversificado">Diversificado</option>
                  <option value="Universidad">Universidad</option>
                </select>
                <span className="Beneficiario-Container-Input__Span">Escolaridad</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  name='NUMERO_HERMANOS'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="number"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Numero de Hermanos</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  disabled={isBeneficiary}
                  name='NUMERO_OCUPA'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="number"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Numero que Ocupa</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Container-Input-file">
                <span className="Container-Input-file__Span">Referencia de Centro Medico</span>
                <input
                  required
                  disabled={isBeneficiary}
                  multiple
                  name='files'
                  onChange={selectImageList}
                  placeholder=" "
                  type="file"
                  className="Container-Input-file__Input" />
              </div>
            </div>
     
                <div className='Container-Beneficiario__Grid-button'>
                  <button id="button-beneficiario" className="Button Button--Guardar">
                    <div className="Button__Icono">
                      <FontAwesomeIcon icon="fa-solid fa-file-export" />
                    </div>
                    <span className="Button__Span Iniciar">Guardar</span>
                  </button>
                </div>


          </form>

        </div>
        : null
      }

{/* DATOS DEL ENCARGADO */}
      {
         !isBeneficiary ?
        <div id="FormDatosEncargado" className='Container-Beneficiario Datos-Encargado'>

          <div   className='Container-Beneficiario__item Titulo'>
            <h1>Datos del Encargado</h1>
          </div>

          <div className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                 required
                 disabled={isBeneficiary}
                 name='NOMBRE1'
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Primer Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                   required
                   name='NOMBRE2'
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Segundo Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  name='NOMBRE3'
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Tercer Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  required
                  name='APELLIDO1'
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Primer Apellido</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                 required
                 name='APELLIDO2'
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Segundo Apellido</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                 required
                 name='TELEFONO'
                  placeholder=" "
                  type="number"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Telefono</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <select  required className='Beneficiario-Container-Input__Input' name="TIPOENCARGADO" id="">
                  <option value="Diversificado">Encargado</option>
                  <option value="Primaria">Mamá</option>
                  <option value="Basico">Papá</option>
                </select>
                <span className="Beneficiario-Container-Input__Span">Tipo de Encargado</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <select required className='Beneficiario-Container-Input__Input' name="ESCOLARIDAD" id="">
                  <option value="Primaria">Primaria</option>
                  <option value="Basico">Basico</option>
                  <option value="Diversificado">Diversificado</option>
                  <option value="Universidad">Universidad</option>
                </select>
                <span className="Beneficiario-Container-Input__Span">Escolaridad</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                required
                name='OCUPACION'
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Ocupacion</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                required
                name='FECHA_NACIMIENTO'
                  placeholder=" "
                  type="date"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Fecha de Nacimiento</span>
              </div>
            </div>

          </div>

      
                <div className='Container-Beneficiario__Grid-button'>
                  <button id="button-Encargado" className="Button Button--Guardar">
                    <div className="Button__Icono">
                      <FontAwesomeIcon icon="fa-solid fa-file-export" />
                    </div>
                    <span className="Button__Span Iniciar">Guardar</span>
                  </button>
                </div>

            

        </div>

        : null
      }
{/* HISTORIAL */}
      {
              !isBeneficiary ?
        <div id="FormHistorialClinico" className='Container-Beneficiario Historial-Clinico'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Historial Clinico</h1>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea  required name='ENFERMEDAD_PADECE' disabled={isBeneficiary} className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Enfermedades que padece:</span>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea required name='MEDICAMENTOS_INGIERE' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Medicamentos que ingiere:</span>
            </div>
          </div>

          <div className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Esquema Completo de Vacunas?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="VACUNAS" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="VACUNAS" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tiene Examenes Auditivos?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="AUDICION" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="AUDICION" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tiene Pruebas Oftamologicas?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="ORFTAMOLOGICAS" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="ORFTAMOLOGICAS" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Usa Aparatos Auditivos?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="APARATO_AUDITIVO" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="APARATO_AUDITIVO" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿lentes?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="LENTES" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="LENTES" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Ha tenido Cirugias?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="CIRUJIAS" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="CIRUJIAS" />NO
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea required name='OTRAS' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Otros:</span>
            </div>
          </div>

     
                <div  className='Container-Beneficiario__Grid-button'>
                  <button id="button-Historial" className="Button Button--Guardar">
                    <div className="Button__Icono">
                      <FontAwesomeIcon icon="fa-solid fa-file-export" />
                    </div>
                    <span className="Button__Span Iniciar">Guardar</span>
                  </button>
                </div>

            
        </div>
         : null
      }
{/* PRE-NATALES */}
      {
              !isBeneficiary ?
        <div id="FormPrenatales" className='Container-Beneficiario Antecedentes-Pre-Natales'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Antecedentes Pre-Natales</h1>
          </div>

          <div className="Container-Beneficiario__item RadioButton">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Fue un embarazo de termino?</label>
              <div className='Beneficiario-Container-Radio__Radio'>
                <div className='InputRadio'>
                  <input required  disabled={isBeneficiary} className="" type="radio" name="EMBARAZO_TERMINO" />SI
                </div>
                <div className='InputRadio'>
                  <input required className="" type="radio" name="EMBARAZO_TERMINO" />NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea required name='EXPLIQUE_EMBARAZO' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Explique:</span>
            </div>
          </div>

          <div className="Container-Beneficiario__item RadioButton">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Fue un embarazo normal?</label>
              <div className='Beneficiario-Container-Radio__Radio'>
                <div className='InputRadio'>
                  <input required className="" type="radio" name="PARTO_NORMAL" />SI
                </div>
                <div className='InputRadio'>
                  <input required className="" type="radio" name="PARTO_NORMAL" />NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea required name='EXPLIQUE_PARTO' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Explique:</span>
            </div>
          </div>

          <div className="Container-Beneficiario__item RadioButton">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Tuvo complicaciones durante el embarazo?</label>
              <div className='Beneficiario-Container-Radio__Radio'>
                <div className='InputRadio'>
                  <input required  className="" type="radio" name="COMPLICACIONES" />SI
                </div>
                <div className='InputRadio'>
                  <input required  className="" type="radio" name="COMPLICACIONES" />NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea required  name='EXPLIQUE_COMPLICACION' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Explique:</span>
            </div>
          </div>

         
                <div className='Container-Beneficiario__Grid-button'>
                  <button id="Prenatales" className="Button Button--Guardar">
                    <div className="Button__Icono">
                      <FontAwesomeIcon icon="fa-solid fa-file-export" />
                    </div>
                    <span className="Button__Span Iniciar">Guardar</span>
                  </button>
                </div>

            

        </div>

          : null
      }
{/* PERINATALES    */}
    {
              !isBeneficiary ?
        <div id="FormPeriNatales" className='Container-Beneficiario Antecedentes-Peri-Natales'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Antecedentes Peri-Natales</h1>
          </div>

          <div className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿El niño lloro inmediatamente?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required disabled={isBeneficiary} className="" type="radio" name="LLORO_INMEDIATAMENTE" />SI
                  </div>
                  <div className='InputRadio'>
                    <input  required className="" type="radio" name="LLORO_INMEDIATAMENTE" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Su coloracion fue normal?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="COLORACION" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="COLORACION" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Estuvo en incubadora?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="INCUBADORA" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="INCUBADORA" />NO
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea required name='COLOR' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">¿Nacio amarillo o morado?:</span>
            </div>
          </div>

          
                <div className='Container-Beneficiario__Grid-button'>
                  <button id="Perinatales" className="Button Button--Guardar">
                    <div className="Button__Icono">
                      <FontAwesomeIcon icon="fa-solid fa-file-export" />
                    </div>
                    <span className="Button__Span Iniciar">Guardar</span>
                  </button>
                </div>

           
        </div>

        : null
    }
{/* POSTNATALES */}
    {
              !isBeneficiary ?

        <div id="FormPostNatales" className='Container-Beneficiario Antecedentes-Post-Natales'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Antecedentes Post-Natales</h1>
          </div>

          <div className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tuvo tratamiento despues del parto?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required disabled={isBeneficiary} className="" type="radio" name="TRATAMIENTO" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="TRATAMIENTO" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tuvo infecciones?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="INFECCIONES" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="INFECCIONES" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tuvo Fiebre?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="FIEBRE" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="FIEBRE" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tuvo convulciones?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="CONVULCIONES" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="CONVULCIONES" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tiene lenguaje?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="LENGUAJE" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="LENGUAJE" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Camina?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="CAMINA" />SI
                  </div>
                  <div className='InputRadio'>
                    <input required className="" type="radio" name="CAMINA" />NO
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea required name='OBSERVACIONES' className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Observaciones</span>
            </div>
          </div>

          
                <div className='Container-Beneficiario__Grid-button'>
                  <button id="Postnatales" className="Button Button--Guardar">
                    <div className="Button__Icono">
                      <FontAwesomeIcon icon="fa-solid fa-file-export" />
                    </div>
                    <span className="Button__Span Iniciar">Guardar</span>
                  </button>
                </div>

            
        </div>

        
      : null
    }

      </div>
    </>
  );
}

export default FormBeneficiario