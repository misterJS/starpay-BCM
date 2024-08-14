import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { Collapse, Dropdown } from "react-bootstrap";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { MenuList } from "./utils/Menu";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from "./Logout";
import profile from "../../../assets/images/profile/pic1.jpg";

const initialState = {
  active: "",
  activeSubmenu: "",
};

const reducer = (state, action) => ({
  ...state,
  ...action,
});

const SideBar = () => {
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);
  const [hideOnScroll, setHideOnScroll] = useState(true);

  const year = new Date().getFullYear();

  useEffect(() => {
    const btn = document.querySelector(".nav-control");
    const wrapper = document.querySelector("#main-wrapper");

    const toggleMenu = () => wrapper.classList.toggle("menu-toggle");

    btn.addEventListener("click", toggleMenu);

    return () => btn.removeEventListener("click", toggleMenu);
  }, []);

  const heartBlast = useCallback(() => {
    const handleHeart = document.querySelector(".heart");
    handleHeart?.classList.toggle("heart-blast");
  }, []);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      setHideOnScroll(currPos.y > prevPos.y);
    },
    [hideOnScroll]
  );

  const handleMenuToggle = useCallback(
    (menu) => {
      setState({ active: state.active === menu ? "" : menu });
    },
    [state.active]
  );

  const handleSubmenuToggle = useCallback(
    (submenu) => {
      setState({
        activeSubmenu: state.activeSubmenu === submenu ? "" : submenu,
      });
    },
    [state.activeSubmenu]
  );

  const renderMenu = () => {
    return MenuList.map((menu, index) => {
      if (menu.classsChange === "menu-title") {
        return (
          <li className={menu.classsChange} key={index}>
            {menu.title}
          </li>
        );
      }

      const isActive = state.active === menu.title;
      const hasSubmenu = menu.content && menu.content.length > 0;

      return (
        <li className={isActive ? "mm-active" : ""} key={index}>
          {hasSubmenu ? (
            <>
              <Link
                to="#"
                className="has-arrow"
                onClick={() => handleMenuToggle(menu.title)}
              >
                {menu.iconStyle}
                <span className="nav-text">{menu.title}</span>
                {menu.update && (
                  <span className="badge badge-danger badge-xs ms-1">
                    {menu.update}
                  </span>
                )}
              </Link>
              <Collapse in={isActive}>
                <ul className="mm-show">
                  {menu.content.map((submenu, subIndex) => (
                    <li
                      key={subIndex}
                      className={
                        state.activeSubmenu === submenu.title ? "mm-active" : ""
                      }
                    >
                      <Link
                        to={submenu.to}
                        className={submenu.hasMenu ? "has-arrow" : ""}
                        onClick={() => handleSubmenuToggle(submenu.title)}
                      >
                        {submenu.title}
                      </Link>
                      {submenu.content && (
                        <Collapse in={state.activeSubmenu === submenu.title}>
                          <ul className="mm-show">
                            {submenu.content.map((subItem, subItemIndex) => (
                              <li key={subItemIndex}>
                                <Link
                                  to={subItem.to}
                                  className={
                                    window.location.pathname.includes(
                                      subItem.to
                                    )
                                      ? "mm-active"
                                      : ""
                                  }
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      )}
                    </li>
                  ))}
                </ul>
              </Collapse>
            </>
          ) : (
            <Link to={menu.to}>
              {menu.iconStyle}
              <span className="nav-text">{menu.title}</span>
            </Link>
          )}
        </li>
      );
    });
  };

  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static" &&
        hideOnScroll > 120
          ? "fixed"
          : ""
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          <Dropdown as="li" className="nav-item dropdown header-profile">
            <Dropdown.Toggle
              as="a"
              variant=""
              className="nav-link i-false c-pointer"
            >
              <img src={profile} width={20} alt="profile" />
              <div className="header-info ms-3">
                <span className="font-w600">
                  Hi,<b>User</b>
                </span>
                <small className="text-end font-w400">user@idstar.co.id</small>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu
              align="end"
              className="mt-2 dropdown-menu dropdown-menu-end"
            >
              <Link to="/app-profile" className="dropdown-item ai-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
                <span className="ms-2">Profile</span>
              </Link>
              <Link to="/email-inbox" className="dropdown-item ai-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-success"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span className="ms-2">Inbox</span>
              </Link>
              <LogoutPage />
            </Dropdown.Menu>
          </Dropdown>
          {renderMenu()}
        </ul>
        {/* <div className="copyright">
          <p>
            <strong>Dompet Payment Admin Template</strong> © {year} All Rights
            Reserved
          </p>
          <p className="fs-12">
            Made with <span className="heart" onClick={heartBlast}></span> by
            DexignLab
          </p>
        </div> */}
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
