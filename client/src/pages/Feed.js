import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (err) {
      alert('Failed to load posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/posts', { content });
      setContent('');
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating post');
    }
  };

  // delete a post
  const handleDelete = async (postId) => {
  try {
    await API.delete(`/posts/${postId}`);
    setPosts(posts.filter((p) => p._id !== postId));
  } catch (err) {
    alert('Error deleting post');
  }
};

  return (
    <div className="container">
      <h2>Community Feed</h2>

      {token ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
          />
          <button type="submit">Post</button>
        </form>
      ) : (
        <p style={{ color: '#555' }}>Login to create a post.</p>
      )}

      {posts.map((post) => (
        <div key={post._id} style={styles.card}>
          <p style={styles.content}>{post.content}</p>
          <p style={styles.meta}>
            <strong>{post.author?.name || 'Unknown'}</strong> ·{' '}
            {new Date(post.createdAt).toLocaleString()}
          </p>
          {post.author?._id === user?.id && (
            <button onClick={() => handleDelete(post._id)} style={styles.deleteBtn}>Delete</button>
            )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  content: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  meta: {
    fontSize: '14px',
    color: '#777',
  },
  deleteBtn: {
  backgroundColor: '#ff4d4f',
  color: '#fff',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '8px'
}

};

export default Feed;
