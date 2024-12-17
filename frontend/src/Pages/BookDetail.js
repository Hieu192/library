import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../service/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
function BookDetail() {
  const { id } = useParams(); // Lấy id từ URL
  console.log("id là", id);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "100px 150px",
        gap: "20px",
        backgroundColor: "#f0f0f0",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "20px 50px",
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          width: "40%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          className="book-cover"
          src={book.image[0].url}
          alt={book.title}
          style={{ width: "200px", height: "auto" }}
        />
        <Swiper
          spaceBetween={10}
          slidesPerView={4} // Số lượng ảnh mini hiển thị
          loop={false}
          watchSlidesProgress={true}
          className="thumbnail-slider"
          style={{ width: "400px", marginTop: "20px" }}
        >
          {book.image.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.url}
                alt={`Thumbnail ${index}`}
                style={{ cursor: "pointer", width: "100px", height: "auto" }}
                onClick={() => {
                  // Khi nhấp vào ảnh mini, chuyển ảnh chính tương ứng
                  // const mainSlider = document.querySelector('.main-slider');
                  // const swiper = mainSlider.swiper;
                  // swiper.slideTo(index); // Di chuyển đến ảnh chính tương ứng
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "60%",gap:"10px" }}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            fontSize: "20px",
          
          }}
        >
          <div
            style={{ fontWeight: "bold", fontSize: "24px", padding: "10px 0" }}
          >
            {book.bookName}
          </div>
          <div>
            <strong>Tác giả:</strong> {book.author}
          </div>
          <div>
            <strong>Nhà xuất bản:</strong> {book.publisher}
          </div>
          <div>
            <strong>Mô tả:</strong> {book.description}
          </div>
    
        </div>
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            fontSize: "20px",
      
          }}
        >
    <div>
            <strong>Thể loại:</strong> {book.categories[0].categoryName}
          </div>
        </div>
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
            fontSize: "20px",
      
          }}
        >
    <div>
            <strong>Số lượng có sẵn:</strong> {book.bookCountAvailable}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
