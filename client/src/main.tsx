import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { createStoreHook, Provider } from "react-redux";

// const store = createStoreHook();
{/* <Provider store={store}> */ }
{/*   <App /> */ }
{/* </Provider> */ }

createRoot(document.getElementById('root')!).render(

  <App />
)
