import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useSelector } from "react-redux";
import * as Icons from "react-icons/vsc";
import { LuSettings } from "react-icons/lu";
import LogoutModal from "./LogoutModal";
function DynamicIcon({ iconName }) {
  const Icon = Icons[iconName];
  return <Icon className="text-lg" />;
}
function Sidebar() {
  const { user } = useSelector((state) => state.profile);
  return (
    <aside className="h-full w-full border-r border-richblack-700 bg-richblack-800 py-10 text-white">
      {/* Wrapper div */}
      <div className="flex flex-col">
        {/* First group of links */}
        <div className="flex w-full flex-col">
          {sidebarLinks.map((item) => {
            return item.type === undefined || user.accountType === item.type ? (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-8 py-2 text-[1.125rem] ${isActive && "border-l-4 border-yellow-100 bg-yellow-800"}`
                }
              >
                <DynamicIcon iconName={item.icon} />
                {item.name}
              </NavLink>
            ) : null;
          })}
        </div>
        {/* Seperator */}
        <div className=" mx-auto my-8 h-[1px] w-10/12 bg-richblack-600"></div>
        {/* second group of links */}
        <div className="flex w-full flex-col gap-4">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-8 py-2 text-[1.125rem] ${isActive && "border-l-4 border-yellow-100 bg-yellow-800"}`
            }
          >
            <LuSettings className="text-lg" />
            Settings
          </NavLink>
          <LogoutModal />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
