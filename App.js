import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistrationScreen from './screens/Registration.js';
import LoginScreen from './screens/login.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import Home from './screens/home';
import Favourites from './screens/favourites';
import Headbar from './components/header';
import store from './redux_store/store/index.js'

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faHouse, faStar, faList, faUser } from '@fortawesome/free-solid-svg-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>                
          <Tab.Navigator
            screenOptions={ ({route}) => ({
              header: ({navigation, route, options}) => {
                return<Headbar route={route} />
              },
              tabBarIcon: ({focused, color, size}) => {
                let iconName = faHouse;
                if (route.name === "Home") {
                  iconName = faHouse;
                } else if (route.name === "Favourites") {
                  iconName = faStar;
                } else if (route.name === "Registration") {
                  iconName = faList;                
                } else if (route.name === "Login") {
                  iconName = faUser;
                  if(focused){
                    color="orange"
                  } else {
                    color="grey"
                  }
                }
                return<FontAwesomeIcon icon={iconName} color={color}/>
              },
              tabBarActiveTintColor: "orange",
              tabBarInactiveTintColor: "grey"
            })}
            
          >
            <Tab.Screen component={Home} name="Home" />
            <Tab.Screen component={Favourites} name="Favourites"/>
            <Tab.Screen component={RegistrationScreen} name="Registration"/>
            <Tab.Screen component={LoginScreen} name="Login"/>          
          </Tab.Navigator>        
      </NavigationContainer>
    </Provider>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
