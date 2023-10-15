import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ReactModal from "react-modal";
import * as yup from "yup";

import useFetch from "../../../hooks/useFetch";

import "./MyPosts.scss";

const MyPostsPage = () => {
  const [getCategoryName, setGetCategoryName] = useState();
  const [sendCategoryId, setSendCategoryId] = useState(null);
  console.log(sendCategoryId);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { data: dataCategory, loading } = useFetch({
    url: `/category`,
    initialData: {},
  });

  useEffect(() => {
    if (dataCategory) {
      setGetCategoryName(dataCategory.data);
    }
  }, [dataCategory]);

  const schema = yup
    .object({
      username: yup.string().required("Please fill username!"),
      password: yup
        .string()
        .required("Please fill password!")
        .min(7, "Password min length 7")
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
  console.log(errors);

  const onSubmit = async (data) => {
    const values = data;
    console.log(values);
  };

  return (
    <section>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => openModal(false)}
        ariaHideApp={false}
        style={{
          content: {
            maxWidth: "600px", // Eng katta o'lcham
            margin: "auto", // Markazga centrlash
            paddingTop: "15px",
            borderRadius: "10px",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            background: "white", // Markazga centrlash
            border: "none",
            height: "80%",
          },
        }}
        contentLabel="Example Modal"
        overlayClassName="modal-overlay"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Add post</h3>
          <button
            onClick={closeModal}
            style={{
              border: "none",
              backgroundColor: "transparent",
              fontSize: "20px",
            }}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            className="modal__input"
            {...register("title")}
          />
          <input
            type="text"
            placeholder="Description"
            className="modal__input"
            {...register("description")}
          />
          <input
            className="modal__input"
            type="text"
            placeholder="Tags"
            {...register("tags")}
          />
          <input
            className="modal__input"
            type="text"
            placeholder="Photo"
            {...register("photo")}
          />
          <select
            onChange={(e) => setSendCategoryId(e.target.value)}
            style={{ cursor: "pointer" }}
            className="modal__input"
            {...register("category")}
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              getCategoryName?.map((category) => (
                <option value={category?._id} key={category?._id}>
                  {category?.name}
                </option>
              ))
            )}
          </select>
          <button style={{ width: "100%" }} className="button__util">
            Add post
          </button>
        </form>
      </ReactModal>

      <div className="container" style={{ padding: "150px 0 100px 0" }}>
        <div className="my__post">
          <h1>My posts</h1>
          <button
            onClick={openModal}
            className="button__util"
          >{`Add post`}</button>
        </div>
      </div>
    </section>
  );
};

export default MyPostsPage;
