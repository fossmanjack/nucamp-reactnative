import { FlatList, Text } from 'react-native';
import { Avatar,
	ListItem,
	Tile
} from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseURL } from '../shared/baseURL';

//const DirectoryScreen = ( { navigation } ) => {
export default function DirectoryScreen( { navigation } ) {
	const { campsitesArray: campsites } = useSelector(S => S.campsites);

	const renderDirectoryItem = ( { item: campsite } ) => {
		return (
			<Tile
				onPress={ _ => navigation.navigate('CampsiteInfo', { campsite }) }
				title={campsite.name}
				caption={campsite.description}
				featured
				imageSrc={{ uri: baseURL + campsite.image }}
			/>
		);
	};

	return (
		<FlatList
			data={campsites}
			renderItem={renderDirectoryItem}
			keyExtractor={(item) => item.id.toString()}
		/>
	);
};

//export default DirectoryScreen;
