import React from "react";
import "./home.scss";
import HeroBanner from "./heroBanner/HeroBanner";

export default function Home() {
  return (
    <div className="homePage">
      <HeroBanner />
      <div style={{ height: 700, color: "white" }}>sample div</div>
    </div>
  );
}
