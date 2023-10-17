import PropTypes from "prop-types";

import "./CategoryCard.scss";

import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const CategoryCard = ({ _id, name, description }) => {
  return (
    <Link to={`/category/${_id}`}>
      <div className="category__card">
        <LazyLoadImage effect="blur" src="/images/svg.svg" alt={name} />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    </Link>
  );
};
CategoryCard.propTypes = {
  name: PropTypes.string,
  _id: PropTypes.string,
  description: PropTypes.string,
};

export default CategoryCard;
