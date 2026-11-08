import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import ArticleForm from "../components/ArticleForm";

const CreateArticle = () => {
  let navigate = useNavigate();

  let emptyArticle = {
    title: "",
    author: "",
    category: "General",
    image: "",
    content: "",
  };

  const createArticle = async (data) => {
    try {
      let result = await axios({
        url: `${API_URL}/articles`,
        method: "post",
        data: data,
      });
      navigate(`/article/${result.data.result._id}`);
    } catch (error) {
      alert("Could not create article: " + error.message);
    }
  };

  return (
    <div>
      <header className="page-header">
        <h1>Write an article</h1>
      </header>
      <ArticleForm
        initialData={emptyArticle}
        onSave={createArticle}
        buttonText="Publish"
      />
    </div>
  );
};

export default CreateArticle;
