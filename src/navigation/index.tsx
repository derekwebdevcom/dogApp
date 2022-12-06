import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DashboardScreen,
  ProfileScreen,
  UploadScreen,
  WebViewScreen,
  WelcomeScreen,
} from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { globalColors, globalEnums } from "../global";
const options = { headerShown: false };
const tabOptions = {
  gestureEnabled: false,
  animation: "fade",
  tabBarShowLabel: false,
  headerShown: false,
  tabBarActiveTintColor: globalColors.tabActiveTint,
  tabBarInactiveTintColor: globalColors.tabInactiveTint,
  tabBarIndicatorStyle: {
    borderBottomColor: globalColors.tabActiveTint,
    borderBottomWidth: 2,
  },
  tabBarStyle: { backgroundColor: globalColors.shadowBackGroundPinkDarker },
  tabBarLabelStyle: {
    textTransform: "none",
    textAlign: "center",
  },
};

export type Routes = {
  welcomeScreen: {
    name: string;
  };
  dashboardScreen: {
    name: string;
  };
  dashboardTab: {
    name: string;
  };
  settingsScreen: {
    name: string;
  };
  profileScreen: {
    name: string;
  };
  uploadScreen: {
    name: string;
  };
  webViewScreen: {
    name: string;
  };
};

const Stack = createNativeStackNavigator<Routes>();
const Tab = createBottomTabNavigator<Routes>();

const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator screenOptions={tabOptions as any}>
        <Tab.Screen
          name={"dashboardTab"}
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                testID={"dashboard_screen_button"}
                name={globalEnums.homeOutline}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name={"uploadScreen"}
          component={UploadScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather
                testID={"upload_screen_button"}
                name={globalEnums.camera}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name={"profileScreen"}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather
                testID={"profile_screen_button"}
                name={globalEnums.user}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name={"welcomeScreen"}
        component={WelcomeScreen}
        options={options}
      />
      <Stack.Screen
        name={"webViewScreen"}
        component={WebViewScreen}
        options={options}
      />
      <Stack.Screen
        name={"dashboardScreen"}
        component={TabNavigator}
        options={options}
      />
    </Stack.Navigator>
  );
};
