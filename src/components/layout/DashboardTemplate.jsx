import { Outlet } from "react-router-dom";
import Sidebar from "../core/dashboard/Sidebar";
import SidebarSM from "../core/dashboard/SidebarSM";
function DashboardTemplate() {
  return (
    <div className="relative w-full ">
      <div className="flex min-h-screen w-full">
        {/* Side bar for larger screens*/}
        <div className="hidden w-[250px] lg:block">
          <Sidebar />
        </div>
        {/* Required page */}
        <div className="w-full lg:w-[calc(100vw-255px)]">
          <Outlet />
        </div>
      </div>
      {/* Sidebar for smaller screens */}
      <div className="fixed bottom-0 w-full lg:hidden">
        <SidebarSM />
      </div>
    </div>
  );
}

export default DashboardTemplate;
