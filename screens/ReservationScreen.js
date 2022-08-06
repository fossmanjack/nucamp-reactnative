import { useState } from 'react';
import {
	Alert,
	Text,
	View,
	ScrollView,
	StyleSheet,
	Switch,
	Button
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

export default function ReservationScreen() {
	const [ campers, setCampers ] = useState(1);
	const [ hikeIn, setHikeIn ] = useState(false);
	const [ date, setDate ] = useState(new Date());
	const [ showCalendar, setShowCalendar ] = useState(false);

	const handleReservation = _ => {
		console.log(`Campers: ${campers}
			Hike in? ${hikeIn}
			date: ${date}
			Show calendar? ${showCalendar}`);
		Alert.alert(
			'Begin Search?',
			`Number of Campers: ${campers}\n
			Hike in? ${hikeIn}\n
			Date: ${date}\n`,
			[
				{
					text: 'Cancel',
					onPress: _ => console.log('Cancel was pressed'),
					style: 'cancel'
				},
				{
					text: 'OK',
					onPress: _ => console.log('OK was pressed'),
				}
			],
			{ cancelable: false }
		);
	};

	const onDateChange = (event, selDate) => {
		const curDate = selDate || date;

		setShowCalendar(Platform.OS === 'ios');
		setDate(curDate);
	}

	const resetForm = _ => {
		setCampers(1);
		setHikeIn(false);
		setDate(new Date());
		setShowCalendar(false);
	}

	return (
		<ScrollView>
			<Animatable.View
				animation='zoomIn'
				duration={2000}
				delay={1000}
			>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>
						Number of Campers
					</Text>
					<Picker
						style={styles.formItem}
						selectedValue={campers}
						onValueChange={val => setCampers(val)}
					>
						<Picker.Item label='1' value={1} />
						<Picker.Item label='2' value={2} />
						<Picker.Item label='3' value={3} />
						<Picker.Item label='4' value={4} />
						<Picker.Item label='5' value={5} />
						<Picker.Item label='6' value={6} />
					</Picker>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>
						Hike in?
					</Text>
					<Switch
						style={styles.formItem}
						value={hikeIn}
						trackColor={{ true: '#5637dd', false: null }}
						onValueChange={val => setHikeIn(val)}
					/>
				</View>
				<View style={styles.formRow}>
					<Text style={styles.formLabel}>
						Date:
					</Text>
					<Button
						onPress={_ => setShowCalendar(!showCalendar)}
						title={date.toLocaleDateString('en-US')}
						color='#5637dd'
						accessibilityLabel='Tap me to select a reservation date'
					/>
				</View>
				{ showCalendar &&
					<DateTimePicker
						style={styles.formItem}
						value={date}
						mode='date'
						display='default'
						onChange={onDateChange}
						minimumDate={Date.now()}
					/>
				}
				<View style={styles.formRow}>
					<Button
						onPress={_ => handleReservation()}
						title='Search Availability'
						color='#5637dd'
						accessibilityLabel='Tap me to search for available campsites to reserve'
					/>
				</View>
			</Animatable.View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	formRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20
	},
	formLabel: {
		fontSize: 18,
		flex: 2
	},
	formItem: {
		flex: 1
	}
});
