
import { Route, Routes } from 'react-router';

import './App.css';
import AuthForm from './Component/AuthForm';

import Layout from './Component/Layout';
import WelComePage from './Component/WelComePage';
import UpdateProfile from './Component/UpdateProfile';

// AIzaSyCpDrn_T5nS2xI1qSHkdkYoigcnx1topC4 

function App() {

 
  return (
    <Layout>
   
<Routes>
    <Route path='/' element={<AuthForm/>}></Route>
  <Route path='/welcome' element={<WelComePage/>}></Route>
  <Route path='/update' element={<UpdateProfile/>}></Route>
</Routes>
    {/* <div className="App">
    <AuthForm></AuthForm>
    </div> */}
   
    </Layout>
  );
}

export default App;
