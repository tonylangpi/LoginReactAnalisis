import React from 'react'
import logo from '../../assets/images/logo.png';

const Home = () => {
return (

  <div className="Container-Home">
    <div className='Menu-Left'>
      <div className='Menu-Left__User'>
        <div className='Menu-Left__User__Imagen'>
          <img src={logo} alt="logo" />
        </div>
        <label htmlFor="">Nombre</label>
        <label htmlFor="">Rol</label>
      </div>
      <div className='Menu-Left__Buttons'>
        <button className='Button'>Usuarios</button>
        <button className='Button'>Beneficiario</button>
        <button className='Button'>Reportes</button>
        <button className='Button'>Roles</button>
        <button className='Button'>Citas</button>
        <button className="Button" onClick={() => { localStorage.clear(); location.reload(); }}> Cerrar sesion </button>
      </div>
      
    </div>
    <div className='Container-Menu'>

    </div>
  </div>
);
}   
export default Home