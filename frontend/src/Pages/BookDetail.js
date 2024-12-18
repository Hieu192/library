import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../service/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "./BookDetail.css";
function BookDetail() {
  const { id } = useParams(); // Lấy id từ URL
  console.log("id là", id);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIframe, setShowIframe] = useState(false);

  const data = encodeURIComponent(JSON.stringify({ category: book?.categories[0]?.categoryName})); // Dữ liệu truyền vào iframe
  const iframeSrc = `./buildingCate.html?data=${data}`;

  // Fetch data từ API
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`books/getbook/${id}`);
        console.log(response.data);
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

  return (
<div className="main-container">
  <div className="image-container">
    <img className="book-cover" src={book.image[0]?.url} alt={book.title} />
    <Swiper className="thumbnail-slider">
      {book.image.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image.url} alt={`Thumbnail ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  <div style={{ width: "60%", gap: "10px", display: "flex", flexDirection: "column" }}>
    <div className="info-box">
      <div style={{ fontWeight: "bold", fontSize: "24px", padding: "10px 0" }}>
        {book.bookName}
      </div>
      <div><strong>Tác giả:</strong> {book.author}</div>
      <div><strong>Nhà xuất bản:</strong> {book.publisher}</div>
      <div><strong>Mô tả:</strong> {book.description}</div>
    </div>
    <div className="info-box">
      <div><strong>Thể loại:</strong> {book?.categories[0]?.categoryName}</div>
    </div>
    <div className="info-box">
      <div><strong>Số lượng có sẵn:</strong> {book.bookCountAvailable}</div>
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
  )
};

export default BookDetail;
