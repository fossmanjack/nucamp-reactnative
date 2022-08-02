import { Text, View, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { baseURL } from '../shared/baseURL';
import Loading from '../components/LoadingComponent';

const FeaturedItem = props => {
	const { item } = props;

	return props.isLoading ? <Loading />
		: props.errMess ? (
			<View>
				<Text>{props.errMess}</Text>
			</View>
		) : item ? (
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
	const scaleValue = useRef(new Animated.Value(0)).current;
	const scaleAnimation = Animated.timing(
		scaleValue,
		{
			toValue: 1,
			duration: 1500,
			useNativeDriver: true
		}
	);

	useEffect(_ => scaleAnimation.start(), []);

	return (
		<Animated.ScrollView style={{ transform: [{ scale: scaleValue }] }}>
			<FeaturedItem
				item={featCampsite}
				isLoading={campsites.isLoading}
				errMess={campsites.errMess}
			/>
			<FeaturedItem
				item={featPromo}
				isLoading={promotions.isLoading}
				errMess={promotions.errMess}
			/>
			<FeaturedItem
				item={featPartner}
				isLoading={partners.isLoading}
				errMess={partners.errMess}
			/>
		</Animated.ScrollView>
	);
}
