import { NavbarLinks } from "../../../data/navbar-links";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/APIs";
import { useEffect, useState } from "react";
function NavigationSm() {
  //local states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { CATEGORIES_API } = categories;
  //making api request
  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await apiConnector("GET", CATEGORIES_API);
      if (result) {
        setData(result?.data?.data);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <RxHamburgerMenu className="text-xl text-richblack-200" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        aside="center"
        className="border border-richblack-700 bg-richblack-800 text-richblack-100"
      >
        {NavbarLinks.map((item, index) => {
          return (
            <React.Fragment key={item.title}>
              {item.title !== "Catalog" ? (
                <DropdownMenuItem className="cursor-pointer text-richblack-25 data-[highlighted]:bg-richblack-600 data-[highlighted]:text-richblack-5">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => {
                      return isActive
                        ? "block w-full text-yellow-100"
                        : "block w-full";
                    }}
                  >
                    {" "}
                    {item.title}
                  </NavLink>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuSub className="border border-richblack-700 bg-richblack-800 text-richblack-100">
                  <DropdownMenuSubTrigger className="cursor-pointer text-richblack-25 data-[highlighted]:bg-richblack-600 data-[state=open]:bg-richblack-600 data-[highlighted]:text-richblack-5">
                    Catalog
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="border border-richblack-700 bg-richblack-800 text-richblack-100">
                      {!loading &&
                        data &&
                        data.length &&
                        data.map((category, index) => {
                          return (
                            <React.Fragment key={category._id}>
                              <DropdownMenuItem className="cursor-pointer text-richblack-25 data-[highlighted]:bg-richblack-600 data-[highlighted]:text-richblack-5">
                                <NavLink
                                  className={({ isActive }) => {
                                    return isActive ? "text-yellow-100" : "";
                                  }}
                                  to={`/catalog/${category._id}`}
                                >
                                  <p>{category.name}</p>
                                </NavLink>
                              </DropdownMenuItem>
                              {index !== data.length - 1 && (
                                <DropdownMenuSeparator className="bg-richblack-700" />
                              )}
                            </React.Fragment>
                          );
                        })}
                      {loading && (
                        <p className="text-center text-richblack-700">
                          Loading...
                        </p>
                      )}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )}

              {index !== NavbarLinks.length - 1 && (
                <DropdownMenuSeparator className="bg-richblack-700" />
              )}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavigationSm;
