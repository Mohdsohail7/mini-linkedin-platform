import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
      toast.error('Failed to load posts');
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
      toast.error(err.response?.data?.message || 'Error creating post');
    }
  };

  // delete a post
  const handleDelete = async (postId) => {
  try {
    await API.delete(`/posts/${postId}`);
    setPosts(posts.filter((p) => p._id !== postId));
  } catch (err) {
    toast.error('Error deleting post');
  }
};

  return (
    <div style={styles.wrapper}>
      <h2>Community Feed</h2>

      {token ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.postButton}>Post</button>
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
  wrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
    marginBottom: '12px',
    boxSizing: 'border-box',
  },
  postButton: {
    width: '100%',
    backgroundColor: '#0073b1',
    color: 'white',
    padding: '10px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
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
