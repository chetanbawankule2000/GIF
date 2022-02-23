const initialState = {
  Trending: {
    loading: true,
    trending_data: [],
  },
  SearchSuggetions: {
    loading: true,
    search_suggetions: [],
  },
  SearchGif: {
    loading: true,
    search_gif: [],
  },
};

// reducer takes in actions and state and 'modifies' the state and returns it
const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'API/TRENDING':
      return {
        ...state,
        Trending: {
          loading: false,
          trending_data: action.trending_data,
        },
      };
    case 'API/SUGGETIONS':
      return {
        ...state,
        SearchSuggetions: {
          loading: false,
          search_suggetions: action.search_suggetions,
        },
      };
    case 'API/SEARCHGIF':
      return {
        ...state,
        SearchGif: {
          loading: false,
          search_gif: action.search_gif,
        },
      };

    default:
      return state;
  }
};

export default apiReducer;
