import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "../../../hooks/useFetch";

import "./heroBanner.scss";
import Img from "../../../components/lazyLoadImg/Img";
import BackgroundFallback from "../../../assets/backup.jpg";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

export default function HeroBanner() {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;

    setBackground(
      bg.toString().includes("undefined") ? BackgroundFallback : bg
    );
  }, [data]);

  const seachQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchClickHandler = () => {
    if (query !== "") {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore Now..
          </span>
          <div className="searchInput">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={seachQueryHandler}
              placeholder="Search movie or tv shows..."
            />
            <button onClick={searchClickHandler}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
