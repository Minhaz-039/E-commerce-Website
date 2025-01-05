import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineUserAdd,
    AiOutlineLogin,
    AiOutlineShoppingCart,
} from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Navigation.css';
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import FavoritesCount from "../Products/FavoritesCount";




const Navigation = () => {

    const { userInfo } = useSelector(state => state.auth);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showsidebar, setShowsidebar] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const togglesidebar = () => {
        setShowsidebar(!showsidebar);
    };

    const closeSidebar = () => {
        setShowsidebar(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ zIndex: 999 }}
            className={`${showsidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed `}
            id="navigation-container"  >
            <div className="flex flex-col justify-center space-y-4">


                <Link to="/" className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
                </Link>


                <Link to="/shop" className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
                </Link>


                <Link to="/cart" className="flex items-center transition-transform transform hover:translate-x-2">
                    <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">CART</span>{" "}
                </Link>


                <Link to="/favorite" className="flex items-center transition-transform transform hover:translate-x-2">
                    <FaHeart className="mr-2 mt-[3rem]" size={26} />
                    <span className="hidden nav-item-name mt-[3rem]">FAVORITE</span>{" "}
                    <FavoritesCount/>
                </Link>

            </div>


            <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center text-gray-8000 focus:outline-none">
                    {userInfo ? (<span className="text-white">{userInfo.username}</span>) : (<></>)}
                    {userInfo && (dropdownOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />)}
                </button>

                {dropdownOpen && userInfo && (
                    <ul className={`absolute right-0 mt-2 mr-14 bg-black text-white p-2 ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}>
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to='/admin/dashboard' className="block px-4 py-2 hover:bg-gray-100">
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/admin/productlist' className="block px-4 py-2 hover:bg-gray-100">
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/admin/categorylist' className="block px-4 py-2 hover:bg-gray-100">
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/admin/orderlist' className="block px-4 py-2 hover:bg-gray-100">
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/admin/userlist' className="block px-4 py-2 hover:bg-gray-100">
                                        Users
                                    </Link>
                                </li>

                            </>
                        )}


                        <li>
                            <Link to='/profile' className="block px-4 py-2 hover:bg-gray-100">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to='/logout' onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-100">
                                Logout
                            </Link>
                        </li>


                    </ul>)}

            </div>

            {!userInfo && (
                <ul>

                    <li>
                        <Link to="/login" className="flex items-center transition-transform transform hover:translate-x-2">
                            <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">Log In</span>{" "}
                        </Link>
                    </li>


                    <li>
                        <Link to="/register" className="flex items-center transition-transform transform hover:translate-x-2">
                            <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
                            <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}
                        </Link>
                    </li>

                </ul>
            )}




        </div>
    );
};

export default Navigation;