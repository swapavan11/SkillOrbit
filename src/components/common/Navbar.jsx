import { Button } from "@/components/ui/button";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import NavigationHover from "../core/navbar/NavigationHover";
import React from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import ProfileDropdown from "../core/auth/ProfileDropdown";
import NavigationSm from "../core/navbar/NavigationSm";
function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <nav className=" flex h-[3.5rem] w-full items-center border-b border-richblack-700 bg-richblack-900">
      {/* Wrapper div for width */}
      {/* FOR LARGER SCREENS  */}
      <div className="mx-auto hidden w-11/12  flex-row items-center justify-between md:flex lg:w-10/12">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="h-8 w-auto" />
          </Link>
        </div>
        {/* Other pages  nav link*/}
        <div className="flex flex-row items-center gap-3 lg:gap-8">
          {NavbarLinks.map((link, index) => {
            return (
              <React.Fragment key={index}>
                {link.title !== "Catalog" ? (
                  <NavLink
                    className={({ isActive }) => {
                      return `text-[1.125rem] ${isActive ? "text-yellow-50" : "text-richblack-25 hover:text-white"}`;
                    }}
                    to={link.path}
                    key={link.title}
                  >
                    {link.title}
                  </NavLink>
                ) : (
                  <NavigationHover />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {/* Login/Logout */}
        <div className="flex items-center  gap-4">
          {/* Cart icon if logged in */}
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <ShoppingCart color="rgb(153 157 170 )" />
              {totalItems > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 -translate-y-3 translate-x-3 items-center justify-center rounded-full bg-yellow-50 text-sm font-bold text-richblack-800">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {/* Login button if logged out */}
          {token === null && (
            <Link to="/login">
              <Button
                variant="normal"
                className="border border-richblack-400 text-richblack-200"
              >
                Login
              </Button>
            </Link>
          )}
          {/* Signup button if logged out */}
          {token === null && (
            <Link to="/signup">
              <Button
                className="border border-richblack-400   text-richblack-200"
                variant="normal"
              >
                Signup
              </Button>
            </Link>
          )}
          {/* If logged in then show profile dropdown */}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
      {/* FOR SMALLER SCREENS */}
      <div className="mx-auto flex w-10/12 flex-row items-center justify-between md:hidden">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Cart icon if logged in */}
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <ShoppingCart color="rgb(153 157 170 )" />
              {totalItems > 0 && (
                <span className="absolute right-0 top-0 flex h-5 w-5 -translate-y-3 translate-x-3 items-center justify-center rounded-full bg-yellow-50 text-sm font-bold text-richblack-800">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {/* Profile dropdown */}
          {token !== null && <ProfileDropdown />}
          {/* Nav menu */}
          <NavigationSm />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
