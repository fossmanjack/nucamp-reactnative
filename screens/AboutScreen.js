import { useState } from 'react';
import {
	Text,
	ScrollView,
} from 'react-native';
import {
	Card,
	Avatar,
	ListItem
} from 'react-native-elements';
import { PARTNERS } from '../shared/partners';

export default function AboutScreen() {
	const [ partners, setPartners ] = useState(PARTNERS);

	return (
		<ScrollView>
			<Mission />
			<Partner partners={partners} />
		</ScrollView>
	);
}

const Mission = _ => {
	return (
		<Card style={{
			margin: 10
		}}
		>
			<Card.Title>
				Our Mission
			</Card.Title>
			<Card.Divider />
			<Text style={{
				textAlign: 'justify'
			}}>
				We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.
			</Text>
		</Card>
	);
}

const Partner = ({ partners }) => {
	return (
		<Card>
			<Card.Title>
				Community Partners
			</Card.Title>
			<Card.Divider />
			{partners.map(p =>
				<ListItem key={p.id}>
					<Avatar
						rounded
						source={p.image}
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
		</Card>
	);
}
