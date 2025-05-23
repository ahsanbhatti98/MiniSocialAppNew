import {useTheme} from '@hooks/useTheme';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {SD} from '@utils/index';
import React from 'react';
import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

type TabIcons = {
  [key: string]: any;
};

interface CustomTabBarProps extends BottomTabBarProps {
  icons: TabIcons;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  icons,
}) => {
  const {AppTheme} = useTheme();

  return (
    <View style={styles.tabBar(AppTheme)}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key] ?? {};
        const label = options?.tabBarLabel ?? options?.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={() =>
              navigation.emit({type: 'tabLongPress', target: route.key})
            }
            style={styles.tabItem}>
            <Image
              source={icons[route.name] || icons.default}
              style={{
                height: SD.hp(25),
                width: SD.hp(25),
                tintColor: isFocused
                  ? AppTheme.Primary
                  : AppTheme.SecondaryTextColor,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                marginTop: 5,
                color: isFocused
                  ? AppTheme.Primary
                  : AppTheme.SecondaryTextColor,
                fontSize: 10,
              }}>
              {typeof label === 'string'
                ? label
                : label({
                    focused: isFocused,
                    color: isFocused
                      ? AppTheme.Primary
                      : AppTheme.SecondaryTextColor,
                    position: 'below-icon',
                    children: '',
                  })}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  tabItem: {
    alignItems: 'center',
  } as ViewStyle,

  tabBar: (AppTheme: any): ViewStyle => ({
    flexDirection: 'row',
    height: SD.hp(76),
    backgroundColor: AppTheme.Base,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: SD.hp(10),
    elevation: SD.hp(5),
    borderTopWidth: 0,
    justifyContent: 'space-around',
    paddingVertical: SD.hp(10),
  }),
};
