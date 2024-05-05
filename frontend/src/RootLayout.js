import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SidebarLeft from "./components/sidebarLeft/SidebarLeft";
//import Footer from "./components/footer/Footer";

//import SidebarRight from "./components/sidebarRight/SidebarRight";


function RootLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <SidebarLeft />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;