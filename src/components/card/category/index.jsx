import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";


import "./CategoryCard.scss";
import { getBlogImage } from "../../../utils/BlogImage";

const CategoryCard = ({ _id, name, description, photo }) => {
  return (
    <Link to={`/category/${_id}`}>
      <div className="category__card">
        <LazyLoadImage width={40} height={40} effect="blur" src={getBlogImage(photo)} alt={name} />
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
  photo: PropTypes.object,
};

export default CategoryCard;
