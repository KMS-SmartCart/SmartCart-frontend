import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import LoginPage from "./pages/User/LoginPage";
import ItemInfoPage from "./pages/Etc/ItemInfoPage"
import BottomNav from "./Component/Navigation/BottomNav";
import CameraPage from "./pages/Etc/CameraPage";
import CartPage from "./pages/Etc/CartPage.jsx";
import MyPage from "./pages/User/MyPage.jsx"
import LowestItemPage from "./pages/Etc/LowestItemPage.jsx";
import MainPage from './pages/User/MainPage';

function App(props) {

  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/iteminfo" element={<ItemInfoPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/Lowest" element={<LowestItemPage />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
