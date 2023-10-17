import { Link } from "react-router-dom";
import "./SingleBlogCrad.scss";
import PropTypes from "prop-types";

import { LazyLoadImage } from "react-lazy-load-image-component";
const AllCategoryCard = ({ _id, name, description }) => {
  return (
    <Link to={`/category/${_id}`}>
      <div className="allCtgr">
        <LazyLoadImage effect="blur" src="/images/AllCtgr.png" alt="img" />
        <div className="allCtgr__right">
          <h5>{name}</h5>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

AllCategoryCard.propTypes = {
  _id: PropTypes.string,
  photo: PropTypes.object,
  description: PropTypes.string,
  name: PropTypes.string,
};

export default AllCategoryCard;
