import {
	View,
	Platform,
	StyleSheet,
	Text,
	Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList
} from '@react-navigation/drawer';
import logo from '../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import DirectoryScreen from './DirectoryScreen';
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
