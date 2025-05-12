import { useState } from 'react';
import { commentsData } from '../data/comments';
import CommentForm from '../components/CommentForm';
import './Comments.css';

function Comments() {
  const [comments, setComments] = useState(commentsData);

  const addComment = (newComment) => {
    setComments([...comments, {
      id: comments.length + 1,
      name: newComment.name,
      text: newComment.text,
      date: new Date().toISOString().split('T')[0]
    }]);
  };

  return (
    <div className="comments-page">
      <h1>Відгуки користувачів</h1>
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <h3>{comment.name}</h3>
            <p>{comment.text}</p>
            <small>{comment.date}</small>
          </div>
        ))}
      </div>
      <CommentForm onSubmit={addComment} />
    </div>
  );
}

export default Comments;