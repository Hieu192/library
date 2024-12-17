import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "../../../../service/axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"
import { toast } from 'react-toastify';
function AddTransaction() {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const [borrowerId, setBorrowerId] = useState("")
    const [borrowerDetails, setBorrowerDetails] = useState([])
    const [bookId, setBookId] = useState("")
    const [recentTransactions, setRecentTransactions] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [allBooks, setAllBooks] = useState([])

    const [fromDate, setFromDate] = useState(null)
    const [fromDateString, setFromDateString] = useState(null)

    const [toDate, setToDate] = useState(null)
    const [toDateString, setToDateString] = useState(null)

    const transactionTypes = [
        { value: 'Issued', text: 'Mượn sách' },
        { value: 'Reserved', text: 'Đặt trước' }
      
    ]

    const [transactionType, setTransactionType] = useState("")

    /* Adding a Transaction */
    const addTransaction = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (bookId !== "" && borrowerId !== "" && transactionType !== "" && fromDate !== null && toDate !== null) {
            const borrower_details = await axios.get("/users/getuser/" + borrowerId)
            const book_details = await axios.get("/books/getbook/" + bookId)
            
            /* Checking weather the book is available or not */
            if ((book_details.data.bookCountAvailable > 0 && (transactionType === "Issued" || transactionType === "Reserved")) || (book_details.data.bookCountAvailable === 0 && transactionType === "Reserved")) {
                const transactionData = {
                    bookId: bookId,
                    borrowerId: borrowerId,
                    borrowerName: borrower_details.data.userFullName,
                    bookName: book_details.data.bookName,
                    transactionType: transactionType,
                    fromDate: fromDateString,
                    toDate: toDateString,
                    isAdmin: user.isAdmin,
                    userId:borrowerId
                }
                try {
                    const response = await axios.post("/transactions/add-transaction", transactionData)
                    if (recentTransactions.length >= 5) {
                        (recentTransactions.splice(-1))
                    }
                    await axios.put(`/users/${response.data._id}/move-to-activetransactions`, {
                        userId: borrowerId,
                        isAdmin: user.isAdmin
                    })

                    await axios.put("/books/updatebook/"+bookId,{
                        isAdmin:user.isAdmin,
                        bookCountAvailable:book_details.data.bookCountAvailable - 1
                    })

                    setRecentTransactions([response.data, ...recentTransactions])
                    setBorrowerId("")
                    setBookId("")
                    setTransactionType("")
                    setFromDate(null)
                    setToDate(null)
                    setFromDateString(null)
                    setToDateString(null)
                    toast.success("Đã tạo giao dịch thành công!");
                }
                catch (err) {
                    console.log(err)
                }
            }
            else{
                toast.error("Sách ko có sẵn!");
            }
        }
        else {
            toast.error("Các trường không được để trống!");
        }
        setIsLoading(false)
    }


    /* Fetch Transactions */
    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axios.get("/transactions/all-transactions")
                setRecentTransactions(response.data.slice(0, 5))
            }
            catch (err) {
                console.log("Error in fetching transactions")
            }

        }
        getTransactions()
    }, [])


    /* Fetching borrower details */
    useEffect(() => {
        const getBorrowerDetails = async () => {
            try {
                if (borrowerId !== "") {
                    const response = await axios.get("/users/getuser/" + borrowerId)
                    setBorrowerDetails(response.data)
                }
            }
            catch (err) {
                console.log("Error in getting borrower details")
            }
        }
        getBorrowerDetails()
    }, [borrowerId])


    /* Fetching members */
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get("/users/allmembers")
                console.log(response.data)
                const all_members = await response.data.map(member => (
                    { value: `${member?._id}`, text: `${member?.userType === "Student" ? `${member?.userFullName}` : `${member?.userFullName}`}` }
                ))
                setAllMembers(all_members)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [])


    /* Fetching books */
    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get( "/books/allbooks")
            const allbooks = await response.data.map(book => (
                { value: `${book._id}`, text: `${book.bookName}` }
            ))
            setAllBooks(allbooks)
        }
        getallBooks()
    }, [])


    return (
        <div>
            <p className="dashboard-option-title">Thêm Giao Dịch </p>
            <div className="dashboard-title-line"></div>
            <form className='transaction-form' onSubmit={addTransaction}>
                <label className="transaction-form-label" htmlFor="borrowerId">Người mượn <span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Chọn Thành Viên '
                        fluid
                        search
                        selection
                        value={borrowerId}
                        options={allMembers}
                        onChange={(event, data) => setBorrowerId(data.value)}
                    />
                </div>
                <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Họ và tên</th>
                        <th>Đã mượn</th>
                        <th>Đặt trước</th>
                        <th>Điểm</th>
                    </tr>
                    <tr>
                        <td>{borrowerDetails.userFullName}</td>
                        <td>{borrowerDetails.activeTransactions?.filter((data) => {
                            return data.transactionType === "Issued" && data.transactionStatus === "Active"
                        }).length
                        }
                        </td>
                        <td>{borrowerDetails.activeTransactions?.filter((data) => {
                            return data.transactionType === "Reserved" && data.transactionStatus === "Active"
                        }).length
                        }
                        </td>
                        <td>{borrowerDetails.points}</td>
                    </tr>
                </table>
                <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Tên sách</th>
                        <th>Giao dịch</th>
                        <th>Từ ngày<br /></th>
                        <th>Đến ngày<br /></th>
                        <th>Tiền phạt</th>
                    </tr>
                    {
                        borrowerDetails.activeTransactions?.filter((data) => { return data.transactionStatus === "Active" }).map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.bookName}</td>
                                    <td>{data.transactionType}</td>
                                    <td>{data.fromDate}</td>
                                    <td>{data.toDate}</td>
                                    <td>{(Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) <= 0 ? 0 : (Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) * 10}</td>
                                </tr>
                            )
                        })
                    }
                </table>

                <label className="transaction-form-label" htmlFor="bookName">Tên Sách <span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Chọn Sách '
                        fluid
                        search
                        selection
                        options={allBooks}
                        value={bookId}
                        onChange={(event, data) => setBookId(data.value)}
                    />
                </div>
                {/* <table className="admindashboard-table shortinfo-table" style={bookId === "" ? { display: "none" } : {}}>
                    <tr>
                        <th>Available Coipes</th>
                        <th>Reserved</th>
                    </tr>
                </table> */}

                <label className="transaction-form-label" htmlFor="transactionType">Hình Thức Mượn Sách <span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Chọn Giao Dịch '
                        fluid
                        selection
                        value={transactionType}
                        options={transactionTypes}
                        onChange={(event, data) => setTransactionType(data.value)}
                    />
                </div>
                <br />

                <div style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                    <label className="transaction-form-label" htmlFor="from-date">Từ Ngày <span className="required-field">*</span></label><br />
                    <DatePicker
                        className="date-picker"
                        placeholderText="MM/DD/YYYY"
                        selected={fromDate}
                        onChange={(date) => { setFromDate(date); setFromDateString(moment(date).format("MM/DD/YYYY")) }}
                        minDate={new Date()}
                        dateFormat="MM/dd/yyyy"
                    />
                    <label className="transaction-form-label" htmlFor="to-date">Đến Ngày <span className="required-field">*</span></label><br />
                    <DatePicker
                        className="date-picker"
                        placeholderText="MM/DD/YYYY"
                        selected={toDate}
                        onChange={(date) => { setToDate(date); setToDateString(moment(date).format("MM/DD/YYYY")) }}
                        minDate={new Date()}
                        dateFormat="MM/dd/yyyy"
                    />
                    <input className="transaction-form-submit" type="submit" value="TẠO GIAO DỊCH " disabled={isLoading}></input>
                </div>
            </form>
            <p className="dashboard-option-title">Lịch Sử Mượn Sách </p>
            <div className="dashboard-title-line"></div>
            <table className="admindashboard-table">
                <tr>
                    <th>STT </th>
                    <th>Tên Sách </th>
                    <th>Tên Người Mượn </th>
                    <th>Ngày Mượn</th>
                </tr>
                {
                    recentTransactions.map((transaction, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.bookName}</td>
                                <td>{transaction.borrowerName}</td>
                                <td>{transaction.updatedAt.slice(0, 10)}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AddTransaction