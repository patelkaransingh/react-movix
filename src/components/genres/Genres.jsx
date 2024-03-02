import React from "react";
import { useSelector } from "react-redux";
import "./genres.scss";

export default function Genres({ data }) {
  const { genres } = useSelector((state) => state.home);

  return (
    <div className="genres">
      {data?.map((genreId) => {
        //if id is not present in store
        if (!genres[genreId]) return;

        //if id exists
        return (
          <div key={genreId} className="genre">
            {genres[genreId]?.name}
          </div>
        );
      })}
    </div>
  );
}
