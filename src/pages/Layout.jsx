import { Outlet } from "react-router-dom";
import Header from "../component/layout/Header";
import Footer from "../component/layout/Footer";
const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* 여기서 중첩된 라우트 렌더링 */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
