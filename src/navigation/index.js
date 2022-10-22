import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArtistSearch from "../screens/ArtistSearch";
import Login from '../screens/Login'
import AlbumScreen from "../screens/AlbumScreen";

const Stack = createNativeStackNavigator();

const screenOptionsNavigator = {
  cardStyle: { backgroundColor: 'white' }
}

const Navigator = () => {
  return (
    <NavigationContainer screenOptions={screenOptionsNavigator} >
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ArtistSearch" component={ArtistSearch} options={{
          headerBackVisible: false,
          title: 'Artist Search',
          headerTitleAlign: 'center'
        }} />
        <Stack.Screen name="AlbumScreen" component={AlbumScreen} options={{
          title:''
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;