import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const logInDemo = (event) => {
        event.preventDefault();
        dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
        history.push('/')
    }



    const onSubmit = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(res => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };
    return (
        <>


            <div className="container flex justify-center items-center h-screen mx-auto border-solid border-black">
                <form onSubmit={onSubmit} className="w-4/12 ">
                    <div className="relative w-full mt-10 space-y-8">
                        <div className="relative">
                            <ul>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <label className="font-medium text-gray-900">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50" placeholder="Enter Your Username"
                                required />
                        </div>
                        <div className="relative">
                            <label className="font-medium text-gray-900">Email</label>
                            <input type="text"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50"
                                placeholder="Enter Your Email Address"
                                required />
                        </div>
                        <div className="relative">
                            <label className="font-medium text-gray-900">Password</label>
                            <input type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50" placeholder="Password" />
                        </div>
                        <div className="relative">
                            <label className="font-medium text-gray-900">Confirm Password</label>
                            <input type="password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)} className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50" placeholder="Password" />
                        </div>
                        <div className="relative">
                            <button type="submit" className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-black border bg-black-600 rounded-lg hover:bg-gray-700 hover:text-white ease">Create Account</button>
                            <button
                                onClick={(event) => logInDemo(event)}
                                className="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease">Demo User</button>
                            {/* <button className=""
                                                onClick={(event) => logInDemo(event)}>Demo User</button> */}
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignupFormPage;
