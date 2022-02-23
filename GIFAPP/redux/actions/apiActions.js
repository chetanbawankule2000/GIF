import {
  TrendingGif,
  SearchSuggestions,
  SearchGif,
} from '../../utils/ApiRequest';

export const trnding_gifs = () => {
  return async dispatch => {
    let res = await TrendingGif();
    dispatch({
      type: 'API/TRENDING',
      trending_data: res.data,
    });
  };
};
export const suggestion_gif = term => {
  return async dispatch => {
    let res = await SearchSuggestions(term);
    dispatch({
      type: 'API/SUGGETIONS',
      search_suggetions: res.data,
    });
  };
};
export const search_gif = term => {
  return async dispatch => {
    let res = await SearchGif(term);
    dispatch({
      type: 'API/SEARCHGIF',
      search_gif: res.data,
    });
  };
};
