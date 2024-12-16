import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-box">
      <h2 className="about-title">Giới thiệu về thư viện </h2>
      <div className="about-data">
        <div className="about-img">
          <img
            src="assets/images/book.jpg"
            alt=""
          />
        </div>
        <div>
          <p className="about-text">
            Thư viện Đại học Quốc gia Thành phố Hồ Chí Minh (VNUHCM Library) là
            một trung tâm tài nguyên thông tin quan trọng, phục vụ nhu cầu học
            tập, nghiên cứu và phát triển của sinh viên, giảng viên, nghiên cứu
            viên và các đối tượng trong cộng đồng.
            <br /> <br /> Với mục tiêu cung cấp môi trường học thuật hiện đại,
            thư viện trang bị một kho tài liệu phong phú, bao gồm sách, tạp chí,
            báo chí, cơ sở dữ liệu điện tử và các tài liệu chuyên ngành đa dạng.
            Thư viện không chỉ là nơi lưu trữ và cung cấp tài liệu mà còn tổ
            chức nhiều hoạt động hỗ trợ nghiên cứu, học tập, cũng như cung cấp
            dịch vụ tra cứu trực tuyến thuận tiện.
            <br /> <br />
            Với không gian đọc sách thoải mái, yên tĩnh và các công nghệ hiện
            đại, thư viện Đại học Quốc gia Thành phố Hồ Chí Minh là một nơi lý
            tưởng để sinh viên và giảng viên nâng cao kiến thức, phát triển kỹ
            năng nghiên cứu và tham gia vào các hoạt động học thuật.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
