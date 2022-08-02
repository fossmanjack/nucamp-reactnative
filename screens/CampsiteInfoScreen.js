import RenderCampsite from '../features/campsites/RenderCampsite';
import {
	FlatList,
	StyleSheet,
	Text,
	Button,
	Modal,
	View
} from 'react-native';
import { Rating, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { postComment } from '../features/comments/commentsSlice';


export default function CampsiteInfoScreen( { route } ) {
	const { campsite } = route.params;
	const { commentsArray: comments } = useSelector(S => S.comments);
	const favorites = useSelector(S => S.favorites);
	const dispatch = useDispatch();
	const [ showModal, setShowModal ] = useState(false);
	const [ rating, setRating ] = useState(5);
	const [ author, setAuthor ] = useState('');
	const [ text, setText ] = useState('');

	const handleSubmit = _ => {
		const newComment = {
			author, rating, text,
			campsiteId: campsite.id
		}

		//getState().debug && console.log(newComment);
		dispatch(postComment(newComment));
		setShowModal(!showModal);
	};

	const resetForm = _ => {
		setRating(5);
		setAuthor('');
		setText('');
	};

	const renderCommentItem = ({ item }) => {
		return (
			<View style={styles.commentItem}>
				<Text style={{ fontSize: 14 }}>
					{item.text}
				</Text>
				<Rating
					startingValue={item.rating}
					imageSize={10}
					style={{
						alignItems: 'flex-start',
						paddingVertical: '5%'
					}}
					readonly
				/>
				<Text style={{ fontSize: 12 }}>
					{`-- ${item.author}, ${item.date}`}
				</Text>
			</View>
		);
	};

	return (
		<Animatable.View
			animation='fadeInUp'
			duration={2000}
			delay={1000}
		>
			<FlatList
				data={comments.filter((c) => c.campsiteId == campsite.id)}
				renderItem={renderCommentItem}
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
							onShowModal={_ => setShowModal(!showModal)}
						/>
						<Text style={styles.commentsTitle}>Comments</Text>
					</>
				}
			/>
			<Modal
				animationType='slide'
				transparent={false}
				visible={showModal}
				onRequestClose={_ => setShowModal(!showModal)}
			>
				<View style={styles.modal}>
					<Rating
						showRating
						startingValue={rating}
						imageSize={40}
						onFinishRating={r => setRating(r)}
						style={styles.rating}
						value={rating}
					/>
					<Input
						placeholder='Your name'
						leftIcon={{ name: 'user-o', type: 'font-awesome' }}
						leftIconContainerStyle={styles.leftIcon}
						onChangeText={t => setAuthor(t)}
						value={author}
					/>
					<Input
						placeholder='Comment ...'
						leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
						leftIconContainerStyle={styles.leftIcon}
						onChangeText={t => setText(t)}
						value={text}
					/>
					<View style={{ margin: 10 }}>
						<Button
							color='#5637dd'
							title='Submit'
							onPress={_ => {
								handleSubmit();
								resetForm();
							}}
						/>
					</View>
					<View style={{ margin: 10 }}>
						<Button
							color='#808080'
							title='Cancel'
							onPress={_ => setShowModal(!showModal)}
						/>
					</View>
				</View>
			</Modal>
		</Animatable.View>
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
	},
	modal: {
		justifyContent: 'center',
		margin: 20
	},
	leftIcon: {
		paddingRight: 10
	},
	rating: {
		paddingVertical: 10
	}
});
