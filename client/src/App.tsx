import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Feed from "./components/feed/Feed";
import MyPosts from './components/myPosts/MyPosts';
import Sketch from './components/sketch/Sketch';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element=<Feed /> />
        <Route path="/my-posts" element=<MyPosts /> />
        <Route path="/sketch" element=<Sketch /> />
      </Routes>
    </BrowserRouter>
  )
}

export default App
