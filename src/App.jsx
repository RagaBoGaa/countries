import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";

// Loaders
import { loader as homePageLoader } from "./pages/HomePage";
import CountryDetails, {
  loader as countryLoader,
} from "./pages/CountryDetails";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <HomePage />, loader: homePageLoader },
        {
          path: "/country/:name",
          element: <CountryDetails />,
          loader: countryLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
