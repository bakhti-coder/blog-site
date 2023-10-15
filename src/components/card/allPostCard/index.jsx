import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ENDPOINTIMG } from "../../../constants";

import "./AllPostCard.scss";

const AllPostsCard = ({ _id, title, category, description, photo }) => {
  const imgFormate = photo?.name?.split(".")[1];
  const imgId = photo?._id;
  const resultImg = `${imgId}.${imgFormate}`;

  return (
    <Link to={`/all-posts/${_id}`}>
      <div className="allCtgr">
        <img
          style={{ objectFit: "cover" }}
          src={`${ENDPOINTIMG}${resultImg}`}
          alt="img"
        />
        <div className="allCtgr__right">
          <h5>{category?.name}</h5>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

AllPostsCard.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  photo: PropTypes.object,
  description: PropTypes.string,
  category: PropTypes.object,
  user: PropTypes.object,
};

export default AllPostsCard;
