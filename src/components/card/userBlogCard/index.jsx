import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./UserBlogCard.scss";
import { ENDPOINTIMG } from "../../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
const UserPostCard = ({
  _id,
  title,
  category,
  description,
  deletePost,
  updatePost,
  photo,
  deleteBtn,
  deleteBtnLoad,
}) => {
  const imgFormate = photo?.name?.split(".")[1];
  const imgId = photo?._id;
  const resultImg = `${imgId}.${imgFormate}`;
  return (
    <div className="allCtgr">
      <Link to={`/all-posts/${_id}`}>
        <LazyLoadImage
          effect="blur"
          style={{ objectFit: "cover" }}
          src={`${ENDPOINTIMG}${resultImg}`}
          alt="img"
        />
      </Link>

      <div className="allCtgr__right">
        <h5>{category?.name}</h5>
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          <button
            onClick={() => updatePost(_id, category?._id, imgId)}
            className="update__btn"
          >
            Update
          </button>
          {deleteBtn && _id === deleteBtnLoad ? (
            <button
              disabled
              style={{ cursor: "not-allowed" }}
              onClick={() => deletePost(_id)}
              className="delete__btn"
            >
              Loading...
            </button>
          ) : (
            <button onClick={() => deletePost(_id)} className="delete__btn">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

UserPostCard.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  photo: PropTypes.object,
  description: PropTypes.string,
  category: PropTypes.object,
  user: PropTypes.object,
  deletePost: PropTypes.func,
  deleteBtn: PropTypes.bool,
  deleteBtnLoad: PropTypes.number,
  updatePost: PropTypes.func,
};

export default UserPostCard;
