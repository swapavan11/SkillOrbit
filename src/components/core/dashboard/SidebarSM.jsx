import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useSelector } from "react-redux";
import * as Icons from "react-icons/vsc";
import { LuSettings } from "react-icons/lu";
import LogoutModal from "./LogoutModal";
function DynamicIcon({ iconName }) {
  const Icon = Icons[iconName];
  return <Icon className="text-4xl md:text-xl lg:text-lg" />;
}
function SidebarSM() {
  const { user } = useSelector((state) => state.profile);
  return (
    <aside className="z-10 w-full   bg-richblack-800 text-white">
      {/* Wrapper div */}
      <div className="flex flex-col">
        {/* First group of links */}
        <div className="flex w-full flex-row justify-between">
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
                <p className="hidden md:block">{item.name}</p>
              </NavLink>
            ) : null;
          })}
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 px-8 py-2 text-[1.125rem] ${isActive && "border-l-4 border-yellow-100 bg-yellow-800"}`
            }
          >
            <LuSettings className="text-4xl md:text-xl lg:text-lg" />
            <p className="hidden md:block">Settings</p>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default SidebarSM;
