import {
	FlatList,
	Text,
	View
} from 'react-native';
import { Avatar,
	ListItem,
	Tile
} from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import Loading from '../components/LoadingComponent';

//const DirectoryScreen = ( { navigation } ) => {
export default function DirectoryScreen( { navigation } ) {
	const campsites = useSelector(S => S.campsites);

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

	return campsites.isLoading ? ( <Loading /> )
		: campsites.errMess ? (
			<View>
				<Text>{campsites.errMess}</Text>
			</View>
		) : (
			<FlatList
				data={campsites.campsitesArray}
				renderItem={renderDirectoryItem}
				keyExtractor={(item) => item.id.toString()}
			/>
	);
/*
	return (
		<>
			{
				campsites.isLoading ? <Loading />
				: campsites.errMess ? (
					<View>
						<Text>{campsites.errMess}</Text>
					</View>
				) : (
					<FlatList
						data={campsites.campsitesArray}
						renderItem={renderDirectoryItem}
						keyExtractor={(item) => item.id.toString()}
					/>
				);
			}
		</>
	);
*/
};

//export default DirectoryScreen;
