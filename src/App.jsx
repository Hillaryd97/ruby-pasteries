import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Store from "./pages/Store";
import ProductDetails from "./pages/product/ProductDetails";
import { StateContext } from "../context/StateContext";
import CheckoutPage from "./pages/CheckoutPage";
import Dashboard from "./admin_pages/Dashboard";
import About from "./pages/About";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/account" element={<Account />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/store" element={<Store />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/adminDashboardk9PqX*3zYtW&7" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
    </Route>
  )
);

function App() {
  // const [token, setToken] = useState(false)
  // if(token){
  //     sessionStorage.setItem('token', JSON.stringify(token))
  // }

  // useEffect(() => {
  //   if(sessionStorage.getItem('token')){
  //     let data = JSON.parse(sessionStorage.getItem('token'))
  //     setToken(data)
  //   }
  // }, [])

  return (
    <StateContext>
      <RouterProvider router={router} />
    </StateContext>
  );
}
export default App;
