import { Fragment, useEffect , memo} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  controlModal,
  deleteUsers,
  editUsers,
  getUsers,
  searchUsers,
  sendUsers,
  showModal,
  uploadImage,
} from "../../../redux/actions/users";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
} from "antd";
import { LIMIT } from "../../../constants";
import getUserImage from "../../../utils/Image";
import { Link } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getImage } from "../../../utils/GetImage";

const UsersPage = () => {
  const dispatch = useDispatch();

  const {
    users,
    total,
    loading,
    activePage,
    search,
    isModalOpen,
    selected,
    isModalLoading,
    imageData,
    imageLoading,
  } = useSelector((state) => state.users);
  const [form] = Form.useForm();

  useEffect(() => {
    total === 0 && dispatch(getUsers());
  }, [dispatch, total]);

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
      render: (data) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => dispatch(editUsers(form, data))}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => dispatch(deleteUsers({ id: data, search }))}
          >
            Delete
          </Button>
          <Link to={`/users/${data}`} type="primary">
            See posts
          </Link>
        </Space>
      ),
    },
  ];

  const handleOk = async () => {
    const values = await form.validateFields();
    values.photo = imageData._id;
    dispatch(sendUsers({ values, selected, activePage, search, form }));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

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
            <Button type="dashed" onClick={() => dispatch(showModal(form))}>
              Add user
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={users}
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
        title="ser data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add user" : "Save user"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="User"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={(e) => dispatch(uploadImage(e.file.originFileObj))}
          >
            <div>
              {imageLoading ? (
                <LoadingOutlined />
              ) : imageData ? (
                <img
                  src={getImage(imageData)}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              )}
            </div>
          </Upload>

          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

const MemoUsersPage = memo(UsersPage);


export default MemoUsersPage;
