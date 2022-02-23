import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {windowWidth} from '../constants/diamensions';
import {colors} from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchSuggestions, SearchGif} from '../utils/ApiRequest';
import {search_gif} from '../redux/actions/apiActions';
import {useDispatch} from 'react-redux';

const GifDetail = ({route, navigation}) => {
  const dispatch = useDispatch();

  const [related, setRelated] = useState([]);
  let {data} = route.params;

  const getRelatedSearch = async text => {
    let res = await SearchSuggestions(text);
    setRelated(res.data);
  };
  useEffect(() => {
    getRelatedSearch(data.title);
  }, []);

  const suggetionDetail = async term => {
    dispatch(search_gif(term));
    navigation.navigate('SearchedResult', {title: term});
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back"
          color={colors.black}
          size={24}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{data.title}</Text>
      <ScrollView>
        <View style={styles.gifView}>
          <Image
            style={styles.gifImage}
            source={{uri: data.images.original.url}}
          />
        </View>
        <View style={styles.suggetionView}>
          {related.length !== 0
            ? related.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.suggestion}
                    onPress={() => suggetionDetail(item.name)}>
                    <Text style={styles.suggestionText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default GifDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingLeft: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    marginBottom: 16,
    marginTop: 16,
    fontWeight: 'bold',
  },
  gifView: {
    width: windowWidth - 50,
    height: windowWidth,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.white,
    backgroundColor: colors.black,
    elevation: 1,
  },
  gifImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
  },
  suggetionView: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestion: {
    padding: 10,
    marginBottom: 5,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    elevation: 1,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    marginRight: 12,
  },
  suggestionText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
