import React, {FC} from 'react';
import {
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';
import {FadeInImage, FadeInImageProps} from '../fade-in-image';

export type RoundImageContainerProps = FadeInImageProps & {
  circleWidth?: number;
  backgroundColor?: string;
  borderRadius?: number | null;
  borderColor?: string;
  borderWidth?: number;
  styles?: ViewStyle;
  customContainerStyle?: ViewStyle;
  customImageStyles?: ViewStyle;
  imageStyle?: ImageStyle;
  defaultSource?: any;
  isEdit?: boolean;
  PressPencil?: () => void;
  onImagePress?: () => void;
};

export const RoundImageContainer: FC<RoundImageContainerProps> = ({
  source,
  circleWidth = 100,
  backgroundColor,
  borderRadius = null,
  borderColor,
  borderWidth = StyleSheet.hairlineWidth,
  styles = {},
  customContainerStyle = {},
  imageStyle,
  isEdit = false,
  PressPencil,
  resizeMode = 'cover',
  onImagePress,
}) => {
  const {AppTheme} = useTheme();
  return (
    <View style={[{alignItems: 'center'}, customContainerStyle]}>
      <TouchableOpacity
        onPress={onImagePress}
        activeOpacity={0.7}
        style={{
          width: SD.wp(circleWidth),
          backgroundColor: backgroundColor || AppTheme.Transparent,
          height: SD.wp(circleWidth),
          borderRadius: borderRadius
            ? SD.wp(borderRadius)
            : SD.wp(circleWidth / 2),
          borderColor: borderColor || AppTheme.Primary,
          borderWidth: borderWidth,
          // overflow: 'hidden',
          // borderWidth: 1,
          position: 'relative',
          ...styles,
        }}>
        <FadeInImage
          source={source}
          resizeMode={resizeMode}
          customImageContainerStyle={{width: '100%', height: '100%'}}
          imageStyles={imageStyle}
        />
        {isEdit && (
          <TouchableOpacity
            style={[
              style.pencil,
              {
                borderRadius: SD.wp(circleWidth / 2),
              },
            ]}
            onPress={PressPencil}>
            {/* <Image
              source={Images.Pencil}
              style={{
                width: "90%",
                height: "90%",
              }}
            /> */}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pencil: {
    position: 'absolute',
    top: 8,
    right: 0,
    width: SD.hp(20),
    height: SD.hp(20),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    zIndex: 100,
  },
});
