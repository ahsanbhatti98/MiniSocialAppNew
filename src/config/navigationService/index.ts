import {
  NavigationContainerRef,
  StackActions,
  CommonActions,
} from '@react-navigation/native';
import {RootStackParamList} from '@src/types';
import {createRef} from 'react';

// Create a ref for the navigator
export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();

// Set the top-level navigator manually (optional, here for backward compatibility)
export function setTopLevelNavigator(
  navigatorRef: NavigationContainerRef<RootStackParamList>,
) {
  if (navigatorRef) {
    (navigationRef as any).current = navigatorRef;
  }
}

// Typed navigate
export function navigate<RouteName extends keyof RootStackParamList>(
  ...args: undefined extends RootStackParamList[RouteName]
    ?
        | [name: RouteName]
        | [name: RouteName, params: RootStackParamList[RouteName]]
    : [name: RouteName, params: RootStackParamList[RouteName]]
) {
  navigationRef.current?.navigate(...(args as [any, any]));
}

// Go back
export function goBack() {
  navigationRef.current?.goBack();
}

// Reset to route
export function reset_0<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
  params?: RootStackParamList[RouteName],
) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: routeName, params}],
    }),
  );
}

// Push
export function push<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
  params?: RootStackParamList[RouteName],
) {
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}

// Replace
export function replace<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
  params?: RootStackParamList[RouteName],
) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

// Export everything as default for easier import
export default {
  navigationRef,
  setTopLevelNavigator,
  navigate,
  goBack,
  reset_0,
  push,
  replace,
};
