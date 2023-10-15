import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

import useFetch from "../../../hooks/useFetch";
import AllCategoryCard from "../../../components/card/singleBlog";
import Loading from "../../../components/shared/Loading";

import "./Category.scss";

const CategoryPage = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(1);
  const [allCategory, setallCategory] = useState([]);
  console.log(allCategory);

  const { id } = useParams();
  const { data: singleCtg } = useFetch({
    url: `/category/${id}`,
    initialData: {},
  });

  const { data: dataCategory, loading } = useFetch({
    url: `/category?page=${selected}&limit=4`,
    initialData: {},
  });
  const total = dataCategory?.pagination?.total;
  const limit = dataCategory?.pagination?.limit;
  const allPage = Math.ceil(total / limit);

  const handlePageClick = (e) => {
    setSelected(e.selected + 1);
  };

  useEffect(() => {
    if (dataCategory) {
      setallCategory(dataCategory.data);
    }
  }, [dataCategory]);

  return (
    <Fragment>
      <section>
        <div className="conatiner single__category">
          <div className="single__category__item">
            <h1>{singleCtg?.name}</h1>
            <p>{singleCtg?.description}</p>
            <span>{`Blog > ${singleCtg?.name}`}</span>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="search__input"
            placeholder="Search..."
          />
          {loading ? (
            <Loading />
          ) : (
            allCategory
              ?.filter((category) => {
                return search.toLowerCase() === ""
                  ? category
                  : category?.name?.toLowerCase().includes(search);
              })
              .map((category) => (
                <AllCategoryCard key={category?._id} {...category} />
              ))
          )}
          {allPage !== 1 ? (
            <div>
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
                pageRangeDisplayed={3}
                renderOnZeroPageCount={null}
                pageCount={allPage}
                onPageChange={handlePageClick}
              />
            </div>
          ) : null}
        </div>
        <div></div>
        {/* {pagination} */}
      </section>
    </Fragment>
  );
};

export default CategoryPage;
