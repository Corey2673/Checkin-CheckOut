// src/components/FaceLogin.js
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceLogin = () => {
  const videoRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState("");
  const [username, setUsername] = useState("");
  const [storedUsers, setStoredUsers] = useState([]);
  const [videoRunning, setVideoRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();

    // Load stored users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setStoredUsers(users);
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setVideoRunning(true);
      })
      .catch((err) => console.error("Error accessing webcam", err));
  };

  const stopVideo = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setVideoRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleVideoPlay = () => {
    intervalRef.current = setInterval(async () => {
      if (!modelsLoaded) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length > 0) {
        const detectedDescriptor = detections[0].descriptor;

        const match = storedUsers.find((user) => {
          const storedDescriptor = new Float32Array(user.descriptor);
          const distance = faceapi.euclideanDistance(
            detectedDescriptor,
            storedDescriptor
          );
          return distance < 0.6; // Threshold for matching
        });

        if (match) {
          setIsAuthenticated(true);
          setAuthenticatedUser(match.username);
          stopVideo();
        }
      }
    }, 100);
  };

  const handleRegisterFace = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }

    if (!modelsLoaded) {
      alert("Please wait for models to finish loading");
      return;
    }

    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detections) {
      const descriptor = Array.from(detections.descriptor);
      const newUser = { username, descriptor };
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setStoredUsers(updatedUsers);
      alert("Face registered successfully!");
    } else {
      alert("No face detected. Please try again.");
    }
  };

  useEffect(() => {
    if (modelsLoaded) {
      startVideo();
    }
  }, [modelsLoaded]);

  return (
    <div>
      <h1 className="text-white text-7xl">
        {isAuthenticated
          ? `Authenticated: ${authenticatedUser}`
          : "Not Authenticated"}
      </h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <video
        ref={videoRef}
        onPlay={handleVideoPlay}
        autoPlay
        muted
        width="720"
        height="560"
      />
      <button onClick={handleRegisterFace}>Register Face</button>
      <button onClick={videoRunning ? stopVideo : startVideo}>
        {videoRunning ? "Stop Video" : "Start Video"}
      </button>
    </div>
  );
};

export default FaceLogin;
