import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { uperCaseFirstLetter } from "../../utils";
import { logout } from "../../redux/feature/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const avatar = user?.result?.avatar;
  const token = user?.token;
  const admin = user?.result?.isAdmin;

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  // profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Add New Recipe",
      icon: RocketLaunchIcon,
    },
    {
      label: "Add New Category",
      icon: CubeTransparentIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];
  // admin profile menu component
  const adminProfileMenuItems = [
    {
      label: "My Profile",
      to: "/profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      to: "/profile/edit",
      icon: Cog6ToothIcon,
    },
    {
      label: "Add New Recipe",
      to: "/add-recipe",
      icon: RocketLaunchIcon,
    },
    {
      label: "Add New Category",
      to: "/add-category",
      icon: CubeTransparentIcon,
    },
    {
      label: "Sign Out",
      to: "/login",
      icon: PowerIcon,
      onClick: handleLogout,
    },
  ];

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
            className='border p-0.5'
            src={avatar}
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
        {admin
          ? adminProfileMenuItems.map(({ label, to, icon, onClick }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <Link to={to} onClick={onClick}>
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
                    <Typography
                      as='span'
                      variant='small'
                      className='font-normal'
                      color={isLastItem ? "red" : "inherit"}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                </Link>
              );
            })
          : profileMenuItems.map(({ label, icon }, key) => {
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
                  <Typography
                    as='span'
                    variant='small'
                    className='font-normal'
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              );
            })}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
