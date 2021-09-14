import { useState, useEffect } from 'react';

export const useFetch = ({ request, initialValue = null, query='' }) => {
  if (!request) {
    throw new Error('Please provide callback for GET request!');
  }

  const [status, setStatus] = useState({
    isLoading: false,
    data: initialValue,
    error: null
  });

  const fetchDataNow = (query) => {
    setStatus({
      ...status,
      isLoading: true
    });

    request(query)
      .then(response => setStatus({
        ...status,
        isLoading: false,
        data: response.data
      }))
      .catch(error => {
        setStatus({
          ...status,
          error: error.message,
          isLoading: false
        });
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDataNow(query);
  }, []);

  return {...status, fetchDataNow};
};
