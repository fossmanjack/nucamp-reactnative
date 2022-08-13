import { useEffect, useState } from 'react';
import {
	Image,
	View,
	ScrollView,
	StyleSheet
} from 'react-native';
import {
	Button,
	CheckBox,
	Icon,
	Input
} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import { baseURL } from '../shared/baseURL';
import logo from '../assets/images/logo.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function LoginTab({ navigation }) {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ remember, setRemember ] = useState(false);

	const handleLogin = _ => {
		console.log('handle Login',
			'\n\tusername:', username,
			'\n\tpassword:', password,
			'\n\tremember?', remember
		);
		remember
			&& SecureStore.setItemAsync(
			'userinfo',
			JSON.stringify({
				username,
				password
			})).catch((error) => console.log('Could not save user info', error))
			|| SecureStore.deleteItemAsync('userinfo')
				.catch((error) => console.log('Could not delete user info', error));
	}

	useEffect(_ => SecureStore.getItemAsync('userinfo')
		.then(data => {
			userinfo = JSON.parse(data);
			if(userinfo) {
				setUsername(userinfo.username);
				setPassword(userinfo.password);
				setRemember(true);
			}
		}), []);

	return (
		<View style={styles.container}>
			<Input
				placeholder='Username'
				leftIcon={{
					type: 'font-awesome',
					name: 'user-o'
				}}
				onChangeText={text => setUsername(text)}
				value={username}
				containerStyle={styles.formInput}
				leftIconContainerStyle={styles.formIcon}
			/>
			<Input
				placeholder='Password'
				leftIcon={{
					type: 'font-awesome',
					name: 'key'
				}}
				onChangeText={text => setPassword(text)}
				value={password}
				containerStyle={styles.formInput}
				leftIconContainerStyle={styles.formIcon}
			/>
			<CheckBox
				title='Remember Me'
				center
				checked={remember}
				onPress={_ => setRemember(!remember)}
				containerStyle={styles.formCheckbox}
			/>
			<View style={styles.formButton}>
				<Button
					onPress={_ => handleLogin()}
					title='Login'
					color='#5637dd'
					icon={
						<Icon
							name='sign-in'
							type='font-awesome'
							color='#fff'
							iconStyle={{ marginRight: 10 }}
						/>
					}
					buttonStyle={{ backgroundColor: '#5637dd' }}
				/>
			</View>
			<View style={styles.formButton}>
				<Button
					onPress={_ => navigation.navigate('Register')}
					title='Register'
					type='clear'
					icon={
						<Icon
							name='user-plus'
							type='font-awesome'
							color='blue'
							iconStyle={{ marginRight: 10 }}
						/>
					}
					titleStyle={{ color: 'blue' }}
				/>
			</View>
		</View>
	);
}

