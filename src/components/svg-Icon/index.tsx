import React from 'react';
import {SvgProps} from 'react-native-svg';
import {SvgIcons} from '@src/config/svgs/index';
import {SD} from '@src/utils/index';
import {SvgIconName} from '@src/config/index';

interface Props extends SvgProps {
  name: SvgIconName;
  size?: number;
}
export const SvgIcon: React.FC<Props> = ({name, size = 20, ...rest}) => {
  const Icon = SvgIcons[name];
  return <Icon width={SD.wp(size)} height={SD.hp(size)} {...rest} />;
};
