import { useState} from 'react';
import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';
import { View } from 'react-native';
import CampsiteInfoScreen from './CampsiteInfoScreen';

const Main = _ => {
	const [ campsites, setCampsites ] = useState(CAMPSITES);
	const [ selectedCampsiteId, setSelectedCampsiteId ] = useState();

	return (
		<View style={{ flex: 1 }}>
			<DirectoryScreen
				campsites={campsites}
				onPress={campsiteId => setSelectedCampsiteId(campsiteId)}
			/>
			<CampsiteInfoScreen
				campsite={campsites.filter(c => c.id === selectedCampsiteId)[0]}
			/>
		</View>
	);
};

export default Main;
