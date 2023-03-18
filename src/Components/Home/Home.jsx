import React from 'react'
const Home = () => {
 

return (

  <div className="Container">
  
        <button
          className="button_login"
          onClick={() => {
            localStorage.clear();
            location.reload();
            
          }}
        >
          Cerrar sesion
        </button>
  </div>
);
}   
export default Home