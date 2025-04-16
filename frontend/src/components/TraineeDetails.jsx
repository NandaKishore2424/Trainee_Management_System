import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TraineeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainee, setTrainee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Fetch trainee details when component mounts
  useEffect(() => {
    const fetchTrainee = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/getTrainee?id=${id}`);
        
        if (response.data.success) {
          setTrainee(response.data.trainee);
          setFormData({
            name: response.data.trainee.name,
            email: response.data.trainee.email
          });
        } else {
          setError(response.data.message || 'Failed to fetch trainee details');
        }
      } catch (err) {
        setError('Error fetching trainee: ' + (err.response?.data?.message || err.message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrainee();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const response = await axios.put(`/updateTrainee/${id}`, formData);
      
      if (response.data.success) {
        setTrainee(response.data.trainee);
        setIsEditing(false);
        setError(null);
      } else {
        setError(response.data.message || 'Failed to update trainee');
      }
    } catch (err) {
      setError('Error updating trainee: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle trainee deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this trainee?')) {
      try {
        setIsLoading(true);
        const response = await axios.delete(`/deleteTrainee/${id}`);
        
        if (response.data.success) {
          navigate('/trainees', { 
            state: { message: 'Trainee deleted successfully', type: 'success' } 
          });
        } else {
          setError(response.data.message || 'Failed to delete trainee');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Error deleting trainee: ' + (err.response?.data?.message || err.message));
        setIsLoading(false);
      }
    }
  };

  if (isLoading && !trainee) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !trainee) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-4">
        <p>{error}</p>
        <button 
          onClick={() => navigate('/trainees')} 
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          Back to trainees
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Trainee' : 'Trainee Details'}
          </h2>
          <div>
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">ID:</span>
              <span className="ml-2">{trainee?.traineeId}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Name:</span>
              <span className="ml-2">{trainee?.name}</span>
            </div>
            <div className="mb-4">
              <span className="text-gray-600 font-semibold">Email:</span>
              <span className="ml-2">{trainee?.email}</span>
            </div>
            <button
              onClick={() => navigate('/trainees')}
              className="text-blue-500 hover:text-blue-700"
            >
              Back to trainees
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraineeDetails;