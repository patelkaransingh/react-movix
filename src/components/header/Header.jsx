import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { VscChromeClose } from "react-icons/vsc";
import { SlMenu } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

import "./header.scss";

export default function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMunu, setMobileMunu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(
    (params) => {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    },
    [lastScrollY]
  );

  const handleLogoClick = () => {
    setShowSearch(false);
    setMobileMunu(false);
    navigate("/");
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      window.scrollY > lastScrollY && !mobileMunu
        ? setShow("hide")
        : setShow("show");
      //even if mobile menu or search is open and we scroll
      setMobileMunu(false);
      setShowSearch(false);
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  const openSearch = () => {
    setMobileMunu(false);
    setShowSearch(true);
  };
  const openMobileMenu = () => {
    setMobileMunu(true);
    setShowSearch(false);
  };

  const seachQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    type === "movie" ? navigate("/explore/movie") : navigate("/explore/tv");
    setMobileMunu(false);
  };

  return (
    <header className={`header ${mobileMunu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="logo" onClick={handleLogoClick} />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMunu ? (
            <VscChromeClose onClick={() => setMobileMunu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={seachQueryHandler}
                placeholder="Search movie or tv shows..."
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
}
