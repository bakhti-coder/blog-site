import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Cookies from "js-cookie";

import { ROLE, TOKEN } from "../../../constants";
import request from "../../../server";
import { AuthContext } from "../../../context/AuthContext";

import "./Login.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLogin, setRole } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const schema = yup
    .object({
      username: yup.string().required("Please fill username!"),
      password: yup
        .string()
        .required("Please fill password!")
        .min(5, "Password min length 5")
        .max(14, "Password max length 14"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const values = data;
    try {
      setLoading(true);
      const {
        data: { role, token },
      } = await request.post("/auth/login", values);
      setRole(role);
      setIsLogin(true);
      Cookies.set(TOKEN, token);
      localStorage.setItem(ROLE, role);
      if (role === "user") {
        navigate("/my-posts");
      } else {
        navigate("/dashboard");
      }
      toast.success("Succses", { autoClose: 1000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container login__container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <div className="login__item">
            <input
              type="text"
              className="input"
              placeholder="Username"
              {...register("username")}
            />
            <p className="error-message">{errors.username?.message}</p>
          </div>
          <div className="login__item">
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password")}
            />
            <p className="error-message">{errors.password?.message}</p>
          </div>
          {loading ? (
            <button disabled type="submit" className="auth__button">
              Loading...
            </button>
          ) : (
            <button type="submit" className="auth__button">
              Login
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
