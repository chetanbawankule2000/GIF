import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {colors} from '../constants/colors';
import {windowHeight, windowWidth} from '../constants/diamensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchResult = ({route, navigation}) => {
  //   const navigation = useNavigation();

  let {data, title} = route.params;
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
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>GIFs</Text>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={data}
        //   horizontal={true}

        //   ItemSeparatorComponent={() => Seperator()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={styles.gifContainer}>
              <Image
                key={item.id}
                source={{uri: item.images.original.url}}
                style={styles.gifImage}
                resizeMethod="auto"
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => {
          `${index} + ${item.url}`;
        }}
        numColumns={2}
      />
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 30,
    color: colors.black,
    marginTop: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: colors.black,
    marginTop: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  gifContainer: {
    flex: 1,
    height: windowWidth / 2,
    width: windowWidth / 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.white,
    marginRight: 8,
    marginBottom: 8,
    overflow: 'hidden',
    elevation: 1,
  },
  gifImage: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
  backArrow: {},
});
