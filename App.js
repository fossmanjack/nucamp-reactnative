import { useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import Main from './screens/MainComponent';
import Loading from './components/LoadingComponent';

export default function App() {
	const [ debug, setDebug ] = useState(true);

	return (
		<PersistGate
			loading={<Loading />}
			persistor={persistor}
		>
			<NavigationContainer>
				<Provider store={store}>
					<Main />
				</Provider>
			</NavigationContainer>
		</PersistGate>
	);
}
