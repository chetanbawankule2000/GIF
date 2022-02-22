import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Trending(props) {
  const navigation = useNavigation();
  let gif = props.gif;

  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={gif}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={styles.trndingContainer}
            onPress={() => navigation.navigate('GifDetails', {data: item})}>
            <Image
              key={item.id}
              source={{uri: item.images.original.url}}
              style={styles.trndingImage}
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
  );
}

const styles = StyleSheet.create({
  trndingContainer: {
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
  trndingImage: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
});
