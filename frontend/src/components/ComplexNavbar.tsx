import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  PlusIcon,
  UserIcon,
  HomeIcon,
  ChevronDownIcon,
  PowerIcon,
  ArrowRightOnRectangleIcon,
  Bars2Icon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { logout, userProfile } from "../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { useNavigate, Link } from "react-router-dom";

interface IProfileMenuItems {
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<
      React.SVGProps<SVGSVGElement> & { title?: string | undefined },
      "title"
    > &
      React.RefAttributes<SVGSVGElement>
  >;
  link: string;
  onClick?: () => void;
}
// profile menu component

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const avatar = user?.result?.avatar as string;

  const token = user?.token as string;
  const admin = user?.result?.isAdmin as boolean;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const profileMenuItems: IProfileMenuItems[] = [
    {
      label: "My Profile",
      icon: UserIcon,
      link: "/profile",
    },
    {
      label: "Add Recipe",
      icon: PlusIcon,
      link: "/add-recipe",
    },
    ...(admin
      ? [
          {
            label: "Add Category",
            icon: PlusIcon,
            link: "/add-category",
          },
        ]
      : []),

    {
      label: "Sign Out",
      icon: PowerIcon,
      link: "/login",
      onClick: handleLogout,
    },
  ];

  const authMenuItems: IProfileMenuItems[] = [
    {
      label: "Login",
      icon: ArrowRightOnRectangleIcon,
      link: "/login",
    },
    {
      label: "Register",
      icon: ArrowRightOnRectangleIcon,
      link: "/register",
    },
  ];

  useEffect(() => {
    if (token) dispatch(userProfile(token));
  }, [dispatch, token]);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
        >
          <Avatar
            variant='circular'
            size='sm'
            alt='candice wu'
            className='p-0.5'
            src={
              avatar
                ? avatar
                : "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className='p-1'>
        {user
          ? profileMenuItems.map(({ label, link, icon, onClick }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Link
                    to={link}
                    onClick={link === "/login" ? onClick : undefined}
                    className='font-normal'
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Link>
                </MenuItem>
              );
            })
          : authMenuItems.map(({ label, link, icon, onClick }, key) => {
              const isLastItem = key === authMenuItems.length - 1;
              return (
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Link
                    to={link}
                    onClick={link === "/login" ? onClick : undefined}
                    className='font-normal'
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Link>
                </MenuItem>
              );
            })}
      </MenuList>
    </Menu>
  );
}

// nav list menu

function NavList() {
  const { user } = useAppSelector((state) => state.auth);

  const token = user?.token as string;

  // nav list component
  const navListItems = [
    {
      label: "Recipes",
      icon: HomeIcon,
      link: "/",
    },
    ...(token
      ? [
          {
            label: "Saved Recipes",
            icon: BookmarkIcon,
            link: "/saved-recipes",
          },
        ]
      : []),
  ];

  return (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center'>
      {navListItems.map(({ label, link, icon }, key) => (
        <Link to={link} color='blue-gray' className='font-normal' key={label}>
          <MenuItem className='flex items-center gap-2 lg:rounded-full'>
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Link>
      ))}
    </ul>
  );
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className='mx-auto  p-2 lg:rounde lg:pl-6 sticky top-0 z-50'>
      <div className='relative mx-auto flex items-center text-blue-gray-900'>
        <Link to='/' className='mr-4 ml-2 cursor-pointer py-1.5 font-medium'>
          Material Tailwind
        </Link>
        <div className='absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block'>
          <NavList />
        </div>
        <IconButton
          size='sm'
          color='blue-gray'
          variant='text'
          onClick={toggleIsNavOpen}
          className='ml-auto mr-2 lg:hidden'
        >
          <Bars2Icon className='h-6 w-6' />
        </IconButton>
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className='text-blue-gray-800 '>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
