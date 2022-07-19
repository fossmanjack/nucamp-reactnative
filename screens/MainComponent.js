import { useState} from 'react';
import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';

const Main = _ => {
	const [ campsites, setCampsites ] = useState(CAMPSITES);

	return <DirectoryScreen campsites={campsites} />;
};

export default Main;
