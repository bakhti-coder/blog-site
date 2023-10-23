import { Button, Flex, Image, Modal, Space, Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/actions/category";
// import getImage from "../../../utils/getImage";

const CategoriesPage = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { total, categries, loading } = useSelector((state) => state.category);
  console.log(loading);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => (
        <Image
          src={data}
          // src={getImage(data)}
          height={60}
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "_id",
      render: () => (
        <Space size="middle">
          <Button type="primary">Update</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // const data = [];

  return (
    <div>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" align="center">
            <h1>Teachers ({total})</h1>
            <Button type="primary" onClick={showModal}>
              Add teachers
            </Button>
          </Flex>
        )}
        loading={loading}
        columns={columns}
        dataSource={categries}
      />

      <Modal
        // confirmLoading={isBtnLoading}
        title="Add Teacher"
        // onOk={handleOk}
        // okText={selected === null ? "Add" : "Save teachers"}
        onCancel={handleCancel}
        open={isModalOpen}
      ></Modal>
    </div>
  );
};

export default CategoriesPage;
