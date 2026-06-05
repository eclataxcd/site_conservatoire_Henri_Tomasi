import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import componentRegistry from "./RegisteredElements"
import { Admin } from './pages/Admin';


function AppRouter() {
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    const fetchAndBuildRoutes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pages`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const pagesData = await response.json();

        const routesConfiguration = [    
          { path: "/Admin", element: <Admin />, errorElement: <div>404 Not Found</div> }
        ];

        // 2. On pousse les routes de l'API dans ce tableau
        if (pagesData && pagesData.length !== 0) {
          const routesDynamiques = pagesData.map((page: any) => {
            const ComponentToRender = componentRegistry[page.balise];

            return {
              path: page.balise === "HomePage" ? "/" : `/${page.balise}`,
              element: <ComponentToRender mode={false} idPage={page.id_page} />,
              errorElement: <div>404 Not Found</div>
            };
          });

          // Ici le .push fonctionne parfaitement car routesConfiguration est un tableau standard !
          routesConfiguration.push(...routesDynamiques);
        }

        // 3. On ajoute la sécurité 404 à la toute fin du tableau
        routesConfiguration.push({ path: "*", element: <div>404 Not Found</div>, errorElement: <div>404 Not Found</div> });

        // 4. On transforme ENFIN le tableau en routeur React et on l'enregistre dans l'état
        setRouter(createBrowserRouter(routesConfiguration));

      } catch (error) {
        console.error('Erreur lors de la récupération des pages :', error);
      }
    };

    fetchAndBuildRoutes();
  }, []);

  // Si on enlève, fait crash le site car le router sera égale a null
  if (!router) {
    return (
      <div className="flex h-screen items-center justify-center font-sans text-gray-600 bg-gray-50">
        Chargement du site...
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

// Le point d'entrée unique de votre application React
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);