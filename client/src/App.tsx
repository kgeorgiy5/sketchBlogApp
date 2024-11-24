import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Feed from "./components/feed/Feed";
import MyPosts from './components/myPosts/MyPosts';
import Sketch from './components/sketch/Sketch';
import useCheckAuth from "./hooks/auth/useCheckAuth.ts";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import ErrorStack from "./components/ErrorStack.tsx";
import PostDetails from "./components/postDetails/PostDetails.tsx";

function App() {
    useCheckAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element=<Feed/> />
          <Route path="/post/:id" element={<PostDetails/>} />
          <Route element={<ProtectedRoute/>}>
              <Route path="/my-posts" element=<MyPosts/> />
              <Route path="/sketch" element=<Sketch/> />
          </Route>
      </Routes>
        <ErrorStack/>
    </BrowserRouter>
  )
}

export default App