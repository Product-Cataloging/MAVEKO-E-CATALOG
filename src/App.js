import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./layouts/Dashboard";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <div className="home">
      {localStorage.getItem("role") === "Customer" && (
        <div>Put components for customer side here</div>
      )}

      {(localStorage.getItem("role") === "Administrator" ||
        localStorage.getItem("role") === "Operator") && (
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />}></Route>
          <Route path="/admin/*" element={<Admin />}></Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      )}

      {/* {!localStorage.getItem("role") && (
        <Routes>
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      )} */}
    </div>
  );
}

export default App;
