import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from './screens/HomeScreen';
import { getTrendingMovies } from './api';

// import { NativeWindStyleSheet } from "nativewind";

// NativeWindStyleSheet.setOutput({
//   default: "native",
// });

const stackNav = createNativeStackNavigator();

export default function App() {

  

  return (
    <NavigationContainer>
      <stackNav.Navigator>
        <stackNav.Screen name="Home" component={Home} options={{headerShown:false}}/>



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
