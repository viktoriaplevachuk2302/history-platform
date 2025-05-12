import { useState } from 'react';
import './CommentForm.css';

function CommentForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && text) {
      onSubmit({ name, text });
      setName('');
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Залишити відгук</h3>
      <div className="form-group">
        <label>Ім'я:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Коментар:</label>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Відправити</button>
    </form>
  );
}

export default CommentForm;