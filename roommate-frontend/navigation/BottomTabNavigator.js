import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import Login from '../screens/Login';

import ChatListScreen from '../screens/ChatListScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Finder';

export default function BottomTabNavigator({ navigation,route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
          component={HomeScreen}
        options={{
          title: 'Finder',
          tabBarVisible: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
        }}
      />
      <BottomTab.Screen
        name="Account"
          component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarVisible: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-settings" />
        }}
      />
      <BottomTab.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          tabBarVisible: true,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />
        }}
        />
      <BottomTab.Screen
        name="Matches"
        component={ChatListScreen}
        options={{
            title: 'Matches',
            tabBarVisible: true,
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Finder';
    case 'Account':
      return 'Settings';
    case 'Edit Profile':
      return 'Edit Profile';
    case 'Chats':
      return 'Your Chats';
    case 'Matches':
      return 'Your Matches';
    default:
      return 'Roomie';
  }
}
