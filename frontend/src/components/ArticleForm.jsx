import { useState } from "react";

// One form used by BOTH the Create page and the Edit page.
// props:
//   initialData -> starting values (empty for create, filled for edit)
//   onSave      -> a function from the parent that runs when form is submitted
//   buttonText  -> the text on the submit button
const ArticleForm = ({ initialData, onSave, buttonText }) => {
  // one useState per field (controlled inputs)
  let [title, setTitle] = useState(initialData.title);
  let [author, setAuthor] = useState(initialData.author);
  let [category, setCategory] = useState(initialData.category);
  let [image, setImage] = useState(initialData.image);
  let [content, setContent] = useState(initialData.content);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading

    // simple validation
    if (!title || !author || !content) {
      alert("Title, author and content are required");
      return;
    }

    // send all values up to the parent
    onSave({ title, author, category, image, content });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />

      <label>Author</label>
      <input
        type="text"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="General">General</option>
        <option value="Sports">Sports</option>
        <option value="Technology">Technology</option>
        <option value="Politics">Politics</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      <label>Image link (optional)</label>
      <input
        type="text"
        value={image}
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />

      <label>Content</label>
      <textarea
        rows="8"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default ArticleForm;
