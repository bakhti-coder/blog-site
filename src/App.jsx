import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import FrontLayout from "./components/layout/frontLayout/FrontLayout";
import { AuthContext } from "./context/AuthContext";

import HomePage from "./pages/public/home";
import AboutPage from "./pages/public/about";
import CategoryPage from "./pages/public/category";
import AllPostsPage from "./pages/public/allPosts";
import SinglePosts from "./pages/public/allPosts/SinglePosts";
import RegisterPage from "./pages/public/register";
import LoginPage from "./pages/public/login";
import AccountPage from "./pages/account";
import DashboardLayout from "./components/layout/adminLayout/DashboardLayout";
import DashboardPage from "./pages/admin/dashboard";
import MyPostsPage from "./pages/user/myPosts";
import NotFound from "./pages/public/notFound";
import PostsPage from "./pages/admin/posts";
import CategoriesPage from "./pages/admin/categories";
import UsersPage from "./pages/admin/users";
import SingleCategoryAdmin from "./pages/admin/categories/SingleCategoryAdmin";
import SinglePostsAdmin from "./pages/admin/posts/SinglePostsAdmin";
import SingleUsersAdmin from "./pages/admin/users/SingleUsersAdmin";

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
              isLogin && role === "user" || role === "admin" ? (
                <MyPostsPage />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
        </Route>
        {isLogin && role === "admin" ? (
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<SingleCategoryAdmin />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<SinglePostsAdmin />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<SingleUsersAdmin />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
