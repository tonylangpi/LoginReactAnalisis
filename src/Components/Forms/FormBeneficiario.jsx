import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'; 

const FormBeneficiario = () => {

  const [archivo, setArchivo] = React.useState([])


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
    files: []
  });

  const saveDataTemporaly = (e) => {
    e.preventDefault();
    setBeneficiario({
      ...beneficiario,
      [e.target.name]: e.target.value,
      files: [...e.target.files]
    })
    console.log(e.target.files);
  }

  const fileSubmit = (e)=>{
    e.preventDefault();

    const data = new FormData();

    data.append('NOMBRE1',beneficiario.NOMBRE1)
    data.append('NOMBRE2',beneficiario.NOMBRE2)
    data.append('NOMBRE3',beneficiario.NOMBRE3)
    data.append('APELLIDO1',beneficiario.APELLIDO1)
    data.append('APELLIDO2',beneficiario.APELLIDO2)
    data.append('ESCOLARIDAD',beneficiario.ESCOLARIDAD)
    data.append('SEXO',beneficiario.SEXO)
    data.append('FECHA_NACIMIENTO',beneficiario.FECHA_NACIMIENTO)
    data.append('DIRECCION',beneficiario.DIRECCION)
    data.append('REFERENCIA',beneficiario.REFERENCIA)
    data.append('NUMERO_HERMANOS',beneficiario.NUMERO_HERMANOS)
    data.append('NUMERO_OCUPA',beneficiario.NUMERO_OCUPA)
    data.append('files',beneficiario.files)

    try {
      axios
        .post("http://localhost:4000/beneficiarios/create", data) //peticion a la api para loguearse
        .then(({ data }) => {
          console.log(data);
          // if (data.auth) {
          //   setPrueba({
          //     auth: data.auth,
          //     message: data.message
          //   });
          //   document.getElementById('Modal').style.display = "flex";
          // } else {
          //   setPrueba({
          //     auth: data.auth,
          //     message: data.message
          //   });
          //   document.getElementById('Modal').style.display = "flex";
          // }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }
  
  // function previewFile(e) {
  //   e.preventDefault();
    
  //   const reader = new FileReader();

  //   reader.addEventListener(
  //     "load",
  //     () => {
  //       var direccion = reader.readAsDataURL(e);
  //     },
  //   );

  //   setBeneficiario({
  //     ...beneficiario,
  //     [e.target.name]: direccion
  //   })
  // }


  return (
    <>
      <div className='Container-Beneficiario'>

        <div className='Container-Beneficiario Datos-Beneficiario'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Datos del Beneficiarios</h1>
          </div>

          <form onSubmit={fileSubmit} className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
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
                <select className='Beneficiario-Container-Input__Input' name="ESCOLARIDAD" onChange={saveDataTemporaly} id="">
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
                <select className='Beneficiario-Container-Input__Input' name="REFERENCIA" onChange={saveDataTemporaly} id="">
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
                  multiple
                  name='files'
                  onChange={saveDataTemporaly}
                  placeholder=" "
                  type="file"
                  className="Container-Input-file__Input" />
              </div>
            </div>

            {/* <div className="Container-Beneficiario__Grid-item">
              <div className="Container-Input-file">
                <span className="Container-Input-file__Span">Hoja de Gratitud</span>
                <input
                  name='files'
                  onChange={previewFile}
                  placeholder=" "
                  type="file"
                  className="Container-Input-file__Input" />
              </div>
            </div> */}

            <div className='Container-Beneficiario__Grid-button'>
              <button className="Button Button--Guardar">
                <div className="Button__Icono">
                  <FontAwesomeIcon icon="fa-solid fa-file-export" />
                </div>
                <span className="Button__Span Iniciar">Guardar</span>
              </button>
            </div>

          </form>

        </div>

        <div className='Container-Beneficiario Datos-Encargado'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Datos del Encargado</h1>
          </div>

          <div className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Primer Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Segundo Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Tercer Nombre</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Segundo Apellido</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Segundo Apellido</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  placeholder=" "
                  type="number"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Telefono</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <select className='Beneficiario-Container-Input__Input' name="" id="">
                  <option value="Diversificado">Encargado</option>
                  <option value="Primaria">Mamá</option>
                  <option value="Basico">Papá</option>
                </select>
                <span className="Beneficiario-Container-Input__Span">Tipo de Encargado</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <select className='Beneficiario-Container-Input__Input' name="" id="">
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
                  placeholder=" "
                  type="text"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Ocupacion</span>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Input">
                <input
                  placeholder=" "
                  type="date"
                  className="Beneficiario-Container-Input__Input" />
                <span className="Beneficiario-Container-Input__Span">Fecha de Nacimiento</span>
              </div>
            </div>

            <div className='Container-Beneficiario__Grid-button'>
              <button className="Button Button--Guardar">
                <div className="Button__Icono">
                  <FontAwesomeIcon icon="fa-solid fa-file-export" />
                </div>
                <span className="Button__Span Iniciar">Guardar</span>
              </button>
            </div>

          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Motivo de la Consulta</span>
            </div>
          </div>

        </div>

        <div className='Container-Beneficiario Historial-Clinico'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Historial Clinico</h1>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Enfermedades que padece:</span>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Medicamentos que ingiere:</span>
            </div>
          </div>

          <div className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Esquema Completo de Vacunas?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Vacunas" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Vacunas" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tiene Examenes Auditivos?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="ExamenAuditivo" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="ExamenAuditivo" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tiene Pruebas Oftamologicas?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="PruebaOftamologicas" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="PruebaOftamologicas" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Usa Aparatos Auditivos?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="AparatoAuditivo" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="AparatoAuditivo" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Ha tenido Cirugias?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Cirugias" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Cirugias" />NO
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Otros:</span>
            </div>
          </div>

        </div>

        <div className='Container-Beneficiario Antecedentes-Pre-Natales'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Antecedentes Pre-Natales</h1>
          </div>

          <div className="Container-Beneficiario__item RadioButton">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Fue un embarazo de termino?</label>
              <div className='Beneficiario-Container-Radio__Radio'>
                <div className='InputRadio'>
                  <input className="" type="radio" name="EmbarazoTermino" />SI
                </div>
                <div className='InputRadio'>
                  <input className="" type="radio" name="EmbarazoTermino" />NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Explique:</span>
            </div>
          </div>

          <div className="Container-Beneficiario__item RadioButton">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Fue un embarazo normal?</label>
              <div className='Beneficiario-Container-Radio__Radio'>
                <div className='InputRadio'>
                  <input className="" type="radio" name="EmbarazoNormal" />SI
                </div>
                <div className='InputRadio'>
                  <input className="" type="radio" name="EmbarazoNormal" />NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Explique:</span>
            </div>
          </div>

          <div className="Container-Beneficiario__item RadioButton">
            <div className="Beneficiario-Container-Radio">
              <label htmlFor="">¿Tuvo complicaciones durante el embarazo?</label>
              <div className='Beneficiario-Container-Radio__Radio'>
                <div className='InputRadio'>
                  <input className="" type="radio" name="ComplicacionEmbarazo" />SI
                </div>
                <div className='InputRadio'>
                  <input className="" type="radio" name="ComplicacionEmbarazo" />NO
                </div>
              </div>
            </div>
          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Explique:</span>
            </div>
          </div>

        </div>

        <div className='Container-Beneficiario Antecedentes-Peri-Natales'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Antecedentes Peri-Natales</h1>
          </div>

          <div className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿El niño lloro inmediatamente?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="cry" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="cry" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Su coloracion fue normal?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="ColoracionNormal" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="ColoracionNormal" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Estuvo en incubadora?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Incubadora" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Incubadora" />NO
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">¿Nacio amarillo o morado?:</span>
            </div>
          </div>

        </div>

        <div className='Container-Beneficiario Antecedentes-Post-Natales'>

          <div className='Container-Beneficiario__item Titulo'>
            <h1>Antecedentes Post-Natales</h1>
          </div>

          <div className='Container-Beneficiario__Grid'>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tuvo tratamiento despues del parto?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="TratamientoParto" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="TratamientoParto" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tuvo infecciones?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Infecciones" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Infecciones" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tuvo Fiebre?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Fiebre" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Fiebre" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tuvo convulciones?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Convulcion" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Convulcion" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Tiene lenguaje?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Lenguaje" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Lenguaje" />NO
                  </div>
                </div>
              </div>
            </div>

            <div className="Container-Beneficiario__Grid-item">
              <div className="Beneficiario-Container-Radio">
                <label htmlFor="">¿Camina?</label>
                <div className='Beneficiario-Container-Radio__Radio'>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Camina" />SI
                  </div>
                  <div className='InputRadio'>
                    <input className="" type="radio" name="Camina" />NO
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="Container-Beneficiario__item TextArea">
            <div className="Beneficiario-Container-Input">
              <textarea className='Beneficiario-Container-Input__Input' placeholder=" "></textarea>
              <span className="Beneficiario-Container-Input__Span">Observaciones</span>
            </div>
          </div>

        </div>

        {/* <div className='Container-Beneficiario__Button'>

          <button className="Button Button--Guardar">
            <div className="Button__Icono">
              <FontAwesomeIcon icon="fa-solid fa-file-export" />
            </div>
            <span className="Button__Span Iniciar">Guardar</span>
          </button>

          <button className="Button Button--Eliminar">
            <div className="Button__Icono">
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </div>
            <span className="Button__Span Iniciar">Eliminar</span>
          </button>

          <button className="Button Button--Actualizar">
            <div className="Button__Icono">
              <FontAwesomeIcon icon="fa-solid fa-arrows-rotate" />
            </div>
            <span className="Button__Span Iniciar">Actualizar</span>
          </button>

          <button className="Button Button--Buscar">
            <div className="Button__Icono">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </div>
            <span className="Button__Span Iniciar">Buscar</span>
          </button>
        </div> */}

      </div>
    </>
  );
}

export default FormBeneficiario