import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../redux/actions/category";

import "./Dashboard.scss";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { total, loading } = useSelector((state) => state.category);

  useEffect(() => {
    total === 0 && dispatch(getCategories());
  }, [dispatch, total]);
  return (
    <div>
      <h1> Categries: {loading ? `...` : total} </h1>
    </div>
  );
};

export default DashboardPage;
