import { Route, Routes } from "react-router-dom"
import GDPPage from "./pages/GDPPage";
import LatestNewsPage from "./pages/LatestNewsPage";

const PageRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<LatestNewsPage />} />
          <Route path="/gdp" element={<GDPPage />} />
        </Routes>
      )
}

export default PageRoutes;