import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';

import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    let sessionLinks;

    const userLogout = (event) => {
        event.preventDefault()
        dispatch(sessionActions.logout());
        history.push('/');
    }
    const logInDemo = (event) => {
        event.preventDefault();
        dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
        history.push('/')
    }

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <div className="flex justify-around w-full mt-7 pr-20">
                    <NavLink to="/login" className="font-body text-l transition duration-100 hover:underline hover:text-gray-500 ease">
                        Log in
                    </NavLink>
                    <p>I</p>
                    <NavLink to="/signup" className="font-body text-l transition duration-100 hover:underline hover:text-gray-500 ease">Sign up</NavLink>
                </div>
            </>
        );
    }
    return (
        <nav className="fixed opacity-100 h-20 z-99 bg-white shadow-md grid grid-cols-10 w-screen">
            <div className="fixed opacity-100 h-20 z-99 shadow-md grid grid-cols-10 w-screen">
                <div className="col-start-1 col-end-2">
                    <NavLink exact to="/"><img src="https://i.imgur.com/pZpLFUO.jpg" alt="logo" className="h-20 ml-20 transition duration-100 hover:shadow ease" /></NavLink>
                </div>

                <div className="col-start-2 col-end-4">
                    <div className="flex justify-around mt-7 ml-2 ">
                        <NavLink to='/orders/1' className="font-body text-ltransition duration-100 hover:underline hover:text-gray-500 ease">My Cart</NavLink>
                        <NavLink to='#' className="font-body text-ltransition duration-100 hover:underline hover:text-gray-500 ease">Accessories</NavLink>
                        <NavLink to='#' className="font-body text-l transition duration-100 hover:underline hover:text-gray-500 ease">Gear</NavLink>
                    </div>
                </div>
                <div className='col-start-9 col-end-11 pl-14 '>
                    <div id="authButtons">
                        {isLoaded && sessionLinks}
                    </div>
                </div>
            </div>
        </nav >
    );











    // return (
    //     <>
    //         < ul className='nav-bar' >
    //             <div>
    //                 <label className='appName'>WedCamp</label>
    //                 <i className="fad fa-campground"></i>
    //             </div>
    //             <div className='link-parent'>
    //                 <NavLink className='explore' to='/explore'>Explore</NavLink>
    //                 {!sessionUser &&
    //                     <NavLink className='login' to="/login">Log In</NavLink>}
    //                 {!sessionUser &&
    //                     <NavLink className='signup' to="/signup">Sign Up</NavLink>}
    //                 <NavLink className='home' exact to="/">Home</NavLink>
    //                 {sessionUser &&
    //                     <div onClick={userLogout} className='logout' to='/'>Log Out</div>}
    //             </div>
    //         </ul >
    //     </>
    // );

    //     <div>
    // <nav className="sticky bg-grey-600 shadow-md h-20 z-50 w-full px-5 py-2 flex justify-between items-center cursor-pointer">
    //             <div className="flex">

    //                 <NavLink exact to="/" className="h-20 w-20 self-center items-center"><img src="https://i.imgur.com/pZpLFUO.jpg" alt="logo" /></NavLink>
    //             </div>

    //             <div className="flex w-full m-auto px-20 items-center content-center">
    //                 <div className="flex justify-between w-full pl-6">
    //                     <NavLink to='#' className="hover:underline">Clothing</NavLink>
    //                     <NavLink to='#' className="hover:underline">Accessories</NavLink>
    //                     <NavLink to='#' className="hover:underline">Gear</NavLink>
    //                 </div>

    //             </div>
    //             <div className="flex justify-end items-end space-x-3 p-1">
    //                 {isLoaded && sessionLinks}
    //             </div>
    //         </nav>
    //     </div >
    // );c
}

export default Navigation;
