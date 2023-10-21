import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as yup from "yup";

import { AuthContext } from "../../context/AuthContext";
import PageTransitionProvider from "../../components/page-transition";
import getImage from "../../utils/Image";
import Loading from "../../components/shared/Loading";
import request from "../../server";

import "react-tabs/style/react-tabs.css";
import "./Account.scss";

const schema = yup
  .object({
    currentPassword: yup.string().required(),
    newPassword: yup.string().required(),
    newPasswordAgain: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
  })
  .required();

const AccountPage = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [dateUser, setDateUser] = useState(null);
  console.log(dateUser);
  const [editLoading, setEditLoading] = useState(false);
  const [passwordEditLoading, setPasswordEditLoading] = useState(false);
  const [passwordEditError, setPasswordEditError] = useState(null);
  const [photoLoading, SetPhotoLoading] = useState(false);

  const { user, loading, getUser, logOut } = useContext(AuthContext);

  useEffect(() => {
    setPhoto(user?.photo);
  }, [user]);

  const handleFileChange = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("file", file);
    try {
      SetPhotoLoading(true);
      await request.post("auth/upload/", formData);
      getUser();
    } finally {
      SetPhotoLoading(false);
    }
  };

  const editUserData = async (e) => {
    e.preventDefault();
    const values = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      username: e.target.username.value,
      info: e.target.info.value,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value,
      email: e.target.email.value,
      birthday: e.target.birthday.value,
    };

    try {
      setEditLoading(true);
      await request.put("auth/details", values);
      toast.success("Profile changed successfully :)", { autoClose: 1000 });
      getUser();
    } finally {
      setEditLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const { currentPassword, newPassword } = data;
    try {
      setPasswordEditLoading(true);
      await request.put("/auth/password", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
      getUser();
      toast.success("Password successfully updated", { autoClose: 1000 });
      data.currentPassword = "";
      data.newPassword = "";
      data.newPasswordAgain = "";
    } catch (error) {
      console.log(error);
      setPasswordEditError(error.response.data);
    } finally {
      setPasswordEditLoading(false);
    }
  };

  return (
    <PageTransitionProvider>
      <section>
        <div className="container" style={{ padding: "150px 0 100px 0" }}>
          {loading ? (
            <Loading />
          ) : (
            <Tabs className="react-tabs">
              <TabList className="react-tabs__tab-list">
                <Tab className="react-tabs__tab">Profile</Tab>
                <Tab className="react-tabs__tab">Password Change</Tab>
              </TabList>

              <TabPanel className="react-tabs__tab-panel">
                <div className="profile__settings">
                  <div className="profile__settings__file">
                    <label htmlFor="fileInput" className="file-label">
                      {photo ? "Change photo" : "Upload photo "}
                    </label>
                    <input
                      className="file__upload"
                      type="file"
                      id="fileInput"
                      accept=".jpg, .jpeg, .png, .gif"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    {photoLoading ? (
                      <LazyLoadImage
                        effect="blur"
                        className="file__img"
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                        alt="gif"
                      />
                    ) : photo ? (
                      <LazyLoadImage
                        effect="blur"
                        className="file__img"
                        src={getImage(photo)}
                        alt="user"
                      />
                    ) : (
                      <LazyLoadImage
                        effect="blur"
                        className="file__img"
                        src="/images/noUserImage.png"
                        alt="NoPhoto"
                      />
                    )}
                  </div>

                  <form
                    className="profile__settings__form"
                    onSubmit={editUserData}
                  >
                    <div>
                      <label className="profile__settings__form__title">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        defaultValue={user?.first_name}
                        className="profile__settings__form__input"
                      />
                    </div>
                    <div>
                      <label className="profile__settings__form__title">
                        Last name
                      </label>
                      <input
                        name="last_name"
                        defaultValue={user?.last_name}
                        type="text"
                        className="profile__settings__form__input"
                      />
                    </div>
                    <div>
                      <label className="profile__settings__form__title">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        defaultValue={user?.username}
                        className="profile__settings__form__input"
                      />
                    </div>
                    <div>
                      <label className="profile__settings__form__title">
                        Phone number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        defaultValue={user?.phoneNumber}
                        className="profile__settings__form__input"
                      />
                    </div>
                    <div>
                      <label className="profile__settings__form__title">
                        Birthday
                      </label>
                      <input
                        type="date"
                        name="birthday"
                        onChange={(e) => setDateUser(e.target.value)}
                        value="2007-10-21"
                        className="profile__settings__form__input"
                      />
                    </div>
                    <div>
                      <label className="profile__settings__form__title">
                        Email
                      </label>
                      <input
                        name="email"
                        defaultValue={user?.email}
                        type="email"
                        className="profile__settings__form__input"
                      />
                    </div>
                    <div>
                      <label className="profile__settings__form__title">
                        Info
                      </label>
                      <textarea
                        name="info"
                        defaultValue={user?.info}
                        type="text"
                        className="profile__settings__form__input"
                      />
                    </div>
                    <div>
                      <label className="profile__settings__form__title">
                        Address
                      </label>
                      <input
                        name="address"
                        defaultValue={user?.address}
                        type="text"
                        className="profile__settings__form__input"
                      />
                    </div>
                    <div className="send">
                      {editLoading ? (
                        <button
                          disabled
                          className="send__button send__disabled"
                        >
                          Loading...
                        </button>
                      ) : (
                        <button type="submit" className="send__button">
                          Save
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </TabPanel>
              <TabPanel className="react-tabs__tab-panel">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div style={{ marginTop: "30px" }}>
                    <label className="profile__settings__form__title">
                      Current password
                    </label>
                    <input
                      type="password"
                      className="profile__settings__form__input"
                      {...register("currentPassword")}
                    />
                    <p className="error-message">{passwordEditError}</p>
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <label className="profile__settings__form__title">
                      New password
                    </label>
                    <input
                      {...register("newPassword")}
                      type="password"
                      className="profile__settings__form__input"
                    />
                  </div>
                  <div style={{ marginTop: "30px" }}>
                    <label className="profile__settings__form__title">
                      Conifirm new password
                    </label>
                    <input
                      {...register("newPasswordAgain")}
                      type="password"
                      className="profile__settings__form__input"
                    />
                    <p className="error-message">
                      {errors.newPasswordAgain?.message}
                    </p>
                  </div>
                  <div className="send">
                    {passwordEditLoading ? (
                      <button disabled className="send__button send__disabled">
                        Loading...
                      </button>
                    ) : (
                      <button type="submit" className="send__button">
                        Save
                      </button>
                    )}
                  </div>
                </form>
              </TabPanel>
            </Tabs>
          )}

          <button
            style={{ marginTop: "40px" }}
            onClick={() => logOut(navigate)}
            className="auth__button"
          >
            Logout
          </button>
        </div>
      </section>
    </PageTransitionProvider>
  );
};

export default AccountPage;
