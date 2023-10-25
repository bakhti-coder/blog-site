import { Fragment, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  changePage,
  controlModal,
  deleteCategory,
  editCategory,
  getCategories,
  searchCategories,
  sendCategory,
  showModal,
  uploadImage,
} from "../../../redux/actions/category";

import { LIMIT } from "../../../constants";
import { getBlogImage } from "../../../utils/BlogImage";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const {
    categories,
    total,
    loading,
    activePage,
    search,
    isModalOpen,
    selected,
    isModalLoading,
    imageData,
    imageLoading,
  } = useSelector((state) => state.category);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOk = async () => {
    const values = await form.validateFields();
    values.photo = imageData._id;
    dispatch(sendCategory({ values, selected, activePage, search, form }));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (data) => <Image height={50} src={getBlogImage(data)} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data) => <p>{data.slice(0, 30)}...</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => dispatch(editCategory(form, data))}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => dispatch(deleteCategory({ id: data, search }))}
          >
            Delete
          </Button>
          <Link to={`/categories/${data}`} type="primary">
            See posts
          </Link>
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
          <Flex justify="space-between" gap={36} align="center" wrap="wrap">
            <h1>Categories ({total})</h1>
            <Input
              value={search}
              onChange={(e) => dispatch(searchCategories(e.target.value))}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button type="dashed" onClick={() => dispatch(showModal(form))}>
              Add category
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={categories}
        columns={columns}
      />
      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={activePage}
          onChange={(page) => dispatch(changePage(page, search))}
        />
      ) : null}
      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add category" : "Save category"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          name="category"
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
                  src={getBlogImage(imageData)}
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

const MemoCategoriesPage = memo(CategoriesPage);

export default MemoCategoriesPage;
