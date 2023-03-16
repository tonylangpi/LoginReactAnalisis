import Login from './Components/Login'
import Register from './Components/Register'
import {Routes, Route} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

function App() {
  library.add(fas);
  return (
       <Routes>
         <Route path='/' element={<Login/>} />
         <Route path='/registrar' element={<Register/>} />
       </Routes>
  );
}

export default App;
