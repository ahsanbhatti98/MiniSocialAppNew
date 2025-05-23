import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageProps,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {CustomImage} from '../custom-image';

export type FadeInImageProps = {
  source: ImageProps['source'];
  resizeMode?: ImageProps['resizeMode'];
  customImageContainerStyle?: ViewStyle;
  imageStyles?: ImageStyle;
};

export const FadeInImage: React.FC<FadeInImageProps> = ({
  source,
  resizeMode = 'contain',
  customImageContainerStyle,
  imageStyles,
}) => {
  const [isLoad, setIsLoad] = useState(false);
  const {AppTheme} = useTheme();

  const fadeAnim = useRef(new Animated.Value(0))?.current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={customImageContainerStyle}>
      {isLoad && <ActivityIndicator size={'small'} color={AppTheme.Primary} />}

      {/* // Need to test this one \/ */}
      {/* {!isLoad && (
        <Animated.Image
          source={source}
          style={[
            {
              opacity: fadeAnim,
              width: "100%", // Adjust the size as needed
              height: "100%",
            },
            imageStyles,
          ]}
          resizeMode={resizeMode}
          onLoadStart={() => setIsLoad(true)}
          onLoadEnd={() => setIsLoad(false)}
          // onLoad={() => setIsLoad(false)}
        />
      )} */}

      <CustomImage
        source={source}
        style={[styles.imageStyle, imageStyles]}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoad(true)}
        onLoadEnd={() => setIsLoad(false)}
        // onLoad={() => setIsLoad(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    // opacity: fadeAnim,
    width: '100%', // Adjust the size as needed
    height: '100%',
  },
});
