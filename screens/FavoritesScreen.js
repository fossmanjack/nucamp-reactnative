import { useSelector, useDispatch } from 'react-redux';
import {
	View,
	FlatList,
	Text,
	TouchableOpacity,
	StyleSheet,
	Alert
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { SwipeRow } from 'react-native-swipe-list-view';
import * as Animatable from 'react-native-animatable';
import { Loading } from '../components/LoadingComponent';
import { baseURL } from '../shared/baseURL';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

export default function FavoritesScreen({ navigation }) {
	const { campsitesArray, isLoading, errMess } = useSelector(S => S.campsites);
	const favorites = useSelector(S => S.favorites);
	const dispatch = useDispatch();

	const renderFavoriteItem = ({ item: campsite }) => {
		return (
			<SwipeRow rightOpenValue={-100}>
				<View style={styles.deleteView}>
					<TouchableOpacity
						style={styles.deleteTouchable}
						onPress={_ => Alert.alert(
							'Delete favorite?',
							`Are you sure you wish to delete the favorite campsite ${campsite.name}?`,
							[
								{
									text: 'Cancel',
									onPress: _ => console.log(`${campsite.name}: not deleted`),
									style: 'cancel'
								},
								{
									text: 'OK',
									onPress: _ => dispatch(toggleFavorite(campsite.id))
								}
							],
							{ cancelable: false }
						)}
					>
						<Text style={styles.deleteText}>
							Delete
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<ListItem
						onPress={_ => navigation.navigate('Directory', {
										screen: 'CampsiteInfo',
										params: { campsite }
									})
								}
					>
						<Avatar rounded source={{ uri: baseURL + campsite.image }} />
						<ListItem.Content>
							<ListItem.Title>
								{campsite.name}
							</ListItem.Title>
							<ListItem.Subtitle>
								{campsite.description}
							</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
				</View>
			</SwipeRow>
		);
	};

	return isLoading ? (
		<Loading />
	) : errMess ? (
		<View>
			<Text>{errMess}</Text>
		</View>
	) : (
		<Animatable.View
			animation='fadeInRightBig'
			duration={2000}
		>
			<FlatList
				data={campsitesArray.filter(c => favorites.includes(c.id))}
				renderItem={renderFavoriteItem}
				keyExtractor={item => item.id.toString()}
			/>
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	deleteView: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1
	},
	deleteTouchable: {
		backgroundColor: 'red',
		height: '100%',
		justifyContent: 'center'
	},
	deleteText: {
		color: 'white',
		fontWeight: '700',
		textAlign: 'center',
		fontSize: 16,
		width: 100
	}
});
