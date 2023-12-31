import { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";

import useFetch from "../../../hooks/useFetch";
import BlogCard from "../../../components/card/blog/BlogCard";
import Loading from "../../../components/shared/Loading";
import CategoryCard from "../../../components/card/category";
import PageTransitionProvider from "../../../components/page-transition";
import TextAnimation from "../../../components/text-animation";

import "./Home.scss";

const HomePage = () => {
  const [categoryData, setCategoryData] = useState([]);

  ////// Get lates one /////
  const { data: lastone, loading: firsLoading } = useFetch({
    url: "/post/lastone",
    initialData: [],
  });

  ////// Get lates ones /////
  const { data: lastones, loading: secondLoading } = useFetch({
    url: "/post/lastones",
    initialData: [],
  });

  ////// Get Category /////
  const { data: categories, loading: categoeyLoading } = useFetch({
    url: "/category",
    initialData: [],
  });

  useEffect(() => {
    if (categories) {
      setCategoryData(categories.data);
    }
  }, [categories]);

  return (
    <PageTransitionProvider>
      <section>
        <div className="home">
          <Parallax
            className="paralax"
            bgImage="/images/bgimg.PNG"
            bgImageStyle={{ objectFit: "cover" }}
            strength={220}
          >
            <div className="container home__container">
              {firsLoading ? (
                <Loading />
              ) : (
                <div className="home__container__item">
                  <TextAnimation>
                    <h4>
                      Posted on <span>startup</span>
                    </h4>
                  </TextAnimation>
                  <TextAnimation>
                    <h1>{lastone.title}</h1>
                  </TextAnimation>
                  <TextAnimation>
                    <p className="home__name">
                      By
                      <span>{` ${lastone.user?.first_name}, ${lastone.user?.last_name}`}</span>{" "}
                      | {lastone?.createdAt?.split("T")[0]}
                    </p>
                  </TextAnimation>
                  <TextAnimation>
                    <p className="home__desc">{lastone?.description}</p>
                  </TextAnimation>
                  <Link
                    to={`/all-posts/${lastone._id}`}
                    className="post__single"
                  >{`Read More >`}</Link>
                </div>
              )}
            </div>
          </Parallax>
        </div>
      </section>
      <section>
        <div className="container pop__blog">
          <h1>Popular blogs</h1>
          <Swiper
            breakpoints={{
              1200: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
              300: {
                slidesPerView: 1,
              },
              200: {
                slidesPerView: 1,
              },
            }}
            modules={[Pagination, A11y]}
            spaceBetween={100}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
          >
            {secondLoading ? (
              <div className="card-loading">
                <div className="card is-loading">
                  <div className="image"></div>
                  <div className="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
                <div className="card is-loading">
                  <div className="image"></div>
                  <div className="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
                <div className="card is-loading">
                  <div className="image"></div>
                  <div className="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
                <div className="card is-loading">
                  <div className="image"></div>
                  <div className="content">
                    <h2></h2>
                    <p></p>
                  </div>
                </div>
              </div>
            ) : (
              lastones.map((post) => (
                <SwiperSlide key={post?.id}>
                  <BlogCard {...post} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
          <hr style={{ margin: "40px 0", background: "#6D6E76" }} />
        </div>
      </section>
      <section>
        <div className="container category__chose">
          <h1>Choose A Catagory</h1>
          <Swiper
            breakpoints={{
              1200: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
              300: {
                slidesPerView: 1,
              },
              200: {
                slidesPerView: 1,
              },
            }}
            modules={[Pagination, A11y]}
            spaceBetween={30}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
          >
            {categoeyLoading ? (
              <Loading />
            ) : (
              categoryData?.map((category) => (
                <SwiperSlide key={category?.id}>
                  <CategoryCard {...category} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </section>
    </PageTransitionProvider>
  );
};

const MemoHomePage = memo(HomePage);

export default MemoHomePage;
