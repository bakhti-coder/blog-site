import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  controlModal,
  deletePosts,
  editPosts,
  getPosts,
  searchPosts,
  sendPosts,
  showModal,
  uploadImage,
} from "../../../redux/actions/posts";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Row,
  Upload,
} from "antd";
import {
  DeleteFilled,
  EditOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

import { getImage } from "../../../utils/GetImage";
import Loading from "../../../components/shared/Loading";

import getUserImage from "../../../utils/Image";
import { LIMIT } from "../../../constants";

import "./AdminPosts.scss";

const PostsPage = () => {
  const dispatch = useDispatch();

  const {
    posts,
    total,
    loading,
    activePage,
    search,
    isModalOpen,
    selected,
    isModalLoading,
    imageData,
    imageLoading,
  } = useSelector((state) => state.posts);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleOk = async () => {
    const values = await form.validateFields();
    values.photo = imageData._id;
    dispatch(sendPosts({ values, selected, activePage, search, form }));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

  return (
    <Fragment>
      <Flex justify="space-between" gap={36} align="center">
        <h1>Categories ({total})</h1>
        <Input
          value={search}
          onChange={(e) => dispatch(searchPosts(e.target.value))}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        <Button type="dashed" onClick={() => dispatch(showModal(form))}>
          Add post
        </Button>
      </Flex>
      <Row gutter={16}>
        {loading ? (
          <Loading />
        ) : (
          posts.map((post) => (
            <Col key={post._id} className="gutter-row" span={6}>
              <Card
                bordered={true}
                hoverable={true}
                style={{
                  width: 300,
                  marginTop: 16,
                }}
                cover={
                  <Image
                    alt="example"
                    width={300}
                    height={250}
                    src={getImage(post.photo)}
                  />
                }
                loading={loading}
                actions={[
                  <EditOutlined
                    onClick={() => dispatch(editPosts(form, post._id))}
                    key="edit"
                  />,
                  <DeleteFilled
                    onClick={() =>
                      dispatch(deletePosts({ id: post._id, search }))
                    }
                    key="delete"
                  />,
                ]}
              >
                <p className="posts-card-admin">
                  By {post.user.first_name} {post.user.last_name}
                </p>
                <Meta
                  avatar={<Avatar src={getUserImage(post.user.photo)} />}
                  title={post.title}
                  description={post.description}
                />
              </Card>
            </Col>
          ))
        )}
      </Row>
      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={activePage}
          onChange={(page) => dispatch(changePage(page, search))}
        />
      ) : null}

      <Modal
        title="Post data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add post" : "Save post"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="post"
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
          {/* <input type="file" onChange={uploadImage}/> */}
          <Form.Item
            label="Name"
            name="name"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PostsPage;
