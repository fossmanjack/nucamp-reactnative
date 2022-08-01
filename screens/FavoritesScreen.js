import { useSelector } from 'react-redux';
import {
	View,
	FlatList,
	Text
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { Loading } from '../components/LoadingComponent';
import { baseURL } from '../shared/baseURL';

export default function FavoritesScreen({ navigation }) {
	const { campsitesArray, isLoading, errMess } = useSelector(S => S.campsites);
	const favorites = useSelector(S => S.favorites);

	const renderFavoriteItem = ({ item: campsite }) => {
		return (
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
		);
	};

	return isLoading ? (
		<Loading />
	) : errMess ? (
		<View>
			<Text>{errMess}</Text>
		</View>
	) : (
		<FlatList
			data={campsitesArray.filter(c => favorites.includes(c.id))}
			renderItem={renderFavoriteItem}
			keyExtractor={item => item.id.toString()}
		/>
	);
};
