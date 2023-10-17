import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import FrontLayout from "./components/layout";
import { AuthContext } from "./context/AuthContext";

import HomePage from "./pages/public/home";
import AboutPage from "./pages/public/about";
import CategoryPage from "./pages/public/category";
import AllPostsPage from "./pages/public/allPosts";
import SinglePosts from "./pages/public/allPosts/SinglePosts";
import RegisterPage from "./pages/public/register";
import LoginPage from "./pages/public/login";
import AccountPage from "./pages/account";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/admin/dashboard";
import MyPostsPage from "./pages/user/myPosts";
import NotFound from "./pages/public/notFound";

function App() {
  const { isLogin, role } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/all-posts" element={<AllPostsPage />} />
          <Route path="/all-posts/:id" element={<SinglePosts />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/account"
            element={isLogin ? <AccountPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/my-posts"
            element={
              isLogin && role === "user" ? (
                <MyPostsPage />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              isLogin && role === "admin" ? <DashboardPage /> : <NotFound />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
