import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseURL } from '../shared/baseURL';

const FeaturedItem = ( { item } ) => {
	return item ? (
		<Card containerStyle={{ padding: 0 }}>
			<Card.Image source={{ uri: baseURL + item.image }}>
				<View style={{ justifyContent: 'center', flex: 1 }}>
					<Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
						{item.name}
					</Text>
				</View>
			</Card.Image>
			<Text style={{ margin: 20 }}>
				{item.description}
			</Text>
		</Card>
	) : <View />;
}

export default function HomeScreen() {
	const campsites = useSelector(S => S.campsites);
	const promotions = useSelector(S => S.promotions);
	const partners = useSelector(S => S.partners);
	const featCampsite = campsites.campsitesArray.find(c => c.featured);
	const featPartner = partners.partnersArray.find(pt => pt.featured);
	const featPromo = promotions.promotionsArray.find(pr => pr.featured);

	return (
		<ScrollView>
			<FeaturedItem item={featCampsite} />
			<FeaturedItem item={featPromo} />
			<FeaturedItem item={featPartner} />
		</ScrollView>
	);
}
