import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type PropsType = {
  children?: string | number;
};

const CommentItem = ({children}: PropsType) => {
  return (
    <View style={styles.item}>
      <Text style={styles.textStyle}>{children}</Text>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#cccccc',
    borderRadius: 10,
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  textStyle: {
    color: 'black',
  },
});
