
import { Route, Routes } from 'react-router';

import './App.css';
import AuthForm from './Component/AuthForm';

import Layout from './Component/Layout';
import WelComePage from './Component/WelComePage';


function App() {

 
  return (
    <Layout>
   
<Routes>
    <Route path='/' element={<AuthForm/>}></Route>
  <Route path='/welcome' element={<WelComePage/>}></Route>
</Routes>
    {/* <div className="App">
    <AuthForm></AuthForm>
    </div> */}
   
    </Layout>
  );
}

export default App;
