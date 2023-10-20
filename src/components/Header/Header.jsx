import React from 'react'
import './header.css'
import logo from '../../assets/favicon-dark.png'
import { Link } from 'react-router-dom'
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"

                className="p-1 font-medium text-slate-300"
            >
                <Link to="/" className="flex items-center hover:bg-gray py-2 px-3 rounded transition-colors">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"

                className="p-1 font-medium text-slate-300"
            >
                <Link to="/contact" className="flex items-center hover:bg-gray py-2 px-3 rounded transition-colors">
                    Contact
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"

                className="p-1 font-medium text-slate-300"
            >
                <Link to="https://www.mabsrencode.com" target='_blank' className="flex items-center hover:bg-gray py-2 px-3 rounded transition-colors">
                    Official Website
                </Link>
            </Typography>

        </ul>
    );
}


const Header = () => {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    return (
        <>
            <header>
                <Navbar className="bg-blue-dark mx-auto max-w-screen-xl px-6 py-3 mb-28">
                    <div className="flex items-center justify-between text-slate-300">
                        <Typography
                            as={Link}
                            to="/"
                            variant="h6"
                            className="mr-4 cursor-pointer py-1.5"
                        >
                            <div className='h-14 flex justify-center items-center gap-4'><img src={logo} alt="logo" className='w-40px h-40px' /><h1>Project Repositories</h1></div>
                        </Typography>

                        <div className='logo'></div>
                        <div className="hidden lg:block">
                            <NavList />
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                            ) : (
                                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                            )}
                        </IconButton>
                    </div>
                    <Collapse open={openNav}>
                        <NavList />
                    </Collapse>
                </Navbar>
            </header>
        </>

    )
}

export default Header