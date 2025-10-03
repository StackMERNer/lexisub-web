import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadSRT = async (formData: FormData) => {
  const response = await api.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getFlashcards = async (userId: string, limit: number = 20) => {
  const response = await api.get("/flashcards", {
    params: { userId, limit },
  });
  return response.data;
};

export const updateProgress = async (
  userId: string,
  wordId: string,
  correct: boolean
) => {
  const response = await api.post("/progress/update", {
    userId,
    wordId,
    correct,
  });
  return response.data;
};

export const getProgress = async (userId: string) => {
  const response = await api.get("/progress", {
    params: { userId },
  });
  return response.data;
};

export const getMediaSources = async () => {
  const response = await api.get("/media");
  return response.data;
};
