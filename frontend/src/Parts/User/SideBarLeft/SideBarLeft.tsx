import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { dashboardIcon, exploreOutline, homeFill, logOutIcon, messageOutline, postUploadOutline, searchIcon, ticketIcon } from '../../../Components/SvgIcon/SvgIcon'
import { FormControlLabel } from '@mui/material';
import { MaterialUISwitch } from '../../../Components/User/MaterialUISwitch/MaterialUISwitch';
import { useThemeContext } from '../../../Global/ThemeContext';
import ShowDialogModal from '../../../Components/ShowDialogModal/ShowDialogModal';
import Cookies from "js-cookie";
import SearchBox from '../../../Components/User/SearchBox/SearchBox';
import useGetData from '../../../hooks/useGetData';
import { userInformation } from '../../../hooks/user/user.types';
import NewPost from '../../../Components/User/NewPost/NewPost';



function SideBarLeft() {

    const [newPost, setNewPost] = useState(false);
    const [isShowSearch, setIsShowSearch] = useState(false);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") === "dark" ? true : false
    );
    const navigate = useNavigate();
    const { toggleTheme, themeMode } = useThemeContext();



    const logOutHandler = () => {
        Cookies.remove("access-token");
        Cookies.remove("refresh-token");
        navigate("/login")
    }

    const { data: myInfo, isSuccess: isSuccessMyInfo } = useGetData<userInformation>(
        ["getMyUserInfo"],
        "users/user-information"
    );


    



    return (
        <div className='fixed hidden md:flex flex-col justify-between overflow-y-auto pt-2 px-3 pb-3 w-[80px] lg:w-[100px] xl:w-[244px] left-0 top-0 bottom-0 bg-white dark:bg-black border-r dark:border-gray-300/20 border-gray-300'>
            <div className='flex flex-col'>
                {/* insta image */}
                <div className='mb-[19px] pt-[25px] px-3 pb-4 flex justify-center xl:justify-start'>
                    <Link className='text-black hidden xl:block dark:text-white' to="/">
                        <svg aria-label="Instagram" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="29" role="img" viewBox="32 4 113 32" width="103"><title>Instagram</title><path clipRule="evenodd" d="M37.82 4.11c-2.32.97-4.86 3.7-5.66 7.13-1.02 4.34 3.21 6.17 3.56 5.57.4-.7-.76-.94-1-3.2-.3-2.9 1.05-6.16 2.75-7.58.32-.27.3.1.3.78l-.06 14.46c0 3.1-.13 4.07-.36 5.04-.23.98-.6 1.64-.33 1.9.32.28 1.68-.4 2.46-1.5a8.13 8.13 0 0 0 1.33-4.58c.07-2.06.06-5.33.07-7.19 0-1.7.03-6.71-.03-9.72-.02-.74-2.07-1.51-3.03-1.1Zm82.13 14.48a9.42 9.42 0 0 1-.88 3.75c-.85 1.72-2.63 2.25-3.39-.22-.4-1.34-.43-3.59-.13-5.47.3-1.9 1.14-3.35 2.53-3.22 1.38.13 2.02 1.9 1.87 5.16ZM96.8 28.57c-.02 2.67-.44 5.01-1.34 5.7-1.29.96-3 .23-2.65-1.72.31-1.72 1.8-3.48 4-5.64l-.01 1.66Zm-.35-10a10.56 10.56 0 0 1-.88 3.77c-.85 1.72-2.64 2.25-3.39-.22-.5-1.69-.38-3.87-.13-5.25.33-1.78 1.12-3.44 2.53-3.44 1.38 0 2.06 1.5 1.87 5.14Zm-13.41-.02a9.54 9.54 0 0 1-.87 3.8c-.88 1.7-2.63 2.24-3.4-.23-.55-1.77-.36-4.2-.13-5.5.34-1.95 1.2-3.32 2.53-3.2 1.38.14 2.04 1.9 1.87 5.13Zm61.45 1.81c-.33 0-.49.35-.61.93-.44 2.02-.9 2.48-1.5 2.48-.66 0-1.26-1-1.42-3-.12-1.58-.1-4.48.06-7.37.03-.59-.14-1.17-1.73-1.75-.68-.25-1.68-.62-2.17.58a29.65 29.65 0 0 0-2.08 7.14c0 .06-.08.07-.1-.06-.07-.87-.26-2.46-.28-5.79 0-.65-.14-1.2-.86-1.65-.47-.3-1.88-.81-2.4-.2-.43.5-.94 1.87-1.47 3.48l-.74 2.2.01-4.88c0-.5-.34-.67-.45-.7a9.54 9.54 0 0 0-1.8-.37c-.48 0-.6.27-.6.67 0 .05-.08 4.65-.08 7.87v.46c-.27 1.48-1.14 3.49-2.09 3.49s-1.4-.84-1.4-4.68c0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81-.01-.5-.87-.75-1.27-.85-.4-.09-.76-.13-1.03-.11-.4.02-.67.27-.67.62v.55a3.71 3.71 0 0 0-1.83-1.49c-1.44-.43-2.94-.05-4.07 1.53a9.31 9.31 0 0 0-1.66 4.73c-.16 1.5-.1 3.01.17 4.3-.33 1.44-.96 2.04-1.64 2.04-.99 0-1.7-1.62-1.62-4.4.06-1.84.42-3.13.82-4.99.17-.8.04-1.2-.31-1.6-.32-.37-1-.56-1.99-.33-.7.16-1.7.34-2.6.47 0 0 .05-.21.1-.6.23-2.03-1.98-1.87-2.69-1.22-.42.39-.7.84-.82 1.67-.17 1.3.9 1.91.9 1.91a22.22 22.22 0 0 1-3.4 7.23v-.7c-.01-3.36.03-6 .05-6.95.02-.94.06-1.63.06-1.8 0-.36-.22-.5-.66-.67-.4-.16-.86-.26-1.34-.3-.6-.05-.97.27-.96.65v.52a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.94-.05-4.07 1.53a10.1 10.1 0 0 0-1.66 4.72c-.15 1.57-.13 2.9.09 4.04-.23 1.13-.89 2.3-1.63 2.3-.95 0-1.5-.83-1.5-4.67 0-2.24.07-3.21.1-4.83.02-.94.06-1.65.06-1.81 0-.5-.87-.75-1.27-.85-.42-.1-.79-.13-1.06-.1-.37.02-.63.35-.63.6v.56a3.7 3.7 0 0 0-1.84-1.49c-1.44-.43-2.93-.04-4.07 1.53-.75 1.03-1.35 2.17-1.66 4.7a15.8 15.8 0 0 0-.12 2.04c-.3 1.81-1.61 3.9-2.68 3.9-.63 0-1.23-1.21-1.23-3.8 0-3.45.22-8.36.25-8.83l1.62-.03c.68 0 1.29.01 2.19-.04.45-.02.88-1.64.42-1.84-.21-.09-1.7-.17-2.3-.18-.5-.01-1.88-.11-1.88-.11s.13-3.26.16-3.6c.02-.3-.35-.44-.57-.53a7.77 7.77 0 0 0-1.53-.44c-.76-.15-1.1 0-1.17.64-.1.97-.15 3.82-.15 3.82-.56 0-2.47-.11-3.02-.11-.52 0-1.08 2.22-.36 2.25l3.2.09-.03 6.53v.47c-.53 2.73-2.37 4.2-2.37 4.2.4-1.8-.42-3.15-1.87-4.3-.54-.42-1.6-1.22-2.79-2.1 0 0 .69-.68 1.3-2.04.43-.96.45-2.06-.61-2.3-1.75-.41-3.2.87-3.63 2.25a2.61 2.61 0 0 0 .5 2.66l.15.19c-.4.76-.94 1.78-1.4 2.58-1.27 2.2-2.24 3.95-2.97 3.95-.58 0-.57-1.77-.57-3.43 0-1.43.1-3.58.19-5.8.03-.74-.34-1.16-.96-1.54a4.33 4.33 0 0 0-1.64-.69c-.7 0-2.7.1-4.6 5.57-.23.69-.7 1.94-.7 1.94l.04-6.57c0-.16-.08-.3-.27-.4a4.68 4.68 0 0 0-1.93-.54c-.36 0-.54.17-.54.5l-.07 10.3c0 .78.02 1.69.1 2.09.08.4.2.72.36.91.15.2.33.34.62.4.28.06 1.78.25 1.86-.32.1-.69.1-1.43.89-4.2 1.22-4.31 2.82-6.42 3.58-7.16.13-.14.28-.14.27.07l-.22 5.32c-.2 5.37.78 6.36 2.17 6.36 1.07 0 2.58-1.06 4.2-3.74l2.7-4.5 1.58 1.46c1.28 1.2 1.7 2.36 1.42 3.45-.21.83-1.02 1.7-2.44.86-.42-.25-.6-.44-1.01-.71-.23-.15-.57-.2-.78-.04-.53.4-.84.92-1.01 1.55-.17.61.45.94 1.09 1.22.55.25 1.74.47 2.5.5 2.94.1 5.3-1.42 6.94-5.34.3 3.38 1.55 5.3 3.72 5.3 1.45 0 2.91-1.88 3.55-3.72.18.75.45 1.4.8 1.96 1.68 2.65 4.93 2.07 6.56-.18.5-.69.58-.94.58-.94a3.07 3.07 0 0 0 2.94 2.87c1.1 0 2.23-.52 3.03-2.31.09.2.2.38.3.56 1.68 2.65 4.93 2.07 6.56-.18l.2-.28.05 1.4-1.5 1.37c-2.52 2.3-4.44 4.05-4.58 6.09-.18 2.6 1.93 3.56 3.53 3.69a4.5 4.5 0 0 0 4.04-2.11c.78-1.15 1.3-3.63 1.26-6.08l-.06-3.56a28.55 28.55 0 0 0 5.42-9.44s.93.01 1.92-.05c.32-.02.41.04.35.27-.07.28-1.25 4.84-.17 7.88.74 2.08 2.4 2.75 3.4 2.75 1.15 0 2.26-.87 2.85-2.17l.23.42c1.68 2.65 4.92 2.07 6.56-.18.37-.5.58-.94.58-.94.36 2.2 2.07 2.88 3.05 2.88 1.02 0 2-.42 2.78-2.28.03.82.08 1.49.16 1.7.05.13.34.3.56.37.93.34 1.88.18 2.24.11.24-.05.43-.25.46-.75.07-1.33.03-3.56.43-5.21.67-2.79 1.3-3.87 1.6-4.4.17-.3.36-.35.37-.03.01.64.04 2.52.3 5.05.2 1.86.46 2.96.65 3.3.57 1 1.27 1.05 1.83 1.05.36 0 1.12-.1 1.05-.73-.03-.31.02-2.22.7-4.96.43-1.79 1.15-3.4 1.41-4 .1-.21.15-.04.15 0-.06 1.22-.18 5.25.32 7.46.68 2.98 2.65 3.32 3.34 3.32 1.47 0 2.67-1.12 3.07-4.05.1-.7-.05-1.25-.48-1.25Z" fill="currentColor" fillRule="evenodd"></path></svg>
                    </Link>
                    <Link className='block xl:hidden' to='/'>
                        <img loading='lazy' className='w-8 h-8 object-cover' src="/src/assets/images/logo.webp" alt="logo" />
                    </Link>
                </div>
                {/* menu */}

                <ul className='flex flex-col gap-3'>
                    <li className='p-3 rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                        <Link className='text-base/5 flex items-center justify-center xl:justify-start gap-3 font-bold text-black dark:text-white' to='/'>
                            <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                                {homeFill}
                            </div>
                            <span className='hidden xl:block'>Home</span>

                        </Link>
                    </li>
                    <li onClick={() => setIsShowSearch(true)} className='p-3 rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                        <div className='text-base/5 flex items-center justify-center xl:justify-start gap-3 font-bold text-black dark:text-white'>
                            <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                                {searchIcon}
                            </div>
                            <span className='hidden xl:block'>Search</span>
                        </div>
                    </li>
                    <li className='p-3 rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                        <Link className='text-base/5 flex items-center justify-center xl:justify-start gap-3 font-bold text-black dark:text-white' to='/login-info'>
                            <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                                {exploreOutline}
                            </div>
                            <span className='hidden xl:block'>Login info</span>
                        </Link>
                    </li>
                    <li className='p-3 rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                        <Link className='text-base/5 flex items-center justify-center xl:justify-start gap-3 font-bold text-black dark:text-white' to='/direct'>
                            <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                                {messageOutline}
                            </div>
                            <span className='hidden xl:block'>Message</span>
                        </Link>
                    </li>
                    <li className='p-3 rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                        <Link className='text-base/5 flex items-center justify-center xl:justify-start gap-3 font-bold text-black dark:text-white' to='/tickets'>
                            <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                                {ticketIcon}
                            </div>
                            <span className='hidden xl:block'>Tickets</span>
                        </Link>
                    </li>


                    <li className='p-3 rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                        <Link className='text-base/5 flex items-center justify-center xl:justify-start gap-3 font-bold text-black dark:text-white' to={`/profile/${myInfo?._id}`}>
                            <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                                    <img loading='lazy' className='w-full h-full rounded-full object-cover' src={`${import.meta.env.VITE_API_BASE_URL}/${myInfo?.profilePicture.path}`} alt="profile" />

                            </div>
                            <span className='hidden xl:block'>Profile</span>
                        </Link>
                    </li>

                    <li onClick={() => { setNewPost(true) }} className='p-3 flex items-center justify-center xl:justify-start  rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                        <button className='text-base/5 gap-3 font-bold text-black flex items-center justify-start dark:text-white'>
                            <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                                {postUploadOutline}
                            </div>
                            <span className='hidden xl:block'>Create</span>
                        </button>
                    </li>
                    {myInfo?.role === "ADMIN" && (
                    <li className='p-3 rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                        <Link className='text-base/5 flex items-center justify-center xl:justify-start gap-3 font-bold text-black dark:text-white' to='/dashboard/panel'>
                            <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                                {dashboardIcon}
                            </div>
                            <span className='hidden xl:block'>Dashboard</span>
                        </Link>
                    </li>
                    )}
                </ul>
            </div>

            {/* log out and switch dark mode */}
            <ul className='flex flex-col gap-3'>
                <li className='p-3'>
                    <div className='flex justify-start items-center lg:pl-2'>
                        <FormControlLabel
                            onChange={(e) => {
                                const isChecked = (e.target as HTMLInputElement).checked;
                                setTheme((prev) => !prev);
                                if (isChecked) {
                                    localStorage.setItem("theme", "dark");
                                    document.documentElement.classList.remove("light");
                                    document.documentElement.classList.add("dark");
                                } else {
                                    localStorage.setItem("theme", "light")
                                    document.documentElement.classList.remove("dark");
                                    document.documentElement.classList.add("light");
                                }
                                toggleTheme()

                            }}
                            checked={theme}
                            control={<MaterialUISwitch />}
                            label=""
                        />
                    </div>

                </li>
                <li className='p-3 rounded-md hover:bg-[#00376b1a] dark:hover:bg-[#e0f1ff21] transition-all duration-300 group'>
                    <button onClick={logOutHandler} className='text-base/5 flex items-center gap-3 justify-center xl:justify-start font-bold text-black dark:text-white'>
                        <div className='w-6 h-6 group-hover:scale-110 transition-all duration-300'>
                            {logOutIcon}
                        </div>
                        <span className='hidden xl:block'>Log out</span>
                    </button>
                </li>
            </ul>

            {/* new post show */}
            <NewPost newPost={newPost} setNewPost={setNewPost} />

            <ShowDialogModal
                isOpenShowLDialogModal={isShowSearch}
                setisOpenShowLDialogModal={setIsShowSearch}
                title="Search title"
                height="h-auto"
            >
                <div className="flex justify-center items-center border rounded dark:border-gray-300/20 border-gray-300">
                    <SearchBox />
                </div>
            </ShowDialogModal>
        </div>
    )
}

export default React.memo(SideBarLeft) 