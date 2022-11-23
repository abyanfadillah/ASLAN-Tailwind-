import { Routes, Route } from "react-router-dom";

//Page
import Landing from "./pages/Landing";
import KalkulatorLogistik from "./pages/KalkulatorLogistik";
import Data from "./pages/Logistik";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import { AuthContextProvider } from "./assets/database/AuthContext";
import ProtectedRoute from "./assets/security/ProtectedRoute";
import KebutuhanLogistik from "./pages/KebutuhanLogistik";
export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/masukakun" element={<Login />} />
          <Route path="/buatakun" element={<SignUp />} />

          <Route path="/halamanutama" element={<Landing />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kalkulatorlogistik"
            element={
              <ProtectedRoute>
                <KalkulatorLogistik />
              </ProtectedRoute>
            }
          />

          <Route
            path="/data"
            element={
              <ProtectedRoute>
                <Data />
              </ProtectedRoute>
            }
          />

          <Route
            path="/kebutuhanlogistik"
            element={
              <ProtectedRoute>
                <KebutuhanLogistik />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}
