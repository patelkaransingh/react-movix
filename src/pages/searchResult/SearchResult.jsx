import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

import "./searchResult.scss";

export default function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  return (
    <div className="searchResultsPage">
      {loading ? (
        <Spinner initial={true} />
      ) : (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">{`Search results for '${query}'`}</div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="noResults">
              <img src={noResults} alt="xxxxx" />
              <span className="resultNotFound">No results found!</span>
            </div>
          )}
        </ContentWrapper>
      )}
    </div>
  );
}
