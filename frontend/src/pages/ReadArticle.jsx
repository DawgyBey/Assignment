import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const ReadArticle = () => {
  let params = useParams();
  let navigate = useNavigate();
  let [article, setArticle] = useState(null);

  const getArticle = async () => {
    try {
      let result = await axios({
        url: `${API_URL}/articles/${params.id}`,
        method: "get",
      });
      setArticle(result.data.result);
    } catch (error) {
      console.log("Could not load article:", error.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this article?")) {
      return;
    }
    try {
      await axios({
        url: `${API_URL}/articles/${params.id}`,
        method: "delete",
      });
      navigate("/");
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  if (article === null) {
    return <div className="empty-state">Loading...</div>;
  }

  return (
    <div className="article">
      <div className="article-header">
        <span className="badge">{article.category}</span>
        <h1>{article.title}</h1>
        <p className="article-meta">
          By {article.author} on {new Date(article.createdAt).toLocaleDateString()}
        </p>
      </div>

      {article.image ? (
        <img src={article.image} alt={article.title} className="article-img" />
      ) : null}

      <p className="article-text">{article.content}</p>

      <div className="actions">
        <button
          onClick={() => {
            navigate(`/edit/${article._id}`);
          }}
        >
          Edit
        </button>
        <button className="danger" onClick={handleDelete}>
          Delete
        </button>
        <button className="secondary" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ReadArticle;
