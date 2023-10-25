import { useEffect, memo, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pie } from "@ant-design/plots";
import { Flex } from "antd";
import Chart from "chart.js/auto";

import { getCategories } from "../../../redux/actions/category";
import { getUsers } from "../../../redux/actions/users";
import { getPosts } from "../../../redux/actions/posts";

import "./Dashboard.scss";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { total: categoryTotal } = useSelector((state) => state.category);
  const { total: postsTotal } = useSelector((state) => state.posts);
  const { total: userTotal } = useSelector((state) => state.users);

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

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const xValues = useMemo(() => ["Categories", "Posts", "Users"], []);
  const yValues = useMemo(
    () => [categoryTotal, postsTotal, userTotal],
    [categoryTotal, postsTotal, userTotal]
  );

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [
          {
            backgroundColor: [
              "rgba(0,0,255,1.0)",
              "rgba(0,255,0,1.0)",
              "rgba(255,0,0,1.0)",
            ],
            borderColor: "rgba(0,0,0,0.1)",
            data: yValues,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }, [xValues, yValues]);

  return (
    <div>
      <Flex justify="space-between" align="center" wrap="wrap">
        <h1>Categries: {categoryTotal}</h1>
        <h1>Posts: {postsTotal}</h1>
        <h1>Users: {userTotal}</h1>
      </Flex>

      <div style={{ width: "100%" }}>
        <canvas style={{ width: "100%" }} id="myChart" ref={chartRef}></canvas>
      </div>

      <Pie {...config} />
    </div>
  );
};

const MemoDashboardPage = memo(DashboardPage);

export default MemoDashboardPage;
