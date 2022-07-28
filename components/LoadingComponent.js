import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View
} from 'react-native';

export default function Loading() {
	return <View style={styles.loadingView}>
		<ActivityIndicator
			size='large'
			color='#5637dd'
		/>
		<Text style={styles.loadingText}>
		</Text>
	</View>;
}

const styles = StyleSheet.create({
	loadingView: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	loadingText: {
		color: '#5637dd',
		fontSize: 14,
		fontWeight: 'bold'
	}
});
