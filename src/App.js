import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import LoginPage from "./pages/User/LoginPage";
import MainPage from './pages/User/MainPage';

function App(props) {

  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
          {/* <Route index element={<LoginPage />} /> */}
          {/* <Route path="login" element={<LoginPage />} /> */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
