import "./styles/css/Site.css";
import "./styles/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/css/icons-mdi/css/materialdesignicons.min.css"; // Importing material design icon files

import React from "react";
import {ToastContainer} from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateBoir from "./pages/createBOIR";
import Home from "./pages/Home";
import BOIRPreview from "./pages/BOIRPreview";
import Dashboard from  './pages/Dashboard'

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreateBoir" element={<CreateBoir />} />
        <Route path="/previewBOIR" element={<BOIRPreview />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
