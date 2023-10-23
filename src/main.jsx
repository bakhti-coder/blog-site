import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import StoreProvider from "./redux/store/index.jsx";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "aos/dist/aos.css";
import "react-tabs/style/react-tabs.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <ToastContainer />
    <StoreProvider>
      <App />
    </StoreProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
