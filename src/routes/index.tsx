import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../components/templates/layout";
import Detail from "../pages/detail";

export const RoutePath = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="note/:id" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <RoutePath />
    </BrowserRouter>
  );
};

export default Router;
