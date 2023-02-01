import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';


const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState("");
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email,
            password,
        }, { withCredentials: true })
            .then(res =>{ 
                console.log(res.data)
                sessionStorage.setItem("userInSession", res.data.user.userName)
                setLogged(res.data.user)
                setUser(res.data.user)
                navigate("/")
            })
            .catch(err => {
                console.log(err)
                setErrors(["Invalid Email/Password"]);
            })
    }

    return (
        <div>
            <h2 className="text-center text-2xl">Login to Account</h2>
            <Link to={"/"} className="mx-auto w-full">Home</Link>
            <form className="mx-auto w-1/2 border p-3 rounded-md" onSubmit={onSubmitHandler}>
            {errors.map((error, idx) => <p style={{color: "red"}} key={error + idx}>{error}</p>)}
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Email:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label htmlFor="" className="col-form-label">Password:</label>
                    <div>
                        <input type="text" className="w-full border rounded-md p-2"  onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </div>
                </div>
                <button type="submit" className="bg-dark-blue hover:bg-light-blue text-white rounded-md p-2">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;