import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

//with this lazy loading we will now load each of these components here as we need them. it will split our bundle into spearete chunks. This lazy functionality is powered by the Suspense API.

const HomePage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

//htis is after running npm run build (without lazy)
// dist/assets/index-da2b9fc0.css   30.11 kB │ gzip:   5.06 kB
// dist/assets/index-57a2aa00.js   525.39 kB │ gzip: 148.71 kB

//after lazy:
// dist/assets/PageNotFound-24a14184.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-c5272a1a.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-95fb8602.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-32183d77.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-c60b8b2f.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-cadb5627.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-67c42b80.js             1.02 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-0d161d1f.js       156.91 kB │ gzip:  46.12 kB
// dist/assets/index-13b76e05.js           366.86 kB │ gzip: 102.11 kB

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  //this will check whether the user is currently logged in or not
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
