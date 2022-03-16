import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';

type PropsType = {
  onPress: () => void;
  uri?: string;
};

const TrailerPreview = (props: PropsType) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={props.onPress}>
      <Image source={{uri: props.uri}} style={styles.image} />
      <View style={styles.play}>
        <FontAwesomeIcon icon={faPlay} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default TrailerPreview;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  play: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
