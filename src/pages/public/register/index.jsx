import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Cookies from "js-cookie";

import { AuthContext } from "../../../context/AuthContext";
import { ROLE, TOKEN } from "../../../constants";
import request from "../../../server";

import "./Register.scss";

const schema = yup
  .object({
    first_name: yup.string().required("Please fill first name!"),
    last_name: yup.string().required("Please fill last name!"),
    username: yup.string().required("Please fill username!"),
    password: yup
      .string()
      .required("Please fill password!")
      .min(7, "Password min length 7")
      .max(14, "Password max length 14"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();
const RegisterPage = () => {
  const navigate = useNavigate();
  const { setIsLogin, setRole } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { first_name, last_name, password, username } = data;
    try {
      setLoading(true);
      const {
        data: { role, token },
      } = await request.post("/auth/register", {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
      });
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
      <div className="container register__container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>
          <div className="login__item">
            <input
              type="text"
              className="input"
              placeholder="Firstname"
              {...register("first_name")}
            />
            <p className="error-message">{errors.first_name?.message}</p>
          </div>
          <div className="login__item">
            <input
              type="text"
              className="input"
              placeholder="LastName"
              {...register("last_name")}
            />
            <p className="error-message">{errors.last_name?.message}</p>
          </div>
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
          <div className="login__item">
            <input
              type="password"
              className="input"
              placeholder="Confirm password"
              {...register("confirm_password")}
            />
            <p className="error-message">{errors.confirm_password?.message}</p>
          </div>
          {loading ? (
            <button disabled type="submit" className="auth__button">
              Loading...
            </button>
          ) : (
            <button type="submit" className="auth__button">
              Register
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
