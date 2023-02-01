import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate , Link} from 'react-router-dom';


const RegisterForm = (props) => {
    const [userName, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [logged, setLogged] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
            userName,
            email,
            password,
            confirmPassword,
        }, { withCredentials: true })
            .then(res => {
                console.log("hello")
                sessionStorage.setItem("userInSession", res.data.user.userName)
                setLogged(res.data.user)
                setUser(res.data.user)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                // console.log("--------------")
                // console.log(err.errors);
                const errorRes = err.response.data.errors;
                const errorArr = [];

                for (const key of Object.keys(errorRes)) {
                    errorArr.push(errorRes[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div>
            <h2 className="text-center text-2xl">Register an Account</h2>
            <Link to={"/"} className="mx-auto w-full">Home</Link>
            <form className="mx-auto w-1/2 border p-3 rounded-md" onSubmit={onSubmitHandler}>
                {errors.map((error, idx) => <p style={{color: "red"}} key={error + idx}>{error}</p>)}
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Username:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Email:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Password:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Confirm Password:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    </div>
                </div>
                <button type="submit" className="bg-dark-blue hover:bg-light-blue text-white rounded-md p-2">Create Account</button>
            </form>
        </div>
    );
}

export default RegisterForm;