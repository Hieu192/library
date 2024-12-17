import React, { useContext, useState } from 'react'
import './Signin.css'
import axios from "../service/axios"
import { AuthContext } from '../Context/AuthContext.js'
import Switch from '@material-ui/core/Switch';

function Signin() {
    const [isStudent, setIsStudent] = useState(true)
    const [admissionId, setAdmissionId] = useState()
    const [employeeId,setEmployeeId] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("")
    const { dispatch } = useContext(AuthContext)

    
    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/signin", userCredential);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
            setError("Wrong Password Or Username")
        }
    }

    const handleForm = (e) => {
        console.log(admissionId,password)
        e.preventDefault()
        isStudent
        ? loginCall({ admissionId, password }, dispatch)
        : loginCall({ employeeId,password }, dispatch)
    }

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    <div className="persontype-question">
                        <p>Bạn có phải là quản trị viên không ?</p>
                        <Switch
                            onChange={() => setIsStudent(!isStudent)}
                            color="primary"
                        />
                    </div>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor={isStudent?"admissionId":"employeeId"}> <b>{isStudent?"ID Thành viên ":"ID Quản trị viên "}</b></label>
                        <input className='signin-textbox' type="text" placeholder={isStudent?"Nhập tài khoản thành viên ":"Nhập tài khoản quản trị viên"} name={!isStudent?"employeeId":"admissionId"} required onChange={(e) => { isStudent?setAdmissionId(e.target.value):setEmployeeId(e.target.value) }}/>
                        <label htmlFor="password"><b>Mật khẩu </b></label>
                        <input className='signin-textbox' type="password" minLength='6' placeholder="Nhập mật khẩu " name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    <button className="signin-button">Đăng nhập </button>
                    <a className="forget-pass" href="#home">Quên mật khẩu ?</a>
                </form>
                <div className='signup-option'>
                    <p className="signup-question">Bạn không có tài khoản? Hãy liên hệ thủ thư </p>
                </div>
            </div>
        </div>
    )
}

export default Signin