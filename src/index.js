import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Dashboard from "./Dashboard/dashboard";
import DashboardNew from "./Dashboard/dashboardNew";
import reportWebVitals from "./reportWebVitals";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import LogInpage from "./sign-up/login";
import SignIn from "./sign-up/Sign-in";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = "http://localhost:9500/";
// axios.defaults.baseURL =
//   "https://46b8-2409-40f4-1038-435e-a90f-7f-8273-8a43.ngrok-free.app";
root.render(
  <React.StrictMode>
    {/* <DashboardNew /> */}
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path='/' element={<LogInpage/>}></Route>
        <Route path='/signinpage' element={<SignIn/>}></Route>
        <Route path='/home' element={<DashboardNew/>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
