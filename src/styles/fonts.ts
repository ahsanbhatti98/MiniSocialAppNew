import {Platform} from 'react-native';

const ENFonts =
  Platform.OS === 'android'
    ? {
        BlackBold: 'SF-Pro-Display-Black',
        Bold: 'SF-Pro-Display-Bold',
        SemiBold: 'SF-Pro-Display-Semibold',
        Regular: 'SF-Pro-Display-Regular',
        Medium: 'SF-Pro-Display-Medium',
        LightItalic: 'SF-Pro-Display-LightItalic',
        Light: 'SF-Pro-Display-Light',
      }
    : {
        BlackBold: 'SFProDisplay-Black',
        Bold: 'SFProDisplay-Bold',
        SemiBold: 'SFProDisplay-Semibold',
        Regular: 'SFProDisplay-Regular',
        Medium: 'SFProDisplay-Medium',
        LightItalic: 'SFProDisplay-LightItalic',
        Light: 'SFProDisplay-Light',
      };

export {ENFonts};
export default ENFonts;
