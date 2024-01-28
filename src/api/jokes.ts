import { JokeResponse } from "src/interfaces/JokeResponse";

const API_BASE_URL = 'https://v2.jokeapi.dev';

// Function to fetch game data
export const getJoke = async (): Promise<JokeResponse> => {
  try {
    const categories = 'Pun';
    const blacklistFlags = 'nsfw,religious,political,racist,sexist,explicit';
    const response = await fetch(`${API_BASE_URL}/joke/${categories}?blacklistFlags=${blacklistFlags}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as JokeResponse;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
