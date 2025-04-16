import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../services/auth.service';
import authHeader from '../services/auth-header';

const Home = () => {
  const [trainees, setTrainees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for authenticated user and load their data
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  // Load trainees on component mount and when location changes
  useEffect(() => {
    // Check for messages passed from other components via navigation state
    if (location.state?.message) {
      setMessage({
        text: location.state.message,
        type: location.state.type || 'success'
      });
      
      // Clear the location state to prevent message from showing again on refresh
      navigate(location.pathname, { replace: true });
      
      // Auto-dismiss the message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    
    if (currentUser) {
      fetchTrainees();
    }
  }, [location, navigate, currentUser]);

  const fetchTrainees = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/trainees', { headers: authHeader() });
      
      if (response.data.success) {
        setTrainees(response.data.trainees || []);
      } else {
        setError('Failed to fetch trainees');
      }
    } catch (err) {
      setError('Error fetching trainees: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainee?')) {
      try {
        const response = await axios.delete(`/deleteTrainee/${id}`);
        
        if (response.data.success) {
          setMessage({
            text: 'Trainee deleted successfully',
            type: 'success'
          });
          
          // Refresh the list
          fetchTrainees();
        } else {
          setMessage({
            text: response.data.message || 'Failed to delete trainee',
            type: 'error'
          });
        }
      } catch (err) {
        setMessage({
          text: 'Error deleting trainee: ' + (err.response?.data?.message || err.message),
          type: 'error'
        });
      }
    }
  };

  if (!currentUser) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trainee Dashboard</h1>
          <p className="text-gray-600">Welcome, {currentUser.username}!</p>
        </div>
        
        {/* Only show Add button for authenticated users */}
        {currentUser && (
          <Link 
            to="/add-trainee" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add New Trainee
          </Link>
        )}
      </div>
      
      {/* Notification messages */}
      {message && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
          }`}
        >
          <p>{message.text}</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : trainees.length === 0 ? (
        <div className="bg-gray-100 p-8 rounded text-center">
          <p className="text-gray-600 text-xl mb-4">No trainees found.</p>
          {currentUser.roles && 
           (currentUser.roles.includes('ROLE_ADMIN') || 
            currentUser.roles.includes('ROLE_HR')) && (
            <Link to="/add-trainee" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2 inline-block">
              Add your first trainee
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trainees.map((trainee) => (
                <tr key={trainee.traineeId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{trainee.traineeId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{trainee.name || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{trainee.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/trainees/${trainee.traineeId}`} 
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </Link>
                    
                    {/* Only show Edit/Delete for authenticated users */}
                    {currentUser && (
                      <>
                        <Link 
                          to={`/trainees/${trainee.traineeId}/edit`}>Edit</Link>
                        <button onClick={() => handleDelete(trainee.traineeId)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;