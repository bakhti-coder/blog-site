import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePage,
  getPosts,
  searchPosts,
} from "../../../redux/actions/posts";
import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Image,
  Input,
  Pagination,
  Row,
} from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

import { getImage } from "../../../utils/GetImage";
import Loading from "../../../components/shared/Loading";

import getUserImage from "../../../utils/Image";
import { LIMIT } from "../../../constants";

import "./AdminPosts.scss";

const PostsPage = () => {
  const dispatch = useDispatch();

  const { total, posts, loading, activePage, search } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    total === 0 && dispatch(getPosts());
  }, [dispatch, total]);

  return (
    <Fragment>
      <Flex
        justify="space-between"
        style={{ marginBottom: "30px" }}
        gap={36}
        align="center"
      >
        <h1>Posts ({total})</h1>
        <Input
          value={search}
          onChange={(e) => dispatch(searchPosts(e.target.value))}
          style={{ width: "auto", flexGrow: 1 }}
          placeholder="Searching..."
        />
        <Button type="dashed">Add Post</Button>
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
                  <EditOutlined key="edit" />,
                  <DeleteFilled key="delete" />,
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
          style={{ marginTop: 30 }}
          total={total}
          pageSize={LIMIT}
          current={activePage}
          onChange={(page) => dispatch(changePage(page))}
        />
      ) : null}
    </Fragment>
  );
};

export default PostsPage;
