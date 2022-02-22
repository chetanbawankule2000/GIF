import axios from 'axios';
import {GIPHY_API_KEY} from '@env';
const TRENDING_URL = 'https://api.giphy.com/v1/gifs/trending';
const RANDOM_URL = 'https://api.giphy.com/v1/gifs/random';
const SEARCH_SUGGESTIONS = 'https://api.giphy.com/v1/tags/related/';
const SEARCH_GIF = 'https://api.giphy.com/v1/gifs/search';

export const TrendingGif = async () => {
  try {
    let response = await axios.get(TRENDING_URL, {
      params: {
        api_key: GIPHY_API_KEY,
      },
    });
    return response.data;
  } catch (err) {}
};

export const RandomGif = async () => {
  try {
    let response = await axios.get(RANDOM_URL, {
      params: {
        api_key: GIPHY_API_KEY,
      },
    });
    return response.data;
  } catch (err) {}
};

export const SearchSuggestions = async term => {
  try {
    let response = await axios.get(`${SEARCH_SUGGESTIONS}${term}`, {
      params: {
        api_key: GIPHY_API_KEY,
      },
    });
    return response.data;
  } catch (err) {}
};
export const SearchGif = async term => {
  try {
    let response = await axios.get(SEARCH_GIF, {
      params: {
        api_key: GIPHY_API_KEY,
        q: term,
      },
    });
    return response.data;
  } catch (err) {}
};
