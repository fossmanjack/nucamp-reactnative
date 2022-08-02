import {
	Text,
	ScrollView,
} from 'react-native';
import {
	Card,
	Avatar,
	ListItem
} from 'react-native-elements';
import { useSelector } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseURL } from '../shared/baseURL';
import Loading from '../components/LoadingComponent';

export default function AboutScreen() {
	const partners = useSelector(S => S.partners);

	return (
		<ScrollView>
			<Animatable.View
				animation='fadeInDown'
				duration={2000}
				delay={1000}
			>
				<Mission />
				<Card>
					<Card.Title>Community Partners</Card.Title>
					<Card.Divider />
					<Partner partners={partners} />
				</Card>
			</Animatable.View>
		</ScrollView>
	);
}

const Mission = _ => {
	return (
		<Card>
			<Card.Title>
				Our Mission
			</Card.Title>
			<Card.Divider />
			<Text style={{
				textAlign: 'justify',
				margin: 10
			}}>
				We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
			</Text>
		</Card>
	);
}

const Partner = ({ partners }) => {
	return partners.isLoading ? <Loading />
		: partners.errMess ? <Text>{partners.errMess}</Text>
		: partners.partnersArray.map(pt => (
			<ListItem key={pt.id}>
				<Avatar
					rounded
					source={{ uri: baseURL + pt.image }}
				/>
				<ListItem.Content>
					<ListItem.Title>
						{pt.name}
					</ListItem.Title>
					<ListItem.Subtitle>
						{pt.description}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		));
}
/*
		{partners.partners.map(p =>
			<ListItem key={p.id}>
				<Avatar
					rounded
					source={{ uri: baseURL + p.image }}
				/>
				<ListItem.Content>
					<ListItem.Title>
						{p.name}
					</ListItem.Title>
					<ListItem.Subtitle>
						{p.description}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		)}
	);
}
*/
