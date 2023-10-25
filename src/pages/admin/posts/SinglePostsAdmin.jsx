import { Fragment, memo } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import useFetch from "../../../hooks/useFetch";
import { getImage } from "../../../utils/GetImage";
import Loading from "../../../components/shared/Loading";
import getUserImage from "../../../utils/Image";

const SinglePostsAdmin = () => {
  const { id } = useParams();
  const { data: singleBlog, loading } = useFetch({
    url: `/post/${id}`,
    initialData: {},
  });

  return (
    <div className="container single__blog">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <LazyLoadImage
            effect="blur"
            className="single__blog__img"
            src={getImage(singleBlog?.photo)}
            alt={singleBlog?.title}
          />
          <div className="single__blog__data">
            <div className="single__blog__data__user">
              {singleBlog?.user?.photo ? (
                <LazyLoadImage
                  src={getUserImage(singleBlog?.user?.photo)}
                  alt="user"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <img src="/images/user.svg" alt="user" />
              )}
              <div className="single__blog__data__user__desc">
                <p>{`${singleBlog?.user?.first_name} ${singleBlog?.user?.last_name}`}</p>
                <span>Posted on {singleBlog?.createdAt?.split("T")[0]}</span>
              </div>
            </div>
            <h1 className="single__blog__data__title">{singleBlog?.title}</h1>
            <p className="single__blog__data__hashtag">
              {`${
                singleBlog?.category?.name
                  ? singleBlog?.category?.name
                  : "No category"
              }`}
              ({singleBlog?.tags?.map((el) => `#${el}`)})
            </p>
            <p className="single__blog__data__description">
              {singleBlog?.description}
            </p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const MemoSinglePostsAdmin = memo(SinglePostsAdmin);

export default MemoSinglePostsAdmin;
