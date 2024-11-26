import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Feed from "./components/posts/Feed.tsx";
import MyPosts from './components/user/MyPosts.tsx';
import Sketch from './components/user/sketch/Sketch';
import useCheckAuth from "./hooks/auth/useCheckAuth.ts";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import ErrorStack from "./components/error/ErrorStack.tsx";
import PostDetails from "./components/posts/PostDetails.tsx";
import LikedPosts from "./components/user/LikedPosts.tsx";

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
              <Route path="/liked" element=<LikedPosts/> />
          </Route>
      </Routes>
        <ErrorStack/>
    </BrowserRouter>
  )
}

export default App