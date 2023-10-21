import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { ENDPOINTIMG } from "../../../constants";

import "./BlogCard.scss";

const BlogCard = ({
  _id,
  title,
  createdAt,
  description,
  photo,
  user: { first_name, last_name },
}) => {

  const imgFormate = photo?.name.split(".")[1];
  const imgId = photo?._id;
  const resultImg = `${imgId}.${imgFormate}`;
  
  return (
    <Link to={`/all-posts/${_id}`}>
      <div className="blog__card">
        <LazyLoadImage
          src={`${ENDPOINTIMG}${resultImg}`}
          alt={title}
          effect="blur"
          height={200}
          width={310}
        />

        <p className="blog__card__date">
          By
          <span>{` ${first_name}, ${last_name}`}</span> |{" "}
          {createdAt.split("T")[0]}
        </p>

        <h1 className="blog__card__title">{title}</h1>
        <p className="blog__card__description">{description}</p>
      </div>
    </Link>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string,
  _id: PropTypes.string,
  photo: PropTypes.object,
  createdAt: PropTypes.string,
  description: PropTypes.string,
  user: PropTypes.object,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
};

export default BlogCard;
