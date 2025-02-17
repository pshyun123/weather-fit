import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./utils/GlobalStyle";
import Layout from "./pages/Layout";
import MainPage from "./pages/MainPage";
import Login from "./pages/LoginPage";
import Mypage from "./pages/Mypage";
import Join from "./pages/Join";
import WeatherDetailPage from "./pages/WetherDetailPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/weatherdetailpage" element={<WeatherDetailPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
