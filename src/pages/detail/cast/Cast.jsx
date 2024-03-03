import React from "react";
import { useSelector } from "react-redux";

import "./cast.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImg/Img";
import CastImgFallback from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  return (
    <div className="castSection">
      <ContentWrapper>
        {data?.length > 0 && <div className="sectionHeading">Top Cast</div>}
        {!loading ? (
          <div className="listItems">
            {data?.map((castObj, index) => {
              let imgUrl = castObj.profile_path
                ? url.profile + castObj.profile_path
                : CastImgFallback;
              return (
                <div key={index} className="listItem">
                  <div className="profileImg">
                    <Img src={imgUrl} />
                  </div>
                  <div className="name">{castObj.name}</div>
                  <div className="character">{castObj.character}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
