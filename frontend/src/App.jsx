import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReadArticle from "./pages/ReadArticle";
import CreateArticle from "./pages/CreateArticle";
import EditArticle from "./pages/EditArticle";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ReadArticle />} />
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/edit/:id" element={<EditArticle />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
