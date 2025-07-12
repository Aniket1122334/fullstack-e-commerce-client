import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Billing from "./components/pages/Billing";
import Cart from "./components/pages/Cart";
import ContactUs from "./components/pages/ContactUs";
import Home from "./components/pages/Home";
import Listening from "./components/pages/Listening";
import ProductDetail from "./components/pages/ProductDetail";
import Receipt from "./components/pages/Receipt";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Listening />} />
        <Route
          path="/category/:category/:subcategory"
          element={<Listening />}
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signIn" element={<SignIn />} />

        <Route path="/register" element={<SignUp />} />

        <Route path="/contact" element={<ContactUs />} />

        <Route path="/billing" element={<Billing />} />

        <Route path="/receipt" element={<Receipt />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
