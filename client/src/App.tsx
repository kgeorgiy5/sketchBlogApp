import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Switch } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch path="/feed" />
      <Switch path="/my-posts" />
      <Switch path="/sketch" />
    </BrowserRouter>
  )
}

export default App
