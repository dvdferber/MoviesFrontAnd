import './App.css';
import HostComponnet from './Component/MainHost';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App" >
      <HostComponnet/>
    </div>
    </BrowserRouter>
  );
}

export default App;
