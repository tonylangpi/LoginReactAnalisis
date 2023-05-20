// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Pagination from '../utils/pagination';
// import '../assets/scss/form.scss'
// import styles from './ListaCitas.module.scss';
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function FormArea() {
//   const [search, setSearch] = useState('');
//   const [sesiones, setSesiones] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sessionsPerPage] = useState(5);
//   const indexOfLastSession = currentPage * sessionsPerPage;
//   const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
//   const currentSessions = sesiones?.slice(indexOfFirstSession, indexOfLastSession);
//   const pagination = (pageNumber) => setCurrentPage(pageNumber);

//   const [name, setName] = React.useState({
//     nombre: ''
//   });



//   const idArea = parseInt(localStorage.getItem('idArea'));

//   const saveDataTemporaly = (e) => {
//     e.preventDefault();
//     setName({
//       ...name,
//       [e.target.name]: e.target.value,
//     });
//     ListarUsuarios();
//   };

//   const ListarUsuarios = () => {
//     axios
//       .get(`http://localhost:4000/servicios/`)
//       .then(function (response) {
//         setSesiones(response.data);
//       })
//       .catch(function (error) {
//         alert('No se ha encontrado un registro');
//       });
//   };

//   useEffect(() => {
//     ListarUsuarios();
//   }, []);


//   const eliminarArea = (idArea) => {
//     axios
//       .delete(`http://localhost:4000/servicios/deleteServicios/${idArea}`)
//       .then(function (response) {
//         const respuesta = response?.data.message;
//         alert("Eliminado Exitoso");
//         window.location.reload()
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };



//   return (
//     <div className={styles.Container}>
//       {/* search */}
//       <h1 className={styles.Titulo}>Listado de Areas</h1>
//       <div className="Beneficiario-Container-Input">
//         <input
//           required
//           name="nombre"
//           placeholder=" "
//           type="text"
//           className="Beneficiario-Container-Input__Input"
//           onKeyUp={saveDataTemporaly}
//         />
//         <span className="Beneficiario-Container-Input__Span">
//           Nombre del Area
//         </span>

//         <div className={styles.ContainerSearch}>
//           <Link to="/FormAgregarArea">
//             <button className='Button' to="/FormAgregarArea" >Agregar Areas</button>
//           </Link>
//         </div>
//       </div>

//       <table className='Table'>
//         <thead>
//           <tr>
//             <th>ID Area</th>
//             <th>Nombre del Area</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentSessions
//             .filter((item) => {
//               return (
//                 search.toLowerCase() === '' ||
//                 item.NOMBRE_USUARIO.toLowerCase().includes(search) ||
//                 item.NOMBRE_USUARIO.toLowerCase().includes(search)
//               );
//             })
//             .map((row, index) => (
//               <tr key={index}>
//                 <td>{row.ID_AREA}</td>
//                 <td>{row.NOMBRE}</td>
//                 <td>
//                   <button
//                     onClick={() => eliminarArea(row.ID_AREA)}
//                     className="Button Button--Eliminar"
//                   >
//                     <div className="Button__Icono">
//                       <FontAwesomeIcon icon="fa-solid fa-sync" />
//                     </div>
//                     <span className="Button__Span Iniciar">Eliminar</span>
//                   </button>

//                   <div className={styles.ContainerSearch}>
//                     <Link to="/FormAgregarArea">
//                       <button className='Button' to="/FormAgregarArea" >Actualizar</button>

//                     </Link>
//                   </div>

//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       <Pagination
//         beneficiaryPerPage={sessionsPerPage}
//         allbeneficiary={sesiones.length}
//         pagination={pagination}
//         currentPage={currentPage}
//       />
//     </div>
//   )
// }

// export default FormArea