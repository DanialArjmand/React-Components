import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginForm";
import RegisterPage from "./pages/RegistrationForm";
import ProductsList from "./pages/ProductsList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProductsList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
