import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setProfile(res.data.user);
      setPosts(res.data.posts);
    } catch (err) {
      alert('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (!profile) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>{profile.name}</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Bio:</strong> {profile.bio || 'No bio added.'}</p>

      <h3 style={{ marginTop: '30px' }}>Posts by {profile.name}</h3>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.card}>
            <p style={styles.content}>{post.content}</p>
            <p style={styles.meta}>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
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
};

export default Profile;
