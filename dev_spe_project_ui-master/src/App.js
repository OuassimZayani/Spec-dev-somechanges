import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Orders from "./pages/orders/Orders";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
