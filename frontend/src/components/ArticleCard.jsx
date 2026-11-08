import { useNavigate } from "react-router-dom";

const ArticleCard = ({ _id, title, author, category, image, content }) => {
  let navigate = useNavigate();

  return (
    <div className="card">
      {image ? (
        <img src={image} alt={title} className="card-img" />
      ) : (
        <div className="card-img no-img">No image</div>
      )}

      <div className="card-body">
        <div className="meta">
          <span className="badge">{category}</span>
          <span className="small">By {author}</span>
        </div>

        <h3>{title}</h3>
        <p>{content.slice(0, 100)}...</p>

        <div className="card-footer">
          <span className="small">Read story</span>
          <button
            className="secondary"
            onClick={() => {
              navigate(`/article/${_id}`);
            }}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