function RegisterTab() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [remember, setRemember] = useState(false);
	const [ imageURL, setImageURL ] = useState(baseURL + 'images/logo.png');

	const handleRegister = _ => {
		console.log(JSON.stringify({
			username,
			password,
			firstName,
			lastName,
			email,
			remember
		}));
		remember
			&& SecureStore.setItemAsync(
			'userinfo',
			JSON.stringify({
				username,
				password
			})).catch((error) => console.log('Could not save user info', error))
			|| SecureStore.deleteItemAsync('userinfo')
				.catch((error) => console.log('Could not delete user info', error));
	}

	const getImageFromCamera = async _ => {
		const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();


		if(cameraPermission.status === 'granted') {
			const capturedImage = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				aspect: [1, 1]
			});
			if(!capturedImage.cancelled) {
				console.log('Captured image:', capturedImage);
				processImage(capturedImage.uri);
			}
		}
	}

	const getImageFromGallery = async _ => {
		const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
		console.log('Media library permissions', mediaLibraryPermissions);

		if(mediaLibraryPermissions.status === 'granted') {
			console.log('Media permissions granted, launching image library...');
			const capturedImage = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [1, 1]
			});
			if(!capturedImage.cancelled) {
				console.log('Captured image:', capturedImage);
				processImage(capturedImage.uri);
			}
		}
	}

	const processImage = async imgURI => {
		console.log('Called processImage with imgURI:', imgURI);
		const processedImage = await ImageManipulator.manipulateAsync(imgURI,
			[ { resize: { width: 400 }} ], { compress: 0.5, format: ImageManipulator.SaveFormat.PNG });
		console.log('Processed image:', processedImage);
		setImageURL(processedImage.uri);
		const savedImage = await MediaLibrary.saveToLibraryAsync(processedImage.uri);
		console.log('savedImage:', savedImage);
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: imageURL }}
						loadingIndicatorSource={logo}
						style={styles.image}
					/>
					<Button
						title='Camera'
						onPress={getImageFromCamera}
					/>
					<Button
						title='Gallery'
						onPress={getImageFromGallery}
					/>
				</View>
				<Input
					placeholder='Username'
					leftIcon={{
						type: 'font-awesome',
						name: 'user-o'
					}}
					onChangeText={text => setUsername(text)}
					value={username}
					containerStyle={styles.formInput}
					leftIconContainerStyle={styles.formIcon}
				/>
				<Input
					placeholder='Password'
					leftIcon={{
						type: 'font-awesome',
						name: 'key'
					}}
					onChangeText={text => setPassword(text)}
					value={password}
					containerStyle={styles.formInput}
					leftIconContainerStyle={styles.formIcon}
				/>
				<Input
					placeholder='First Name'
					leftIcon={{
						type: 'font-awesome',
						name: 'user-o'
					}}
					onChangeText={text => setFirstName(text)}
					value={firstName}
					containerStyle={styles.formInput}
					leftIconContainerStyle={styles.formIcon}
				/>
				<Input
					placeholder='Last Name'
					leftIcon={{
						type: 'font-awesome',
						name: 'user-o'
					}}
					onChangeText={text => setLastName(text)}
					value={lastName}
					containerStyle={styles.formInput}
					leftIconContainerStyle={styles.formIcon}
				/>
				<Input
					placeholder='Email'
					leftIcon={{
						type: 'font-awesome',
						name: 'envelope-o'
					}}
					onChangeText={text => setEmail(text)}
					value={email}
					containerStyle={styles.formInput}
					leftIconContainerStyle={styles.formIcon}
				/>
				<CheckBox
					title='Remember Me'
					center
					checked={remember}
					onPress={_ => setRemember(!remember)}
					containerStyle={styles.formCheckbox}
				/>
				<View style={styles.formButton}>
					<Button
						onPress={_ => handleRegister()}
						title='Register'
						color='#5637dd'
						icon={
							<Icon
								name='user-plus'
								type='font-awesome'
								color='#fff'
								iconStyle={{ marginRight: 10 }}
							/>
						}
						buttonStyle={{ backgroundColor: '#5637dd' }}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

const Tab = createBottomTabNavigator();

export default function LoginScreen() {
	const tabBarOptions = {
		activeBackgroundColor: '#5637dd',
		inactiveBackgroundColor: '#cec8ff',
		activeTintColor: '#fff',
		inactiveTintColor: '#808080',
		labelStyle: { fontSize: 16 }
	}

	return (
		<Tab.Navigator tabBarOptions={tabBarOptions}>
			<Tab.Screen
				name='Login'
				component={LoginTab}
				options={{ tabBarIcon: props => {
					return (
						<Icon
							name='sign-in'
							type='font-awesome'
							color={props.color}
						/>
					);
				}}}
			/>
			<Tab.Screen
				name='Register'
				component={RegisterTab}
				options={{ tabBarIcon: props => {
					return (
						<Icon
							name='user-plus'
							type='font-awesome'
							color={props.color}
						/>
					);
				}}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		margin: 10
	},
	formIcon: {
		marginRight: 10
	},
	formInput: {
		padding: 8,
		height: 60
	},
	formCheckbox: {
		margin: 8,
		backgroundColor: null
	},
	formButton: {
		margin: 20,
		marginRight: 40,
		marginLeft: 40
	},
	imageContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		margin: 10
	},
	image: {
		width: 60,
		height: 60
	}
});


