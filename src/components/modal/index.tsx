import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  Modal as RNModal,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

import {ThemeColors} from '../../styles';

import {useTheme} from '../../hooks/useTheme';
import {SD} from '../../utils';
import {CustomTouchable} from '../custom-touchable';
import {ToucableFeedback} from '../toucableFeedback';

type ModalProps = {
  isVisible: boolean;
  isKeyboardAvoidingView?: boolean;
  children: React.ReactChild[] | React.ReactChild;
  onClose?: (event: GestureResponderEvent) => void;
  modalStyles?: ViewProps['style'];
  contentStyles?: ViewProps['style'];
  mainContainerStyle?: ViewProps['style'];
  isTouchable?: boolean;
};

export const Modal: React.FC<ModalProps> = props => {
  const {
    isVisible = false,
    isKeyboardAvoidingView = false,
    children,
    onClose = () => {},
    modalStyles = null,
    contentStyles = {},
    mainContainerStyle = {},
    isTouchable = true,
  } = props;

  const {AppTheme} = useTheme();

  const renderContent = () => {
    return (
      <ToucableFeedback>
        <View style={contentStyles}>{children}</View>
      </ToucableFeedback>
    );
  };
  return (
    <RNModal animationType="slide" transparent={true} visible={isVisible}>
      {isTouchable ? (
        <CustomTouchable
          onPress={onClose}
          activeOpacity={1}
          style={[styles.centeredView, mainContainerStyle]}>
          <View
            style={[
              styles.modalView(AppTheme.Base),

              modalStyles,
              {
                borderTopEndRadius: SD.wp(20),
                borderTopStartRadius: SD.wp(20),
              },
            ]}>
            {isKeyboardAvoidingView ? (
              <KeyboardAvoidingView behavior="padding">
                {renderContent()}
              </KeyboardAvoidingView>
            ) : (
              renderContent()
            )}
          </View>

          <BlurView
            style={styles.overlay}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor={ThemeColors.White}
          />
        </CustomTouchable>
      ) : (
        <View style={[styles.centeredView, mainContainerStyle]}>
          <View
            style={[
              styles.modalView(AppTheme.Base),
              modalStyles,
              {
                borderTopEndRadius: SD.wp(20),
                borderTopStartRadius: SD.wp(20),
              },
            ]}>
            {/* <DigitalSignature ft_id={Number(2)} onSendSignature={() => {}} /> */}
            <View style={{flex: 1}}>
              <View style={contentStyles}>{children}</View>
            </View>
            {/* {renderContent()} */}
          </View>

          <BlurView
            style={styles.overlay}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor={ThemeColors.White}
          />
        </View>
      )}
    </RNModal>
  );
};
const styles = StyleSheet.create<any>({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: (color: string) => ({
    width: '80%',
    margin: SD.wp(35),
    backgroundColor: color,
    zIndex: 2,
    // borderRadius: SD.wp(20),
    paddingHorizontal: SD.wp(20),
    paddingVertical: SD.hp(20),
    height: '32%',
    // justifyContent: "center",
    // alignItems: "center",
    // borderWidth: 1,
  }),
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});
