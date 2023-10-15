import { useNavigate } from "react-router-dom";
import "./Account.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../../constants";
import { toast } from "react-toastify";

const AccountPage = () => {
  const navigate = useNavigate();
  const { setIsLogin, setRole } = useContext(AuthContext);

  const logOut = () => {
    Cookies.remove(TOKEN);
    localStorage.removeItem(ROLE);
    setIsLogin(false);
    setRole(null);
    navigate("/");
    toast.success("Succses logOut", { autoClose: 1000 });
  };
  return (
    <section>
      <div className="container" style={{padding: '150px 0 100px 0'}}>
        <button
          onClick={logOut}
          className="auth__button"
        >
          Chiqish
        </button>
      </div>
    </section>
  );
};

export default AccountPage;
