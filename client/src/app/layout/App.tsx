import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";

import Header from "./Header";
import LoadingComponent from "../../app/layout/LoadingComponent";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import BasketPage from "../../features/basket/BasketPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/inventory";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? "#121212" : "#eaeaea"
      }
    }
  });

  const handleThemeChange = () => setDarkMode(!darkMode);

  if (loading) return <LoadingComponent message="Initialising app..." />

  return (
      <ThemeProvider theme={theme}>
        <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<Container><Catalog /></Container>} />
            <Route path="/catalog/:id" element={<Container><ProductDetails /></Container>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/basket" element={<Container><BasketPage /></Container>} />
            <Route path="/checkout" element={<Container><PrivateRoute><CheckoutWrapper /></PrivateRoute></Container>} />
            <Route path="/orders" element={<Container><PrivateRoute><Orders/></PrivateRoute></Container>} />
            <Route path="/inventory" element={<Container><PrivateRoute><Inventory/></PrivateRoute></Container>} />
            <Route path="/login" element={<Container><Login /></Container>} />
            <Route path="/register" element={<Container><Register /></Container>} />
          </Routes>
      </ThemeProvider>
  );
}

export default App;
