import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Fragment>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default DashboardLayout;
