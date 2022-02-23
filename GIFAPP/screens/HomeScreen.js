import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Trending from '../components/Trending';
import {
  TrendingGif,
  RandomGif,
  SearchSuggestions,
  SearchGif,
} from '../utils/ApiRequest';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {colors} from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {windowHeight, windowWidth} from '../constants/diamensions';
import {
  search_gif,
  suggestion_gif,
  trnding_gifs,
} from '../redux/actions/apiActions';
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(trnding_gifs());
  }, []);

  const TRENDING_GIF = useSelector(state => state.apidata.Trending);
  const SUGGETIONS_GIF = useSelector(stae => stae.apidata.SearchSuggetions);
  const SEARCHED_GIF = useSelector(state => state.apidata.SearchGif);
  const [searchText, setSearchText] = useState('');
  const [textInputBorderColor, setTextInputBorderColor] = useState(
    colors.white,
  );
  const [textInputElevation, setTextInputElevation] = useState(1);
  const [showTrending, setShowTrending] = useState(true);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSearchText('');
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const searchSuggestions = async term => {
    dispatch(suggestion_gif(term));
  };

  const searchGif = async text => {
    setShowTrending(false);
    setShowList(false);
    setSearchText(text);
    dispatch(search_gif(text));
    navigation.navigate('SearchedResult', {
      title: text,
    });
  };

  return (
    <View style={styles.homeContainer}>
      <View
        style={[
          styles.searchBar,
          {borderColor: textInputBorderColor, elevation: textInputElevation},
        ]}>
        <TextInput
          placeholder="Search Gif..."
          placeholderTextColor={colors.grey}
          style={styles.searchTextInput}
          onFocus={() => {
            setTextInputBorderColor(colors.black);
            setTextInputElevation(0);
          }}
          value={searchText}
          onChangeText={value => {
            setShowList(true);
            setSearchText(value);
            searchSuggestions(value);
          }}
        />
        <TouchableOpacity onPress={() => searchGif(searchText)}>
          <Icon name="search" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
      <View>
        {!SUGGETIONS_GIF.loading && searchText.length !== 0 && showList ? (
          <FlatList
            data={SUGGETIONS_GIF.search_suggetions}
            style={styles.suggestionContainer}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => searchGif(item.item.name)}>
                  <Text style={styles.sugestionText}>{item.item.name}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => `${item.name}`}
          />
        ) : null}
      </View>
      <View>
        <Text style={styles.title}>Trending GIFs</Text>
        {!TRENDING_GIF.loading ? (
          <Trending gif={TRENDING_GIF.trending_data} />
        ) : (
          <ActivityIndicator
            size={'large'}
            style={{alignSelf: 'center', justifyContent: 'center'}}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    marginBottom: 16,
    marginTop: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth - 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    overflow: 'hidden',
  },
  searchTextInput: {
    flex: 1,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: colors.black,
    fontWeight: 'normal',
  },
  suggestionContainer: {
    width: '100%',
    borderWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: -10,
    borderTopWidth: 0,
    padding: 10,
  },
  sugestionText: {
    // flex: 1,
    color: colors.black,
    fontSize: 18,
    fontWeight: 'normal',
    marginVertical: 4,
  },
});
