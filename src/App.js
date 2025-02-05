import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< Updated upstream
import GlobalStyle from "./utils/GlobalStyle";
import Layout from "./pages/Layout";
import MainPage from "./pages/MainPage";
import Login from "./pages/LoginPage";
import Mypage from "./pages/Mypage";
import Join from "./pages/Join";
import WeatherDetailPage from "./pages/WetherDetailPage";
=======
import GlobalStyle from "../src/utils/GlobalStyle";
import Layout from "../src/pages/Layout";
import Login from "../src/pages/LoginPage";
import Mypage from "../src/pages/Mypage";
import Join from "../src/pages/Join";
import MainPage from "../src/pages/MainPage";
import WeatherDetailPage from "../src/pages/WetherDetailPage";
>>>>>>> Stashed changes

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/join" element={<Join />} />
            <Route path="/weatherdetailpage" element={<WeatherDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
