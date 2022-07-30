import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useState } from 'react';

export default function App() {
	const [ debug, setDebug ] = useState(true);

	return (
		<NavigationContainer>
			<Provider store={store}>
				<Main />
			</Provider>
		</NavigationContainer>
	);
}
