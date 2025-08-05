import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import API from '../utils/api';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', bio: '' });

  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setProfile(res.data.user);
      setPosts(res.data.posts);
      setEditForm({
        name: res.data.user.name,
        bio: res.data.user.bio || '',
      });
    } catch (err) {
      toast.error('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/users/${id}`, editForm);
      toast.success('Profile updated successfully');
      setEditing(false);
      fetchProfile();
      if (loggedInUser?.id === id) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (!profile) return <div className="container">Loading...</div>;

  const isOwnProfile = loggedInUser?.id === id;

  const handleDelete = async (postId) => {
  try {
    await API.delete(`/posts/${postId}`);
    setPosts(posts.filter((p) => p._id !== postId));
  } catch (err) {
    toast.error('Error deleting post');
  }
};


  return (
    <div className="container">
      <h2>Profile</h2>

      {editing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            value={editForm.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="bio"
            rows="4"
            value={editForm.bio}
            onChange={handleChange}
            placeholder="Bio"
          ></textarea>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Bio:</strong> {profile.bio || 'No bio added.'}</p>
          {isOwnProfile && (
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          )}
        </>
      )}

      <h3 style={{ marginTop: '30px' }}>Posts by {profile.name}</h3>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={styles.card}>
            <p style={styles.content}>{post.content}</p>
            <p style={styles.meta}>{new Date(post.createdAt).toLocaleString()}</p>
            {isOwnProfile && (
                <button onClick={() => handleDelete(post._id)} style={styles.deleteBtn}>Delete</button>
                )}
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

export default Profile;
