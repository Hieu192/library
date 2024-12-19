import express from "express"
import Book from "../models/Book.js"
import BookCategory from "../models/BookCategory.js"
import cloudinary from "cloudinary";


const router = express.Router()

/* Get all books in the db */
router.get("/allbooks", async (req, res) => {
    try {
        const books = await Book.find({}).populate("transactions").populate("categories").sort({ _id: -1 })
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err);
    }
})

/* Get Book by book Id */
router.get("/getbook/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate("transactions").populate("categories")
        res.status(200).json(book)
    }
    catch {
        return res.status(500).json(err)
    }
})

/* Get books by category name*/
router.get("/", async (req, res) => {
    const category = req.query.category
    try {
        const books = await BookCategory.findOne({ categoryName: category }).populate("books")
        res.status(200).json(books)
    }
    catch (err) {
        return res.status(504).json(err)
    }
})

/* Adding book */
router.post("/addbook", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            console.log("test :::", req.body)
            let imagesLink=[];
            const image = req.body.image;
            const result = await cloudinary.v2.uploader.upload(image, {
                folder: "products",
            });
            console.log(result)
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
            console.log(imagesLink)
            const newbook = await new Book({
                bookName: req.body.bookName,
                alternateTitle: req.body.alternateTitle,
                author: req.body.author,
                description : req.body.description,
                bookCountAvailable: req.body.bookCountAvailable,
                language: req.body.language,
                publisher: req.body.publisher,
                bookStatus: req.body.bookSatus,
                categories: req.body.categories,
                image: imagesLink
            })
            console.log(newbook)
            const book = await newbook.save()
            await BookCategory.updateMany({ '_id': book.categories }, { $push: { books: book._id } });
            res.status(200).json(book)
        }
        catch (err) {
            res.status(504).json(err)
        }
    }
    else {
        return res.status(403).json("You dont have permission to add a book!");
    }
})

/* Addding book */
router.put("/updatebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            await Book.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Book details updated successfully");
        }
        catch (err) {
            res.status(504).json(err);
        }
    }
    else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

/* Remove book  */
router.delete("/removebook/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const _id = req.params.id
            const book = await Book.findOne({ _id })
            await book.remove()
            await BookCategory.updateMany({ '_id': book.categories }, { $pull: { books: book._id } });
            res.status(200).json("Book has been deleted");
        } catch (err) {
            return res.status(504).json(err);
        }
    } else {
        return res.status(403).json("You dont have permission to delete a book!");
    }
})

// get sachs moi them gan day
router.get('/recent', async (req, res) => {
    console.log("goi recent")
    try {
        // Tính thời gian 60 ngày trước
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 60);
        // Lọc sách dựa trên `createAt`
        const recentBooks = await Book.find({ createdAt: { $gte: dayAgo } }).populate("transactions").populate("categories")
          .sort({ createAt: -1 }) // Sắp xếp giảm dần theo ngày tạo
          .limit(10); // Lấy tối đa 10 sách gần đây
        res.status(200).json(recentBooks);
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
      }
});

// Sach pho bien
router.get('/popular', async (req, res) => {
    try {
        const popularBooks = await Book.find().populate("transactions").populate("categories")
          .sort({ borrowedCount: -1 }) // Sắp xếp giảm dần theo số lần mượn
          .limit(10); // Lấy tối đa 10 sách phổ biến
    
        res.status(200).json(popularBooks);
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
      }
    }
)

// search sach
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query; // Lấy từ khóa tìm kiếm từ request
        console.log("query:::",query)
        // Tìm sách dựa trên tên sách hoặc tên tác giả
        const books = await Book.find({
            $or: [
                { bookName: { $regex: query, $options: 'i' } }, // Tìm kiếm theo tên sách
                { author: { $regex: query, $options: 'i' } }    // Tìm kiếm theo tên tác giả
            ]
        });
        // Trả về danh sách sách tìm được
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm kiếm' });
    }}
)


export default router