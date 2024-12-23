import { React, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Avatar from "react-avatar";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { AuthContext } from "../Context/AuthContext.js";
import { useDispatch } from "react-redux";
import { updateSearchBooks } from "../redux/slices/app.js";
import { useHistory  } from "react-router-dom";
function Header() {
  const { user } = useContext(AuthContext);
  const [menutoggle, setMenutoggle] = useState(false);
  const [value, setValue] = useState("");
  const history = useHistory ();
  useEffect(() => {
    dispatch(updateSearchBooks(value));
  }, [value]);
  const dispatch = useDispatch();
  const Toggle = () => {
    setMenutoggle(!menutoggle);
  };

  const closeMenu = () => {
    setMenutoggle(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Điều hướng đến trang tìm kiếm
      history.push(`/books`);
    }
  };

  return (
    <div className="header">
      <div className="logo-nav">
        <Link to="/">
          <a href="#home">UIT-ĐHQG</a>
        </Link>
      </div>
      <div className="nav-right">
        <input
          className="search-input"
          type="text"
          placeholder="Tìm sách "
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <ul className={menutoggle ? "nav-options active" : "nav-options"}>
          <li
            className="option"
            onClick={() => {
              closeMenu();
            }}
          >
            <Link to="/">
              <a href="#home">Trang chủ </a>
            </Link>
          </li>
          <li
            className="option"
            onClick={() => {
              closeMenu();
            }}
          >
            <Link to="/books">
              <a href="#books">Sách</a>
            </Link>
          </li>
          <li
            className="option"
            onClick={() => {
              closeMenu();
            }}
          >
            <Link to="/model">
              <a href="#models">Mô hình</a>
            </Link>
          </li>
          <li
            className="option"
            onClick={() => {
              closeMenu();
            }}
          >
            {user ? (
              user.isAdmin ? (
                <Link to="/dashboard@admin">
                  <Avatar name="Admin" round={true} size={30} />
                </Link>
              ) : (
                <Link to="/dashboard@member">
                  {" "}
                  <Avatar name="User" round={true} size={30} />
                </Link>
              )
            ) : (
              <Link to="/signin">
                <a href="signin">Đăng nhập </a>
              </Link>
            )}
          </li>
        </ul>
      </div>

      <div
        className="mobile-menu"
        onClick={() => {
          Toggle();
        }}
      >
        {menutoggle ? (
          <ClearIcon className="menu-icon" style={{ fontSize: 40 }} />
        ) : (
          <MenuIcon className="menu-icon" style={{ fontSize: 40 }} />
        )}
      </div>
    </div>
  );
}

export default Header;
