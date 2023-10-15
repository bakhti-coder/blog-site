import { Link } from "react-router-dom";
import "./SingleBlogCrad.scss";
const AllCategoryCard = ({ _id, name, description, photo, createdAt }) => {
  return (
    <Link to={`/category/${_id}`}>
      <div className="allCtgr">
        <img src="/images/AllCtgr.png" alt="img" />
        <div className="allCtgr__right">
          <h5>Business</h5>
          <h2>Top 6 free website mockup tools 2022</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
            blandit massa enim nec.
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AllCategoryCard;
