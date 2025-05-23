import {ToucableFeedback} from '@components/toucableFeedback';
import React, {ReactNode} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {AppThemeColorsType, useTheme} from '../../hooks';
import {SD} from '../../utils';

type MainContainerProps = {
  children?: ReactNode;
  customeStyle?: StyleProp<ViewStyle>;
  hidden?: boolean;
  mainContainerStyle?: StyleProp<ViewStyle>;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  barBg?: string;
  isFlatList?: boolean;
};

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  customeStyle,
  hidden = false,
  mainContainerStyle,
  barStyle = 'dark-content',
  barBg,
  isFlatList,
}) => {
  const {AppTheme} = useTheme();
  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS == "ios" ? "padding" : "height"}
    //   keyboardVerticalOffset={10}
    // >
    <SafeAreaView style={[styles(AppTheme).mainContainer, mainContainerStyle]}>
      <StatusBar
        hidden={hidden}
        barStyle={barStyle}
        backgroundColor={barBg || AppTheme.Base}
      />
      {!isFlatList ? (
        <ToucableFeedback>
          <View style={[styles(AppTheme).container, customeStyle]}>
            {children}
          </View>
        </ToucableFeedback>
      ) : (
        <View style={[styles(AppTheme).container, customeStyle]}>
          {children}
        </View>
      )}
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

const styles = (AppTheme: AppThemeColorsType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: SD.wp(20),
      paddingTop: SD.hp(10),
      backgroundColor: AppTheme.Base, // 👈 Example use,
    },
    mainContainer: {flex: 1, backgroundColor: AppTheme.Base},
  });
