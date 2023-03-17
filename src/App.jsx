import Login from "./Components/Login";
import React, { useEffect } from "react";
import Register from './Components/Register';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home from "./Components/Home";

function App() {
  library.add(fas);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const validateAuth = async () => {
     
    await axios('https://analisisapi.netlify.app/verificar', {headers: {
        'x-access-token': localStorage.getItem('Auth')
    }} )
    .then(({data}) => {
      if(!data.auth){
        setIsLoggedIn(data.auth);
      }else{
        setIsLoggedIn(data.auth); 
      }
    })
    .catch((error) => console.log(error));


  }

  useEffect(() => {
    validateAuth(); 
  }, []);

  return (
    <>
    {isLoggedIn ? 
     <>
      <Routes>
          <Route path='/' element={<Home/>}/>
       </Routes>
     </> : <>
       <Routes>
          <Route path='/registrar' element={<Register/>} />
          <Route path='/' element={<Login/>} />
       </Routes>
     </>
    }
       
    </>
  );
}

export default App;
