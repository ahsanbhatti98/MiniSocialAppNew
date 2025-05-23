import React, {ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

export type CustomTouchableProps = {
  children?: ReactNode;
  toucableRef?: any;
} & TouchableOpacityProps;

export const CustomTouchable: React.FC<CustomTouchableProps> = ({
  activeOpacity,
  children,
  toucableRef,
  disabled,
  ...rest
}) => {
  return (
    <TouchableOpacity
      ref={toucableRef}
      activeOpacity={activeOpacity || 0.8}
      disabled={disabled}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};
