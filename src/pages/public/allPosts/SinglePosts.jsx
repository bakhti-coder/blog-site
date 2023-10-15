import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

import "./AllPosts.scss";
import { ENDPOINTIMG } from "../../../constants";

const SinglePosts = () => {
  const { id } = useParams();
  const { data: singleBlog } = useFetch({
    url: `/post/${id}`,
    initialData: {},
  });
  console.log(id);
  const imgFormate = singleBlog?.photo?.name.split(".")[1];
  const imgId = singleBlog?.photo?._id;
  const resultImg = `${imgId}.${imgFormate}`;
  return (
    <section>
      <div className="container single__blog">
        <img
          className="single__blog__img"
          src={`${ENDPOINTIMG}${resultImg}`}
          alt={singleBlog?.title}
        />
        <div className="single__blog__data">
          <div className="single__blog__data__user">
            <img src="/images/user.svg" alt="user" />
            <div className="single__blog__data__user__desc">
              <p>{`${singleBlog?.user?.first_name} ${singleBlog?.user?.last_name}`}</p>
              <span>Posted on {singleBlog?.createdAt?.split("T")[0]}</span>
            </div>
          </div>
          <h1 className="single__blog__data__title">{singleBlog?.title}</h1>
          <p className="single__blog__data__hashtag">
            Startup ({`#${singleBlog?.category?.name}`})
          </p>
          <p className="single__blog__data__description">
            {singleBlog?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SinglePosts;
