import {Dimensions, PixelRatio, Platform} from 'react-native';
import {
  widthPercentageToDP as lwp,
  heightPercentageToDP as lhp,
} from 'react-native-responsive-screen';
import {ThemeColors} from '../styles';

const guidelineBaseWidth = 393; // Default for portrait
const guidelineBaseHeight = 852; // Default for portrait

const {width, height} = Dimensions.get('window');

// Detect if the device is an iPad
const isIpad = Platform.OS === 'ios' && Platform.isPad;

// Detect if the device is a tablet (Android)
const isTablet = Platform.OS === 'android' && Math.min(width, height) >= 600;

// Check if the device is in Landscape mode
const isLandscape = width > height;

// Adjust base values for larger screens (iPads/Tablets)
const adjustedBaseWidth = isIpad || isTablet ? 834 : guidelineBaseWidth;
const adjustedBaseHeight = isIpad || isTablet ? 1194 : guidelineBaseHeight;

// Function to calculate width percentage
const getWidthValue = (px: number) =>
  (((px * 100) / (adjustedBaseWidth * 100)) *
    (isIpad || isTablet ? 150 : 100) *
    (isLandscape ? 120 : 100)) /
  100;

// Function to calculate height percentage
const getHeightValue = (px: number) =>
  (((px * 100) / (adjustedBaseHeight * 100)) *
    (isIpad || isTablet ? 150 : 100) *
    (isLandscape ? 120 : 100)) /
  100;

const [shortDimension] = width < height ? [width, height] : [height, width];

const scalef = (size: number): number =>
  (shortDimension / adjustedBaseWidth) * size;

const moderateScale = (size: number, factor: number = 0.5): number =>
  size + (scalef(size) - size) * factor;

export const normalizeFont = (size: number): number => {
  let newSize = moderateScale(size);

  // Further adjust font size for iPads, Tablets, and Landscape mode
  if (isIpad || isTablet) {
    newSize *= 1.5; // Increase font size by 50% for better readability
  }

  if (isLandscape) {
    newSize *= 1.2; // Increase font size by 20% in landscape mode
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const wp = (px: number) => lwp(getWidthValue(px));
const hp = (px: number) => lhp(getHeightValue(px));

// Shadow configuration
export const createShadow = {
  shadowColor: ThemeColors.TextInputBorderColor,
  shadowOffset: {width: wp(0), height: hp(4)},
  shadowOpacity: 0.1,
  shadowRadius: isIpad || isTablet ? 12 : 5, // Bigger shadow for larger screens
  elevation: hp(isIpad || isTablet ? 10 : 4),
};

export default {
  wp,
  hp,
  customFontSize: normalizeFont,
  createShadow,
};
