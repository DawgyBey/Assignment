import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import ArticleForm from "../components/ArticleForm";

const EditArticle = () => {
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

  useEffect(() => {
    getArticle();
  }, []);

  const updateArticle = async (data) => {
    try {
      await axios({
        url: `${API_URL}/articles/${params.id}`,
        method: "patch",
        data: data,
      });
      navigate(`/article/${params.id}`);
    } catch (error) {
      alert("Could not update article: " + error.message);
    }
  };

  if (article === null) {
    return <div className="empty-state">Loading...</div>;
  }

  return (
    <div>
      <header className="page-header">
        <h1>Edit article</h1>
      </header>
      <ArticleForm
        initialData={article}
        onSave={updateArticle}
        buttonText="Save Changes"
      />
    </div>
  );
};

export default EditArticle;
