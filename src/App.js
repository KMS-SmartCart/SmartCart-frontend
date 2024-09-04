import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import LoginPage from "./pages/User/LoginPage";

function App(props) {

  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
