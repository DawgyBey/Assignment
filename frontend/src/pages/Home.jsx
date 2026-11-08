import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import ArticleCard from "../components/ArticleCard";

const categories = [
  "All",
  "General",
  "Sports",
  "Technology",
  "Politics",
  "Entertainment",
];

const Home = () => {
  let [articles, setArticles] = useState([]);
  let [category, setCategory] = useState("All");

  const getArticles = async () => {
    try {
      let url = `${API_URL}/articles`;
      if (category !== "All") {
        url = url + `?category=${category}`;
      }
      let result = await axios({ url: url, method: "get" });
      setArticles(result.data.result);
    } catch (error) {
      console.log("Could not load articles:", error.message);
    }
  };

  useEffect(() => {
    getArticles();
  }, [category]);

  return (
    <div>
      <header className="page-header">
        <h1>Latest stories</h1>
        <p className="page-subtitle">Curated reads for the week.</p>
      </header>

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={category === c ? "active" : ""}
            onClick={() => {
              setCategory(c);
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="empty-state">No articles found.</div>
      ) : (
        <div className="grid">
          {articles.map((item) => (
            <ArticleCard key={item._id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
