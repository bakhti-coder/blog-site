import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../../../redux/actions/category";
import { Pie } from "@ant-design/plots";

import "./Dashboard.scss";
import { getUsers } from "../../../redux/actions/users";
import { getPosts } from "../../../redux/actions/posts";
import { Flex } from "antd";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { total: categoryTotal } = useSelector((state) => state.category);
  const { total: postsTotal } = useSelector((state) => state.posts);
  const { total: userTotal } = useSelector((state) => state.users);
  console.log(categoryTotal);

  useEffect(() => {
    categoryTotal === 0 && dispatch(getCategories());
    postsTotal === 0 && dispatch(getPosts());
    userTotal === 0 && dispatch(getUsers());
  }, [dispatch, categoryTotal, postsTotal, userTotal]);

  const data = [
    {
      type: "Users",
      value: userTotal,
    },
    {
      type: "Categories",
      value: categoryTotal,
    },
    {
      type: "Posts",
      value: postsTotal,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div>
      <Flex justify="space-between" align="center">
        <h1>Categries: {categoryTotal}</h1>
        <h1>Posts: {postsTotal}</h1>
        <h1>Users: {userTotal}</h1>
      </Flex>
      <Pie {...config} />
    </div>
  );
};

export default DashboardPage;
