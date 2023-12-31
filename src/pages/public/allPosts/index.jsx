import { useEffect, useState, memo } from "react";
import ReactPaginate from "react-paginate";

import AllPostsCard from "../../../components/card/allPostCard";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/shared/Loading";
import PageTransitionProvider from "../../../components/page-transition";

import "./AllPosts.scss";

const AllPostsPage = () => {
  const [selected, setSelected] = useState(1);
  const [allPost, setAllpost] = useState([]);
  const [search, setSearch] = useState("");

  const { data: dataPost, loading } = useFetch({
    url: `/post?page=${selected}&limit=6&search=${search}`,
    initialData: {},
  });

  const total = dataPost?.pagination?.total;
  const limit = dataPost?.pagination?.limit;
  const allPage = Math.ceil(total / limit);

  
  useEffect(() => {
    if (dataPost) {
      setAllpost(dataPost.data);
    }
  }, [dataPost]);
  
  const handlePageClick = (e) => {
    setSelected(e.selected + 1);
  };
  
  return (
    <PageTransitionProvider>
      <section>
        <div
          className="container all__posts"
          style={{ padding: "170px 0 100px 0" }}
        >
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            placeholder="Search..."
            className="search__input"
          />
          <h1 className="all__posts__title">All posts</h1>
          <hr style={{ margin: "40px 0", background: "#6D6E76" }} />
          {loading ? (
            <Loading />
          ) : (
            allPost?.map((post) => <AllPostsCard key={post?._id} {...post} />)
          )}
          <div>
            {allPage !== 1 ? (
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                previousLabel="Previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                pageRangeDisplayed={2}
                renderOnZeroPageCount={null}
                pageCount={allPage}
                onPageChange={handlePageClick}
              />
            ) : null}
          </div>
        </div>
      </section>
    </PageTransitionProvider>
  );
};

const MemoAllPostsPage = memo(AllPostsPage);

export default MemoAllPostsPage;
