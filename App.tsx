import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MovieScreen from './screens/MovieScreen';
import HomeScreen from './screens/HomeScreen';
import CastScreen from './screens/CastScreen';
import SearchScreen from './screens/SearchScreen';

// import { NativeWindStyleSheet } from "nativewind";

// NativeWindStyleSheet.setOutput({
//   default: "native",
// });

const stackNav = createNativeStackNavigator();

export default function App() {

  

  return (
    <NavigationContainer>
      <stackNav.Navigator>
        <stackNav.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <stackNav.Screen name="Movie" component={MovieScreen} options={{headerShown:false}}/>
        <stackNav.Screen name="Cast" component={CastScreen} options={{headerShown:false}}/>
        <stackNav.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
      </stackNav.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
