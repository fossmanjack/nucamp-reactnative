import RenderCampsite from '../features/campsites/RenderCampsite';
import {
	FlatList,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';


export default function CampsiteInfoScreen( { route } ) {
	const { campsite } = route.params;
	const { commentsArray: comments } = useSelector(S => S.comments);
	const favorites = useSelector(S => S.favorites);
	const dispatch = useDispatch();

	const renderCommentItem = ({ item }) => {
		return (
			<View style={styles.commentItem}>
				<Text style={{ fontSize: 14 }}>
					{item.text}
				</Text>
				<Text style={{ fontSize: 12 }}>
					{item.rating} Stars
				</Text>
				<Text style={{ fontSize: 12 }}>
					{`-- ${item.author}, ${item.date}`}
				</Text>
			</View>
		);
	};

	return (
		<FlatList
			data={comments.filter((c) => c.campsiteId == campsite.id)}
			renderItem ={renderCommentItem}
			keyExtractor={(item) => item.id.toString()}
			contentContainerStyle={{
				marginHorizontal: 20,
				paddingVertical: 20
			}}
			ListHeaderComponent={
				<>
					<RenderCampsite
						campsite={campsite}
						isFavorite={favorites.includes(campsite.id)}
						toggleFavorite={_ => dispatch(toggleFavorite(campsite.id))}
					/>
					<Text style={styles.commentsTitle}>Comments</Text>
				</>
			}
		/>
	);
}

const styles = StyleSheet.create({
	commentsTitle: {
		textAlign: 'center',
		backgroundColor: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
		color: '#43484D',
		padding: 10,
		paddingTop: 30
	},
	commentItem: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: '#fff'
	}
});
