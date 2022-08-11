import {
	Alert,
	View,
	Platform,
	StyleSheet,
	Text,
	ToastAndroid,
	Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList
} from '@react-navigation/drawer';
import NetInfo from '@react-native-community/netinfo';
import logo from '../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import LoginScreen from './LoginScreen';
import ContactScreen from './ContactScreen';
import DirectoryScreen from './DirectoryScreen';
import FavoritesScreen from './FavoritesScreen';
import ReservationScreen from './ReservationScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import { fetchComments } from '../features/comments/commentsSlice';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';

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
				options={({ navigation }) => (
					{
						title: 'Home',
						headerLeft: _ =>
							<Icon
								name='home'
								type='font-awesome'
								iconStyle={styles.stackIcon}
								onPress={_ => navigation.toggleDrawer()}
							/>
					}
				)}
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
				options={({ navigation }) => (
					{
						headerLeft: _ =>
							<Icon
								name='info-circle'
								type='font-awesome'
								iconStyle={styles.stackIcon}
								onPress={_ => navigation.toggleDrawer()}
							/>
					}
				)}
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
				options={({ navigation }) => (
					{
						title: 'Contact Us',
						headerLeft: _ =>
							<Icon
								name='address-card'
								type='font-awesome'
								iconStyle={styles.stackIcon}
								onPress={_ => navigation.toggleDrawer()}
							/>
					}
				)}
			/>
		</Stack.Navigator>
	);
}

const ReservationNavigator = _ => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={screenOptions}
		>
			<Stack.Screen
				name='Reservation'
				component={ReservationScreen}
				options={({ navigation }) => (
					{
						title: 'Reservation Search',
						headerLeft: _ =>
							<Icon
								name='tree'
								type='font-awesome'
								iconStyle={styles.stackIcon}
								onPress={_ => navigation.toggleDrawer()}
							/>
					}
				)}
			/>
		</Stack.Navigator>
	);
}

const FavoritesNavigator = _ => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={screenOptions}
		>
			<Stack.Screen
				name='Favorites'
				component={FavoritesScreen}
				options={({ navigation }) => (
					{
						title: 'Favorite Campsites',
						headerLeft: _ =>
							<Icon
								name='heart'
								type='font-awesome'
								iconStyle={styles.stackIcon}
								onPress={_ => navigation.toggleDrawer()}
							/>
					}
				)}
			/>
		</Stack.Navigator>
	);
}

const LoginNavigator = _ => {
	const Stack = createStackNavigator();

	return (
		<Stack.Navigator
			screenOptions={screenOptions}
		>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={({ navigation, route }) => (
					{
						headerLeft: _ =>
							<Icon
								name={
									getFocusedRouteNameFromRoute(route) === 'Register'
										? 'user-plus'
										: 'sign-in'
								}
								type='font-awesome'
								iconStyle={styles.stackIcon}
								onPress={_ => navigation.toggleDrawer()}
							/>,
						headerTitle: getFocusedRouteNameFromRoute(route)
					}
				)}
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
				options={({ navigation }) => (
					{
						title: 'Campsite Directory',
						headerLeft: _ =>
							<Icon
								name='list'
								type='font-awesome'
								iconStyle={styles.stackIcon}
								onPress={_ => navigation.toggleDrawer()}
							/>
					}
				)}
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
};

const CustomDrawerContent = props => {
	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.drawerHeader}>
				<View style={{ flex: 1 }}>
					<Image
						source={logo}
						style={styles.drawerImage}
					/>
				</View>
				<View style={{ flex: 2 }}>
					<Text style={styles.drawerHeaderText}>
						NuCamp
					</Text>
				</View>
			</View>
			<DrawerItemList
				{...props}
				labelStyle={{ fontWeight: 'bold' }}
			/>
		</DrawerContentScrollView>
	);
};

const Main = _ => {
	//const [ campsites, setCampsites ] = useState(CAMPSITES);
	//const [ selectedCampsiteId, setSelectedCampsiteId ] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCampsites());
		dispatch(fetchPromotions());
		dispatch(fetchPartners());
		dispatch(fetchComments());
	}, [ dispatch ]);

	useEffect(_ => {
		NetInfo.fetch().then(
			connectionInfo => {
				Platform.OS === 'ios'
					? Alert.alert(
						'Initial Network Connectivity Type:',
						connectionInfo.type
					)
					: ToastAndroid.show(
						'Initial Network Connectivity Type: ' + connectionInfo.type,
						ToastAndroid.LONG
					);
			}
		);
		return NetInfo.addEventListener(
			connectionInfo => handleConnectivityChange(connectionInfo)
		);
	});

	const handleConnectivityChange = connectionInfo => {
		let connectionMsg = 'You are now connected to an active network.';

		switch(connectionInfo.type) {
			case 'none':
				connectionMsg = 'No network connection is active.';
				break;
			case 'unknown':
				connectionMsg = 'The network connection state is now unknown.';
				break;
			case 'cellular':
				connectionMsg = 'You are now connected to a cellular network.';
				break;
			case 'wifi':
				connectionMsg = 'You are now connected to a Wifi network.';
				break;
		}

		Platform.OS === 'ios'
			? Alert.alert(`Connection change: ${connectionMsg}`)
			: ToastAndroid.show(`Connection change: ${connectionMsg}`, ToastAndroid.LONG);
	}

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
				drawerContent={CustomDrawerContent}
			>
				<Drawer.Screen
					name='Login'
					component={LoginNavigator}
					options={{
						title: 'Login',
						drawerIcon: ({ color }) => (
							<Icon
								name='sign-in'
								type='font-awesome'
								size={24}
								iconStyle={styles.drawerIcon}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='Home'
					component={HomeNavigator}
					options={{
						title: 'Home',
						drawerIcon: ({ color }) => (
							<Icon
								name='home'
								type='font-awesome'
								size={24}
								iconStyle={styles.drawerIcon}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='Directory'
					component={DirectoryNavigator}
					options={{
						title: 'Directory',
						drawerIcon: ({ color }) => (
							<Icon
								name='list'
								type='font-awesome'
								size={24}
								iconStyle={styles.drawerIcon}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='ReserveCampsite'
					component={ReservationNavigator}
					options={{
						title: 'Reserve Campsite',
						drawerIcon: ({ color }) => (
							<Icon
								name='tree'
								type='font-awesome'
								size={24}
								iconStyle={styles.drawerIcon}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='Favorites'
					component={FavoritesNavigator}
					options={{
						title: 'My Favorites',
						drawerIcon: ({ color }) => (
							<Icon
								name='heart'
								type='font-awesome'
								size={24}
								iconStyle={styles.drawerIcon}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='About'
					component={AboutNavigator}
					options={{
						drawerIcon: ({ color }) => (
							<Icon
								name='info-circle'
								type='font-awesome'
								size={24}
								iconStyle={styles.drawerIcon}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen
					name='Contact'
					component={ContactNavigator}
					options={{
						title: 'Contact Us',
						drawerIcon: ({ color }) => (
							<Icon
								name='address-card'
								type='font-awesome'
								size={24}
								iconStyle={styles.drawerIcon}
								color={color}
							/>
						)
					}}
				/>
			</Drawer.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	stackIcon: {
		marginLeft: 10,
		color: '#fff',
		fontSize: 24
	},
	drawerHeader: {
		backgroundColor: '#5637dd',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row'
	},
	drawerHeaderText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold'
	},
	drawerImage: {
		margin: 10,
		height: 60,
		width: 60
	},
	drawerIcon: {
		width: 28
	}
});

export default Main;
