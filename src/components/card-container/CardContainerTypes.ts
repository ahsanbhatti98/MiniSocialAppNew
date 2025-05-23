import {ReactNode} from 'react';
import {TouchableOpacityProps, ViewProps} from 'react-native';

export type CardContainerProps = TouchableOpacityProps & {
  children: ReactNode;
  borderColor?: string;
  customStyles?: ViewProps['style'];
  cardContainerRef?: any;
  backgroundColor?: string;
  showSimpleView?: boolean;
  showShadow?: boolean;
};
