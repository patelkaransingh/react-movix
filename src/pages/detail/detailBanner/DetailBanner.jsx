import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./detailBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImg/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayIcon";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

export default function DetailBanner({ video, crew }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((genre) => genre.id);

  const director = crew?.filter((crewMember) => crewMember.job === "Director");
  const writer = crew?.filter(
    (crewMember) =>
      crewMember.job === "Screenplay" ||
      crewMember.job === "Story" ||
      crewMember.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  console.log(url);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>

              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>

                    <Genres data={_genres} />

                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {/* status */}

                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status:&nbsp;</span>
                          <div className="text">{data.status}</div>
                        </div>
                      )}

                      {/* release date */}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date:&nbsp;</span>
                          <div className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </div>
                        </div>
                      )}

                      {/* runtime */}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Run Time:&nbsp;</span>
                          <div className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* director */}
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director:&nbsp;</span>
                        <span className="text">
                          {director.map((dir, i) => (
                            <span key={i}>
                              {dir.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* writer */}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer:&nbsp;</span>
                        <span className="text">
                          {writer.map((dir, i) => (
                            <span key={i}>
                              {dir.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}

                    {/* creator */}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator:&nbsp;</span>
                        <span className="text">
                          {data?.created_by.map((dir, i) => (
                            <span key={i}>
                              {dir.name}
                              {data?.created_by.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}
