import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/APIs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function NavigationHover() {
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
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="text-[1.125rem] text-richblack-25 hover:text-richblack-5">
          <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex w-[14rem] flex-col bg-white px-2 py-4">
              {!loading &&
                data &&
                data.length &&
                data.map((category) => {
                  return (
                    <Link to={`/catalog/${category._id}`} key={category._id}>
                      <p className="cursor-pointer rounded-md p-3 hover:bg-richblack-100">
                        {category.name}
                      </p>
                    </Link>
                  );
                })}
              {loading && (
                <p className="text-center text-richblack-700">Loading...</p>
              )}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavigationHover;
