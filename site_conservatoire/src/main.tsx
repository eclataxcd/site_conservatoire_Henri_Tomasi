import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Prices } from "./pages/Prices";
import { Registration } from './pages/Registration';
import { Extranet } from './pages/Extranet';
import { Admin } from './pages/Admin';


const router = createBrowserRouter([
  { path: "/", element: <HomePage mode={false}/>, errorElement: <div>404 Not Found</div> },
  { path: "/Conservatoire", element: <Prices />, errorElement: <div>404 Not Found</div> },
  { path: "/Evenements", element: <Registration />, errorElement: <div>404 Not Found</div> },
  { path: "/Cursus", element: <Extranet />, errorElement: <div>404 Not Found</div> },
  { path: "/Antennes", element: <Admin />, errorElement: <div>404 Not Found</div> },
  { path: "/Scolarité", element: <Admin />, errorElement: <div>404 Not Found</div> },
  { path: "/Admin", element: <Admin />, errorElement: <div>404 Not Found</div> },
  { path: "*", element: <div>404 Not Found</div> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
