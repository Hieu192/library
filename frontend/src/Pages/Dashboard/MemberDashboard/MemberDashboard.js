import React, { useContext, useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import "./MemberDashboard.css";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookIcon from "@material-ui/icons/Book";
import HistoryIcon from "@material-ui/icons/History";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CloseIcon from "@material-ui/icons/Close";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { IconButton } from "@material-ui/core";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "../../../service/axios";
import moment from "moment";

function MemberDashboard() {
  const [active, setActive] = useState("profile");
  const [sidebar, setSidebar] = useState(false);
  const { user } = useContext(AuthContext);
  const [memberDetails, setMemberDetails] = useState(null);

  useEffect(() => {
    const getMemberDetails = async () => {
      try {
        const response = await axios.get("/users/getuser/" + user._id);
        setMemberDetails(response.data);
      } catch (err) {
        console.log("Error in fetching the member details");
      }
    };
    getMemberDetails();
  }, [user]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
          <IconButton>
            {sidebar ? (
              <CloseIcon style={{ fontSize: 25, color: "rgb(234, 68, 74)" }} />
            ) : (
              <DoubleArrowIcon
                style={{ fontSize: 25, color: "rgb(234, 68, 74)" }}
              />
            )}
          </IconButton>
        </div>
        <div
          className={sidebar ? "dashboard-options active" : "dashboard-options"}
        >
          <div className="dashboard-logo">
            <LibraryBooksIcon style={{ fontSize: 50 }} />
            <p className="logo-name">UIT-ĐHQG</p>
          </div>
          <a
            href="#profile@member"
            className={`dashboard-option ${
              active === "profile" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("profile");
              setSidebar(false);
            }}
          >
            <AccountCircleIcon className="dashboard-option-icon" /> Profile
          </a>
          <a
            href="#activebooks@member"
            className={`dashboard-option ${
              active === "active" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("active");
              setSidebar(false);
            }}
          >
            <LocalLibraryIcon className="dashboard-option-icon" /> Đã đặt
          </a>
          <a
            href="#reservedbook@member"
            className={`dashboard-option ${
              active === "reserved" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("reserved");
              setSidebar(false);
            }}
          >
            <BookIcon className="dashboard-option-icon" /> Đặt trước
          </a>
          <a
            href="#history@member"
            className={`dashboard-option ${
              active === "history" ? "clicked" : ""
            }`}
            onClick={() => {
              setActive("history");
              setSidebar(false);
            }}
          >
            <HistoryIcon className="dashboard-option-icon" /> Lịch sử 
          </a>
          <a
            href="#profile@member"
            className={`dashboard-option ${
              active === "logout" ? "clicked" : ""
            }`}
            onClick={() => {
              logout();
              setSidebar(false);
            }}
          >
            <PowerSettingsNewIcon className="dashboard-option-icon" /> Đăng xuất{" "}
          </a>
        </div>

        <div className="dashboard-option-content">
          <div className="member-profile-content" id="profile@member">
            <div className="user-details-topbar">
              <img
                className="user-profileimage"
                src="./assets/images/Profile.png"
                alt=""
              ></img>
              <div className="user-info">
                <p className="user-name">{memberDetails?.userFullName}</p>
                <p className="user-id">
                  {memberDetails?.userType === "Student"
                    ? memberDetails?.admissionId
                    : memberDetails?.employeeId}
                </p>
                <p className="user-email">{memberDetails?.email}</p>
                <p className="user-phone">{memberDetails?.mobileNumber}</p>
              </div>
            </div>
            <div className="user-details-specific">
              <div className="specific-left">
                <div className="specific-left-top">
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Tuổi</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {memberDetails?.age}
                    </span>
                  </p>
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Giới tính</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {memberDetails?.gender}
                    </span>
                  </p>
                </div>
                <div className="specific-left-bottom">
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Ngày sinh</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {memberDetails?.dob}
                    </span>
                  </p>
                  <p className="specific-left-topic">
                    <span style={{ fontSize: "18px" }}>
                      <b>Địa chỉ</b>
                    </span>
                    <span style={{ fontSize: "16px" }}>
                      {memberDetails?.address}
                    </span>
                  </p>
                </div>
              </div>
              <div className="specific-right">
                <div className="specific-right-top">
                  <p className="specific-right-topic">
                    <b>Điểm</b>
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "15px",
                    }}
                  >
                      {memberDetails?.points}
                  </p>
                </div>
                <div className="dashboard-title-line"></div>
              
              </div>
            </div>
          </div>

          <div className="member-activebooks-content" id="activebooks@member">
            <p className="member-dashboard-heading">Đã mượn</p>
            <table className="activebooks-table">
              <tr>
                <th>Thứ tự</th>
                <th>Tên sách</th>
                <th>Từ ngày</th>
                <th>Đến ngày</th>
                <th>Tiền phạt</th>
              </tr>
              {memberDetails?.activeTransactions
                ?.filter((data) => {
                  return data.transactionType === "Issued";
                })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.fromDate}</td>
                      <td>{data.toDate}</td>
                      <td>
                        {Math.floor(
                          (Date.parse(moment(new Date()).format("MM/DD/YYYY")) -
                            Date.parse(data.toDate)) /
                            86400000
                        ) <= 0
                          ? 0
                          : Math.floor(
                              (Date.parse(
                                moment(new Date()).format("MM/DD/YYYY")
                              ) -
                                Date.parse(data.toDate)) /
                                86400000
                            ) * 10}
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>

          <div
            className="member-reservedbooks-content"
            id="reservedbooks@member"
          >
            <p className="member-dashboard-heading">Đặt trước</p>
            <table className="activebooks-table">
              <tr>
                <th>Thứ tự</th>
                <th>Tên sách</th>
                <th>Từ ngày</th>
                <th>Đến ngày</th>
              </tr>
              {memberDetails?.activeTransactions
                ?.filter((data) => {
                  return data.transactionType === "Reserved";
                })
                .map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.bookName}</td>
                      <td>{data.fromDate}</td>
                      <td>{data.toDate}</td>
                    </tr>
                  );
                })}
            </table>
          </div>
          <div className="member-history-content" id="history@member">
            <p className="member-dashboard-heading">Lịch sử</p>
            <table className="activebooks-table">
              <tr>
                <th>Thứ tự</th>
                <th>Tên sách</th>
                <th>Từ ngày</th>
                <th>Đến ngày</th>
                <th>Ngày trả</th>
              </tr>
              {memberDetails?.prevTransactions?.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.bookName}</td>
                    <td>{data.fromDate}</td>
                    <td>{data.toDate}</td>
                    <td>{data.returnDate}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberDashboard;
