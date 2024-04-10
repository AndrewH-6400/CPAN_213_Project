import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistrationScreen from './screens/Registration.js';
import LoginScreen from './screens/login.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './screens/home';
import Favourites from './screens/favourites';
import Headbar from './components/header';
import store from './redux_store/store/index.js'
import { useSelector } from 'react-redux';
import Account from './screens/Account.js';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faHouse, faStar, faList, faUser } from '@fortawesome/free-solid-svg-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function AppWrapper() {

  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  return (
    
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
                } else if (route.name === "Login" || route.name === "Account") {
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
            {isLoggedIn == "false" &&
                <Tab.Screen component={RegistrationScreen} name="Registration"/>
            }
            {isLoggedIn == "true"? 
                <Tab.Screen component={Account} name="Account"/>
            :
                <Tab.Screen component={LoginScreen} name="Login"/>
            }                   
          </Tab.Navigator>        
      </NavigationContainer>
    
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
