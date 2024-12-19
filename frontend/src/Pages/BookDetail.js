import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../service/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "./BookDetail.css";

function BookDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIframe, setShowIframe] = useState(false);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

  const data = encodeURIComponent(
    JSON.stringify({ category: book?.categories[0]?.categoryName })
  ); // Dữ liệu truyền vào iframe
  const iframeSrc = `./buildingCate.html?data=${data}`;

  // Fetch data từ API
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`books/getbook/${id}`);
        setBook(response.data);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu sách!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  const toggleDescription = () => {
    setDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="main-container" style={{ position: "relative" }}>
      <div
        className="image-container"
        style={{ position: "sticky", top: "100px", height: "550px" }}
      >
        <img className="book-cover" src={book.image[0]?.url} alt={book.title} />
        <Swiper className="thumbnail-slider">
          {book.image.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.url} alt={`Thumbnail ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        style={{
          width: "60%",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="info-box">
          <div
            style={{ fontWeight: "bold", fontSize: "24px", padding: "10px 0" }}
          >
            {book.bookName}
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "50px" }}>
            <div>
              <strong>Tác giả:</strong> {book.author}
            </div>
            <div>
              <strong>Nhà xuất bản:</strong> {book.publisher}
            </div>
          </div>
        </div>
        <div className="info-box" style={{ position: "relative" }}>
          <div>
            <strong>Mô tả:</strong>{" "}
            <p
              className={`collapsible-description ${
                isDescriptionExpanded ? "expanded" : "collapsed"
              }`}
            >
              {book.description}
            </p>
            {!isDescriptionExpanded && (
              <div
                style={{
                  position: "absolute",
                  left: "0px",
                  bottom: "55px",
                  width: "100%",
                  height: "100px",
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
                }}
              ></div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <button
                onClick={toggleDescription}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              >
                {isDescriptionExpanded ? "Thu gọn " : "Xem thêm"}
              </button>
            </div>
          </div>
        </div>
        <div className="info-box">
          <div>
            <strong>Thể loại:</strong> {book?.categories[0]?.categoryName}
          </div>
        </div>
        <div className="info-box">
          <div>
            <strong>Số lượng có sẵn:</strong> {book.bookCountAvailable}
          </div>
        </div>
      </div>
      <button className="map-btn" onClick={() => setShowIframe(true)}>
        Xem vị trí sách trong thư viện
      </button>

      {showIframe && (
        <div className="iframe-overlay">
          <iframe
            src={iframeSrc}
            title="Sample Map"
            className="iframe-container"
          ></iframe>
          <button className="close-btn" onClick={() => setShowIframe(false)}>
            Đóng
          </button>
        </div>
      )}
    </div>
  );
}

export default BookDetail;
