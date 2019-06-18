import React from 'react';import {  View,TouchableOpacity,StatusBar} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from "./Home";
import LoginScreen from "./login";
import DaftarScreen from "./Daftar";
import LapanganScreen from "./lapangan";
import BookingScreen from "./Booking";


const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        Daftar : DaftarScreen,
        Home : HomeScreen,
        Lapangan: LapanganScreen,
        Booking: BookingScreen,
    },
    {
        initialRouteName: 'Login',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}