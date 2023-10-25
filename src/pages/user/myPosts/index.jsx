import { useEffect, useState, memo } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as yup from "yup";

import useFetch from "../../../hooks/useFetch";

import PageTransitionProvider from "../../../components/page-transition";
import request from "../../../server";
import getUserImage from "../../../utils/Image";
import { toast } from "react-toastify";
import UserPostCard from "../../../components/card/userBlogCard";
import Loading from "../../../components/shared/Loading";

import "./MyPosts.scss";
import { Fragment } from "react";
import ReactPaginate from "react-paginate";

const schema = yup
  .object({
    title: yup
      .string()
      .required("Please fill title!")
      .min(5, "Title min length 5")
      .max(50, "Title max length 50"),
    description: yup
      .string()
      .required("Please fill password!")
      .min(10, "description min length 10")
      .max(1000, "description max length 1000"),
    tags: yup.string().required("Please fill Tags!"),
  })
  .required();

const MyPostsPage = () => {
  const [getCategoryName, setGetCategoryName] = useState();
  const [sendCategoryId, setSendCategoryId] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [photoLoading, SetPhotoLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [userPost, setUserPost] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [deleteBtnLoad, setDeleteBtnLoad] = useState();
  const [search, setSearch] = useState("");
  const [selectedPagination, setSelectedPagination] = useState(1);

  const handlePageClick = (e) => {
    setSelectedPagination(e.selected + 1);
  };

  const imgFormate = photo?.name.split(".")[1];
  const imgId = photo?._id;
  const resultImg = `${imgId}.${imgFormate}`;

  function openModal() {
    setSelected(null);
    reset({ title: "", description: "", tags: "" });
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFileChange = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("file", file);
    try {
      SetPhotoLoading(true);
      let { data } = await request.post("/upload", formData);
      setPhoto(data);
    } finally {
      SetPhotoLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const { title, description, tags } = data;
    const newTags = tags.split(" ");
    try {
      setPostLoading(true);
      if (selected === null) {
        await request.post("/post", {
          title: title,
          description: description,
          tags: newTags,
          category: sendCategoryId,
          photo: imgId,
        });
        closeModal();
        setPhoto(null);
        toast.success("Add succsesfly post", { autoClose: 1000 });
      } else {
        await request.put(`post/${selected}`, {
          title: title,
          description: description,
          tags: newTags,
          category: sendCategoryId,
          photo: imgId,
        });
        closeModal();
        setPhoto(null);
        toast.success("Edit succsesfly post", { autoClose: 1000 });
      }
      refetch();
    } finally {
      setPostLoading(false);
    }
  };

  const {
    data: getUserBlog,
    loading: getUserBlogLoading,
    refetch,
  } = useFetch({
    url: `/post/user?page=${selectedPagination}&limit=2&search=${search}`,
    initialData: {},
  });

  // `/post?page=${selected}&limit=6&search=${search}`,

  const total = getUserBlog?.pagination?.total;
  const limit = getUserBlog?.pagination?.limit;
  const allPage = Math.ceil(total / limit);

  useEffect(() => {
    if (setUserPost) {
      setUserPost(getUserBlog.data);
    }
  }, [getUserBlog]);

  const updatePost = async (id) => {
    openModal();
    try {
      setSelected(id);
      let { data } = await request.get(`post/${id}`);
      reset(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    setDeleteBtnLoad(id);
    try {
      setDeleteBtn(true);
      await request.delete(`post/${id}`);
      toast.success("Delete post succsessfly", { autoClose: 1000 });
      refetch();
    } finally {
      setDeleteBtn(false);
    }
  };

  return (
    <PageTransitionProvider>
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
              height: "90%",
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
            <h3>{selected === null ? "Add post" : "Edit post"}</h3>
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
            <p className="error-message">{errors.title?.message}</p>
            <input
              type="text"
              placeholder="Description"
              className="modal__input"
              {...register("description")}
            />
            <p className="error-message">{errors.description?.message}</p>
            <input
              className="modal__input"
              type="text"
              placeholder="Tags"
              {...register("tags")}
            />
            <p className="error-message">{errors.title?.message}</p>

            <select
              onChange={(e) => setSendCategoryId(e.target.value)}
              style={{ cursor: "pointer" }}
              className="modal__input"
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
            <div className="file__post" style={{ width: "100%" }}>
              <label htmlFor="fileInput" className="file-label">
                {selected === null ? "Add Photo" : "Change photo"}
              </label>
              <input
                className="file__upload"
                type="file"
                id="fileInput"
                accept=".jpg, .jpeg, .png, .gif"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {photoLoading ? (
                <LazyLoadImage
                  effect="blur"
                  className="file__img"
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                  alt="gif"
                />
              ) : photo === null ? (
                ""
              ) : (
                <LazyLoadImage
                  effect="blur"
                  className="file__img"
                  src={getUserImage(resultImg)}
                  alt="NoPhoto"
                />
              )}
            </div>
            {postLoading ? (
              <button disabled className="send__button send__disabled">
                Loading...
              </button>
            ) : (
              <button type="submit" className="send__button">
                {selected === null ? "Add posts" : "Save"}
              </button>
            )}
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
      <section>
        <div className="container">
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            placeholder="Search..."
            className="search__input"
          />
          {getUserBlogLoading ? (
            <Loading />
          ) : (
            <Fragment>
              {userPost?.length === 0 ? (
                <h1 style={{ textAlign: "center", marginBottom: "100px" }}>
                  No posts
                </h1>
              ) : (
                userPost?.map((posts) => (
                  <UserPostCard
                    key={posts?._id}
                    {...posts}
                    deletePost={deletePost}
                    updatePost={updatePost}
                    deleteBtn={deleteBtn}
                    deleteBtnLoad={deleteBtnLoad}
                  />
                ))
              )}
            </Fragment>
          )}

          <div>
            {allPage !== 1 ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                pageRangeDisplayed={2}
                renderOnZeroPageCount={null}
                pageCount={allPage}
                onPageChange={handlePageClick}
              />
            ) : null}
          </div>
        </div>
      </section>
    </PageTransitionProvider>
  );
};

const MemoMyPostsPage = memo(MyPostsPage);

export default MemoMyPostsPage;
