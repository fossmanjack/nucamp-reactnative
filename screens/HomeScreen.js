import { Text, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

const FeaturedItem = ( { item } ) => {
	return item ? (
		<Card containerStyle={{ padding: 0 }}>
			<Card.Image source={item.image}>
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
	const [ campsites, setCampsites ] = useState(CAMPSITES);
	const [ partners, setPartners ] = useState(PARTNERS);
	const [ promotions, setPromotions ] = useState(PROMOTIONS);
	const featCampsite = campsites.find(c => c.featured);
	const featPartner = partners.find(pt => pt.featured);
	const featPromo = promotions.find(pr => pr.featured);

	return (
		<ScrollView>
			<FeaturedItem item={featCampsite} />
			<FeaturedItem item={featPromo} />
			<FeaturedItem item={featPartner} />
		</ScrollView>
	);
}
