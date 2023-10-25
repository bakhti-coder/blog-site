import { memo } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Loading from "../../../components/shared/Loading";
import useFetch from "../../../hooks/useFetch";

import "./style.scss";
import { getBlogImage } from "../../../utils/BlogImage";

const SingleCategoryAdmin = () => {
  const { id } = useParams();

  const { data: singleCatewgory, loading } = useFetch({
    url: `/category/${id}`,
    initialData: {},
  });

  return (
    <section>
      <div className="conatiner single__category">
        {loading ? (
          <Loading />
        ) : (
          <div className="single__category__item">
            <div className="single__categgory__admin">
              <LazyLoadImage
                effect="blur"
                src={getBlogImage(singleCatewgory?.photo)}
              />
            </div>
            <h1>{singleCatewgory?.name}</h1>
            <p>{singleCatewgory?.description}</p>
            <span>{`Blog > ${singleCatewgory?.name}`}</span>
          </div>
        )}
      </div>
    </section>
  );
};

const MemoSingleCategoryAdmin = memo(SingleCategoryAdmin);

export default MemoSingleCategoryAdmin;
