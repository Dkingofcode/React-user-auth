import './App.css';
import Login from './Login';
import Register from './Register';
import  { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <div className="App">
          <h1 className='title'>Learn React</h1>
          <UserContextProvider>
          <Login />
          </UserContextProvider>
    </div>
  );
}

export default App;
