import React from 'react';
import {ViewStyle} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const MovieItemSceleton = ({...props}: ViewStyle) => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        width={'100%'}
        height={100}
        borderRadius={15}
        {...props}
      />
    </SkeletonPlaceholder>
  );
};

export default MovieItemSceleton;
