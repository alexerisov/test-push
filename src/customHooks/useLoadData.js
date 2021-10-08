import { useActions } from "@/customHooks/useActions";
import { useState } from "react";

// req - action creator of request
// if req is object of action creator, provide action creator name
export const useLoadData = (req, reqName) => {
  if (!req) {
    throw new Error('Please provide request callback!');
  }

  if (typeof req === 'object' && !reqName) {
    throw new Error('Please provide name of request');
  }

  const dispatchedRequest = reqName ? useActions(req)[reqName] : useActions(req);

  const [status, setStatus] = useState({
    isLoading: false,
    responseData: null,
    error: null
  });

  const patchDataNow = async (data) => {
    return new Promise((resolve, reject) => {
      setStatus({
        ...status,
        isLoading: true
      });

      dispatchedRequest(data)
        .then(response => {
          setStatus({
            ...status,
            isLoading: false,
            responseData: response
          });
          resolve(response);
        })
        .catch(error => {
          setStatus({
            ...status,
            isLoading: false,
            error: error.message
          });
          console.error(error);
          reject(error);
        });
    });
  };

  return {...status, patchDataNow};
};
