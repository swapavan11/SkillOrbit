import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
function RootLayout() {
  return (
    <div className="w-full bg-richblack-900 ">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
