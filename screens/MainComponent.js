import { View, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';

const Drawer = createDrawerNavigator();

const screenOptions = {
	headerTintColor: '#fff',
	headerStyle: {
		backgroundColor: '#5637DD'
	}
}

const HomeNavigator = _ => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={screenOptions}
		>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={
					{ title: 'Home' }
				}
			/>
		</Stack.Navigator>
	);
}

const AboutNavigator = _ => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={screenOptions}
		>
			<Stack.Screen
				name='About'
				component={AboutScreen}
			/>
		</Stack.Navigator>
	);
}

const ContactNavigator = _ => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={screenOptions}
		>
			<Stack.Screen
				name='Contact Us'
				component={ContactScreen}
				options={{
					title: 'Contact Us'
				}}
			/>
		</Stack.Navigator>
	);
}

const DirectoryNavigator = _ => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			initialRouteName='Directory'
			screenOptions={screenOptions}
		>
			<Stack.Screen
				name='Directory'
				component={DirectoryScreen}
				options={{
					title: 'Campsite Directory'
				}}
			/>
			<Stack.Screen
				name='CampsiteInfo'
				component={CampsiteInfoScreen}
				options={
					( { route } ) => ( { title: route.params.campsite.name } )
				}
			/>
		</Stack.Navigator>
	);
}

const Main = _ => {
	//const [ campsites, setCampsites ] = useState(CAMPSITES);
	//const [ selectedCampsiteId, setSelectedCampsiteId ] = useState();

	return (
		<View style={{
			flex: 1,
			paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
		}}>
			<Drawer.Navigator
				initialRouteName='Home'
				drawerStyle={{
					backgroundColor: '#CEC8FF'
				}}
			>
				<Drawer.Screen
					name='Home'
					component={HomeNavigator}
					options={{
						title: 'Home'
					}}
				/>
				<Drawer.Screen
					name='Directory'
					component={DirectoryNavigator}
					options={{
						title: 'Directory'
					}}
				/>
				<Drawer.Screen
					name='About'
					component={AboutNavigator}
				/>
				<Drawer.Screen
					name='Contact'
					component={ContactNavigator}
					options={{
						title: 'Contact Us'
					}}
				/>
			</Drawer.Navigator>
		</View>
	);
};

export default Main;
