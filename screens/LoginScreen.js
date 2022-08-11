import { useEffect, useState } from 'react';
import {
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
	return (
		<ScrollView>
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
		margin: 20
	},
	formIcon: {
		marginRight: 10
	},
	formInput: {
		padding: 10
	},
	formCheckbox: {
		margin: 10,
		backgroundColor: null
	},
	formButton: {
		margin: 40
	}
});


