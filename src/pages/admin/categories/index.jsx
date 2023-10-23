import {
  Button,
  Flex,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getCategories, searchCategories } from "../../../redux/actions/category";
import { getImage } from "../../../utils/GetImage";
import { LIMIT } from "../../../constants";
// import getImage from "../../../utils/getImage";

const CategoriesPage = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { total, categries, loading, activePage, search } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    total === 0 && dispatch(getCategories());
  }, [dispatch, total]);

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
      render: (data) => <Image src={getImage(data)} height={70} width={70} />,
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
      render: (text) => <p>{text.slice(0, 70)}...</p>,
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

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" gap={36} align="center">
            <h1>Categories ({total})</h1>
            <Input
              value={search}
              onChange={(e) => dispatch(searchCategories(e.target.value))}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={showModal} type="dashed">
              Add category
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={categries}
      />

      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={activePage}
          onChange={(page) => dispatch(changePage(page))}
        />
      ) : null}

      <Modal
        // confirmLoading={isBtnLoading}
        title="Add Teacher"
        // onOk={handleOk}
        // okText={selected === null ? "Add" : "Save teachers"}
        onCancel={handleCancel}
        open={isModalOpen}
      ></Modal>
    </Fragment>
  );
};

export default CategoriesPage;
