import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'

function AddBook() {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const [bookName, setBookName] = useState("")
    const [alternateTitle, setAlternateTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [bookCountAvailable, setBookCountAvailable] = useState(null)
    const [language, setLanguage] = useState("")
    const [publisher, setPublisher] = useState("")
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [image, setImage] = useState([])
    const [imagePreview, setImagePreview] = useState(["https://via.placeholder.com/150"]);
    const [recentAddedBooks, setRecentAddedBooks] = useState([])


    /* Fetch all the Categories */
    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const response = await axios.get(API_URL + "api/categories/allcategories")
                const all_categories = await response.data.map(category => (
                    { value: `${category._id}`, text: `${category.categoryName}` }
                ))
                setAllCategories(all_categories)
            }
            catch (err) {
                console.log(err)
            }
        }
        getAllCategories()
    }, [API_URL])

    /* Adding book function */
    const addBook = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const BookData = {
            bookName: bookName,
            alternateTitle: alternateTitle,
            author: author,
            bookCountAvailable: bookCountAvailable,
            language: language,
            publisher: publisher,
            categories: selectedCategories,
            isAdmin: user.isAdmin,
            image: image
        }
        try {
            const response = await axios.post(API_URL + "api/books/addbook", BookData)
            if (recentAddedBooks.length >= 5) {
                recentAddedBooks.splice(-1)
            }
            setRecentAddedBooks([response.data, ...recentAddedBooks])
            setBookName("")
            setAlternateTitle("")
            setAuthor("")
            setBookCountAvailable(null)
            setLanguage("")
            setPublisher("")
            setSelectedCategories([])
            alert("Book Added Successfully 🎉")
        }
        catch (err) {
            console.log(err)
        }
        setIsLoading(false)
    }


    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "api/books/allbooks")
            setRecentAddedBooks(response.data.slice(0, 5))
        }
        getallBooks()
    }, [API_URL])


    return (
        <div>
            <p className="dashboard-option-title">Thêm sách </p>
            <div className="dashboard-title-line"></div>
            <form className='addbook-form' onSubmit={addBook}>

                <label className="addbook-form-label" htmlFor="bookName">Tên Sách <span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="bookName" value={bookName} onChange={(e) => { setBookName(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="alternateTitle">Tiêu đề thay thế </label><br />
                <input className="addbook-form-input" type="text" name="alternateTitle" value={alternateTitle} onChange={(e) => { setAlternateTitle(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="author">Tên Tác Giả <span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="author" value={author} onChange={(e) => { setAuthor(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="language">Ngôn Ngữ </label><br />
                <input className="addbook-form-input" type="text" name="language" value={language} onChange={(e) => { setLanguage(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="publisher">Nhà xuất bản </label><br />
                <input className="addbook-form-input" type="text" name="publisher" value={publisher} onChange={(e) => { setPublisher(e.target.value) }}></input><br />

                <label className="addbook-form-label" htmlFor="copies">Số lượng bản sao có sẵn <span className="required-field">*</span></label><br />
                <input className="addbook-form-input" type="text" name="copies" value={bookCountAvailable} onChange={(e) => { setBookCountAvailable(e.target.value) }} required></input><br />

                <label className="addbook-form-label" htmlFor="categories">Thể loại <span className="required-field">*</span></label><br />
                <div className="semanticdropdown">
                    <Dropdown
                        placeholder='Category'
                        fluid
                        multiple
                        search
                        selection
                        options={allCategories}
                        value={selectedCategories}
                        onChange={(event, value) => setSelectedCategories(value.value)}
                    />
                </div>
                <label className="addbook-form-label" htmlFor="categories">Thể loại <span className="required-field"></span></label><br />

                <input className="addbook-form-input" type="file" name="image" id="customFile" 
                    onChange={(e) => { 
                        const reader = new FileReader();
                        reader.onload = () => {
                            if (reader.readyState === 2) {
                                const img = new Image();
                                img.onload = () => {
                                    const canvas = document.createElement('canvas');
                                    const ctx = canvas.getContext('2d');

                                    // Tăng độ phân giải của canvas
                                    const targetWidth = 100;
                                    const targetHeight = 150;
                                    const resolutionMultiplier = 2; // Tăng chất lượng gấp đôi

                                    canvas.width = targetWidth * resolutionMultiplier;
                                    canvas.height = targetHeight * resolutionMultiplier;

                                    // Vẽ ảnh lên canvas với kích thước lớn hơn
                                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                                    // Giảm xuống kích thước hiển thị mong muốn
                                    const resizedImage = canvas.toDataURL("image/jpeg", 1.0);
                                    setImagePreview(resizedImage);
                                    setImage(resizedImage);
                                }
                                img.src = reader.result;
                            }
                        }
                        reader.readAsDataURL(e.target.files[0]);
                    }}
                    ></input><br />
                    <img
                        src={imagePreview}
                        key={imagePreview}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                    />
                {/* <div className="custom-file">
                    <input
                        type="file"
                        name="product_images"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                        multiple
                    />
                    <label
                        className="custom-file-label"
                        htmlFor="customFile"
                    >
                        Chọn ảnh
                    </label>
                </div> */}
                <input className="addbook-submit" type="submit" value="THÊM SÁCH " disabled={isLoading}></input>
            </form>
            <div>
                <p className="dashboard-option-title">Sách đã được thêm gần đây </p>
                <div className="dashboard-title-line"></div>
                <table className='admindashboard-table'>
                    <tr>
                        <th>STT</th>
                        <th>Tên Sách </th>
                        <th>Ngày Thêm </th>
                    </tr>
                    {
                        recentAddedBooks.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.createdAt.substring(0, 10)}</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default AddBook