import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MovieDescription} from '../types/movie/movie.description';
import {Text} from 'react-native-elements';

type PropsType = {
  onPress?: () => void;
  movieDescription: MovieDescription;
  disabled?: boolean;
};

const TitleOfDescription = (props: {children?: string}) => (
  <Text style={styles.titleOfDescription}>{props.children}</Text>
);

const ValueOfDescription = (props: {children?: string | number}) => (
  <Text
    style={styles.valueOfDescription}
    numberOfLines={1}
    ellipsizeMode="tail">
    {props.children}
  </Text>
);

const MovieItem = ({movieDescription, ...props}: PropsType) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Image source={{uri: movieDescription.posterUrl}} style={styles.image} />
      <View style={styles.titlesOfSecription}>
        <TitleOfDescription>Title</TitleOfDescription>
        <TitleOfDescription>Year</TitleOfDescription>
        <TitleOfDescription>Duration</TitleOfDescription>
        <TitleOfDescription>Rating</TitleOfDescription>
      </View>
      <View style={styles.valueOfDescriptionContainer}>
        <ValueOfDescription>{movieDescription.title}</ValueOfDescription>
        <ValueOfDescription>{movieDescription.year}</ValueOfDescription>
        <ValueOfDescription>{movieDescription.duration}</ValueOfDescription>
        <ValueOfDescription>{movieDescription.rating}</ValueOfDescription>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 60,
    height: 100,
    resizeMode: 'contain',
  },
  titlesOfSecription: {
    paddingHorizontal: 20,
  },
  titleOfDescription: {
    color: '#b9b9b9',
    fontSize: 16,
  },
  valueOfDescription: {
    color: 'black',
    fontSize: 16,
  },
  valueOfDescriptionContainer: {
    maxWidth: '50%',
  },
});
