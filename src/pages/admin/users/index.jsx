import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  getUsers,
  searchUsers,
} from "../../../redux/actions/users";
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
import { LIMIT } from "../../../constants";
import getUserImage from "../../../utils/Image";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { total, user, loading, activePage, search } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    total === 0 && dispatch(getUsers());
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
      render: (data) => (
        <Image
          style={{ borderRadius: "50%" }}
          src={
            data
              ? getUserImage(data)
              : "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png"
          }
          height={70}
          width={70}
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (data) => <p>{data ? data : "-"}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (data) => <p>{data ? data : "-"}</p>,
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
          <Link>See more</Link>
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
            <h1>Users ({total})</h1>
            <Input
              value={search}
              onChange={(e) => dispatch(searchUsers(e.target.value))}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button onClick={showModal} type="dashed">
              Add user
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={user}
      />
      {total > LIMIT ? (
        <Pagination
          style={{ marginTop: 30 }}
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

export default UsersPage;
