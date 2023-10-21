import { Fragment } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

import { ENDPOINTIMG } from "../../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../../../components/shared/Loading";

import "./AllPosts.scss";

const SinglePosts = () => {
  const { id } = useParams();
  const { data: singleBlog, loading } = useFetch({
    url: `/post/${id}`,
    initialData: {},
  });

  const imgFormate = singleBlog?.photo?.name.split(".")[1];
  const imgId = singleBlog?.photo?._id;
  const resultImg = `${imgId}.${imgFormate}`;
  return (
    <section>
      <div className="container single__blog">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <LazyLoadImage
              effect="blur"
              className="single__blog__img"
              src={`${ENDPOINTIMG}${resultImg}`}
              alt={singleBlog?.title}
            />
            <div className="single__blog__data">
              <div className="single__blog__data__user">
                {singleBlog?.user?.photo ? (
                  <LazyLoadImage
                    src={`${ENDPOINTIMG}${singleBlog?.user?.photo}`}
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
    </section>
  );
};

export default SinglePosts;
