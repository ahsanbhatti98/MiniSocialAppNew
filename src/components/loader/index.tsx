import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '../../hooks';
import {SD} from '../../utils';

type LoaderProps = ActivityIndicatorProps & {
  isVisible?: boolean;
  withModal?: boolean;
  isfooter?: boolean;
};

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  isVisible,
  withModal,
  isfooter = false,
}) => {
  const {AppTheme} = useTheme();

  if (!isVisible) return <></>;

  const loaderContent = (
    <View
      style={[
        styles.mainContaienr(
          withModal
            ? AppTheme.ModalSecondaryContentBackgoundColor
            : AppTheme.Transparent,
        ),
        !isfooter && {flex: 1},
        isfooter && {marginTop: SD.hp(10)},
      ]}>
      <ActivityIndicator size={size} color={AppTheme.Primary} />
    </View>
  );

  return withModal ? (
    <Modal visible={isVisible} transparent={true} animationType={'fade'}>
      {loaderContent}
    </Modal>
  ) : (
    loaderContent
  );
};

const styles = StyleSheet.create<any>({
  mainContaienr: (color: any) => ({
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
