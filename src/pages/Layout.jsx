import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>Header 부분</header>
      <main>
        <Outlet /> {/* 여기서 중첩된 라우트 렌더링 */}
      </main>
      <footer>Footer 부분</footer>
    </div>
  );
};

export default Layout;
