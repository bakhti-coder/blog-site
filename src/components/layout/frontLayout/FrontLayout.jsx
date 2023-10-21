import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../footer";

const FrontLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default FrontLayout;
