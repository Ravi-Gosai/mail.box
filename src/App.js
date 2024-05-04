
import './App.css';
import AuthForm from './Component/AuthForm';
import { AuthContextProvider } from './auth-context';

function App() {
  return (
    <AuthContextProvider>

    <div className="App">
    <AuthForm></AuthForm>
    </div>
    </AuthContextProvider>
  );
}

export default App;
