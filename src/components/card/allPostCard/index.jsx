import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { ENDPOINTIMG } from "../../../constants";

import "./AllPostCard.scss";

const AllPostsCard = ({ _id, title, category, description, photo }) => {
  
  const imgFormate = photo?.name?.split(".")[1];
  const imgId = photo?._id;
  const resultImg = `${imgId}.${imgFormate}`;

  return (
    <Link to={`/all-posts/${_id}`}>
      <div className="allCtgr">
        {resultImg ? (
          <LazyLoadImage
            style={{ objectFit: "cover" }}
            effect="blur"
            src={`${ENDPOINTIMG}${resultImg}`}
            alt="img"
          />
        ) : (
          <LazyLoadImage
            style={{ objectFit: "cover" }}
            effect="blur"
            src={`${ENDPOINTIMG}${resultImg}`}
            alt="img"
          />
        )}

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
