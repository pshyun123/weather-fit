import { Outlet } from "react-router-dom";
import Header from "../component/layout/Header";
const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* 여기서 중첩된 라우트 렌더링 */}
      </main>
      <footer>Footer 부분</footer>
    </div>
  );
};

export default Layout;
