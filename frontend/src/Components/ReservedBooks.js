import React from 'react'
import './ReservedBooks.css'

function ReservedBooks() {
    return (
        <div className='reservedbooks-container'>
            <h className='reservedbooks-title'>Sách đang chờ về </h>
            <table className='reservedbooks-table'>
                <tr>
                    <th>Tác giả </th>
                    <th>Sách</th>
                    <th>Ngày </th>
                </tr>
                <tr>
                    <td> Harper Lee</td>
                    <td>Giết con chim nhại</td>
                    <td>12/7/2025 </td>
                </tr>
                <tr>
                    <td>Vụ án</td>
                    <td>Franz Kafka</td>
                    <td>10/7/2025</td>
                </tr>
                <tr>
                    <td> J.D. Salinger</td>
                    <td>Bắt trẻ đồng xanh</td>
                    <td>15/9/2025 </td>
                </tr>
                <tr>
                    <td>Nguyễn Nhật Ánh</td>
                    <td>Ngày xưa có một chuyện tình</td>
                    <td>02/9/2025 </td>
                </tr>
                <tr>
                    <td>Nguyễn Ngọc Tư</td>
                    <td>Cánh đồng bất tận</td>
                    <td>21/7/2025 </td>
                </tr>
                <tr>
                    <td>Nguyễn Nhật Ánh</td>
                    <td>Hoa vàng trên cỏ xanh</td>
                    <td>02/7/2025 </td>
                </tr>
                <tr>
                    <td>Đoàn Giỏi</td>
                    <td>Hành trình vào rừng Nam</td>
                    <td>02/7/2025 </td>
                </tr>
                <tr>
                    <td>Bảo Ninh</td>
                    <td>Đêm chiến tranh dài</td>
                    <td>02/7/2025 </td>
                </tr>
                <tr>
                    <td>Phùng Quán</td>
                    <td>Hồi ức tuổi thơ</td>
                    <td>02/7/2025 </td>
                </tr>
            </table>
        </div>
    )
}

export default ReservedBooks
