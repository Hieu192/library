import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "../../../../service/axios"
import { Dropdown } from 'semantic-ui-react'
import '../../MemberDashboard/MemberDashboard.css'
import moment from "moment"
import { AuthContext } from '../../../../Context/AuthContext'
import { toast } from 'react-toastify';

function Return() {


    const { user } = useContext(AuthContext)

    const [allTransactions, setAllTransactions] = useState([])
    const [ExecutionStatus, setExecutionStatus] = useState(null) /* For triggering the tabledata to be updated */ 

    const [allMembersOptions, setAllMembersOptions] = useState(null)
    const [borrowerId, setBorrowerId] = useState(null)


    //Fetching all Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get("/users/allmembers")
                setAllMembersOptions(response.data.map((member) => (
                    { value: `${member?._id}`, text: `${member?.userType === "Student" ? `${member?.userFullName}` : `${member?.userFullName}`}` }
                )))
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [])


    /* Getting all active transactions */
    useEffect(()=>{
        const getAllTransactions = async () =>{
            try{
                const response = await axios.get("/transactions/all-transactions")
                setAllTransactions(response.data.sort((a, b) => Date.parse(a.toDate) - Date.parse(b.toDate)).filter((data) => {
                    return data.transactionStatus === "Active"
                }))
                console.log("Okay")
                setExecutionStatus(null)
            }
            catch(err){
                console.log(err)
            }
        }
        getAllTransactions()
    },[ExecutionStatus])


    const returnBook = async (transactionId,borrowerId,bookId,due) =>{
        toast.success("Trả sách thành công!");
        try{
            /* Setting return date and transactionStatus to completed */
            await axios.put("/transactions/update-transaction/"+transactionId,{
                isAdmin:user.isAdmin,
                transactionStatus:"Completed",
                returnDate:moment(new Date()).format("MM/DD/YYYY")
            })

            /* Getting borrower points alreadt existed */
            const borrowerdata = await axios.get("/users/getuser/"+borrowerId)
            const points = borrowerdata.data.points

            /* If the number of days after dueDate is greater than zero then decreasing points by 10 else increase by 10*/
            if(due > 0){
                await axios.put("/users/updateuser/"+borrowerId,{
                    points:points-10,
                    isAdmin: user.isAdmin
                })
            }
            else if(due<=0){
                await axios.put("/users/updateuser/"+borrowerId,{
                    points:points+10,
                    isAdmin: user.isAdmin
                })
            }

            const book_details = await axios.get("/books/getbook/"+bookId)
            await axios.put("/books/updatebook/"+bookId,{
                isAdmin:user.isAdmin,
                bookCountAvailable:book_details.data.bookCountAvailable + 1
            })

            /* Pulling out the transaction id from user active Transactions and pushing to Prev Transactions */
            await axios.put(+ `/users/${transactionId}/move-to-prevtransactions`, {
                userId: borrowerId,
                isAdmin: user.isAdmin
            })

            setExecutionStatus("Completed");
            alert("Book returned to the library successfully")
        }
        catch(err){
            console.log(err)
        }
    }

    const convertToIssue = async (transactionId) => {
        try{
            await axios.put("/transactions/update-transaction/"+transactionId,{
                transactionType:"Issued",
                isAdmin:user.isAdmin
            })
            setExecutionStatus("Completed");
            alert("Book issued succesfully 🎆")
        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <div className='semanticdropdown returnbook-dropdown'>
                <Dropdown
                    placeholder='Select Member'
                    fluid
                    search
                    selection
                    value={borrowerId}
                    options={allMembersOptions}
                    onChange={(event, data) => setBorrowerId(data.value)}
                />
            </div>
            <p className="dashboard-option-title">Mượn sách</p>
            <table className="admindashboard-table">
                    <tr>
                        <th>Tên Sách </th>
                        <th>Người Mượn </th>
                        <th>Từ Ngày </th>
                        <th>Đến Ngày </th>
                        <th>Phạt </th>
                        <th></th>
                    </tr>
                    {
                        allTransactions?.filter((data)=>{
                            if(borrowerId === null){
                                return data.transactionType === "Issued"
                            }
                            else{
                                return data.borrowerId === borrowerId && data.transactionType === "Issued"
                            }
                        }).map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.bookName}</td>
                                    <td>{data.borrowerName}</td>
                                    <td>{data.fromDate}</td>
                                    <td>{data.toDate}</td>
                                    <td>{(Math.floor(( Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate) ) / 86400000)) <= 0 ? 0 : (Math.floor(( Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate) ) / 86400000))*1000}</td>
                                    <td><button onClick={()=>{returnBook(data._id,data.borrowerId,data.bookId,(Math.floor(( Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate) ) / 86400000)))}}>Trả </button></td>
                                </tr>
                            )
                        })
                    }
                </table>
                <p className="dashboard-option-title">Đặt trước</p>
            <table className="admindashboard-table">
                    <tr>
                        <th>Tên Sách </th>
                        <th>Người Mượn </th>
                        <th>Từ Ngày </th>
                        <th>Đến Ngày </th>
                        <th></th>
                    </tr>
                    {
                        allTransactions?.filter((data)=>{
                            if(borrowerId === null){
                                return data.transactionType === "Reserved"
                            }
                            else{
                                return data.borrowerId === borrowerId && data.transactionType === "Reserved"
                            }
                        }).map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{data.bookName}</td>
                                    <td>{data.borrowerName}</td>
                                    <td>{data.fromDate}</td>
                                    <td>{data.toDate}</td>
                                    <td><button onClick={()=>{convertToIssue(data._id)}}>Convert</button></td>
                                </tr>
                            )
                        })
                    }
                </table>
        </div>
    )
}

export default Return
