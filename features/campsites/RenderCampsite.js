import {
	Alert,
	PanResponder,
	Text,
	View,
	StyleSheet
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { baseURL } from '../../shared/baseURL';

export default function RenderCampsite(props) {
	const { campsite } = props;
	const isLeftSwipe = ({ dx }) => dx < -200;
	const panResponder = PanResponder.create(
		{
			onStartShouldSetPanResponder: _ => true,
			onPanResponderEnd: (e, gestureState) => {
				console.log(gestureState);
				isLeftSwipe(gestureState) &&
					Alert.alert(
						'Add Favorite',
						`Are you sure you wish to add ${campsite.name} to favorites?`,
						[
							{
								text: 'Cancel',
								onPress: _ => console.log("Cancel was pressed"),
								style: 'cancel'
							},
							{
								text: 'OK',
								onPress: _ => props.isFavorite
									? console.log('Already set as favorite')
									: props.toggleFavorite()
							}
						],
						{ cancelable: false }
					);
			}
		}
	);

	return campsite ? (
		<Animatable.View
			animation='fadeInDownBig'
			duration={2000}
			delay={1000}
			{...panResponder.panHandlers}
		>
			<Card containerStyle={styles.cardContainer}>
				<Card.Image source={{ uri: baseURL + campsite.image }}>
					<View
						style={{
							justifyContent: 'center',
							flex: 1
						}}
					>
						<Text style={styles.cardText}>
							{campsite.name}
						</Text>
					</View>
				</Card.Image>
				<Text style={{ margin: 20 }}>
					{campsite.description}
				</Text>
				<View style={styles.cardRow}>
					<Icon
						name={props.isFavorite ? 'heart' : 'heart-o'}
						type='font-awesome'
						color='#f50'
						raised
						reverse
						onPress={_ => props.toggleFavorite() }
					/>
					<Icon
						name='pencil'
						type='font-awesome'
						color='#5637dd'
						raised
						reverse
						onPress={_ => props.onShowModal()}
					/>
				</View>
			</Card>
		</Animatable.View>
	) : <View />;

}

const styles = StyleSheet.create({
	cardContainer: {
		padding: 0,
		margin: 0,
		marginBottom: 20
	},
	cardRow: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		margin: 20
	},
	cardText: {
		textShadowColor: 'rgba(0, 0, 0, 1)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 20,
		textAlign: 'center',
		color: 'white',
		fontSize: 20
	}
});
