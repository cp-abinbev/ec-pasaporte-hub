import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RouterComponent from './router/Router';

import { useComponents } from './components';

import GetGlobalHOC from './hoc/GetGlobalHOC';
import ErrorBoundary from './hoc/ErrorBoundary';

import { useStoreConfig } from './redux/store';

const App = () => {
	const { Layout, DefaultLoading } = useComponents();

	const { persistor, store } = useStoreConfig();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<Suspense fallback={<DefaultLoading />}>
						<GetGlobalHOC>
							<Layout>
								<ErrorBoundary>
									<RouterComponent />
								</ErrorBoundary>
							</Layout>
						</GetGlobalHOC>
					</Suspense>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
};

export default App;
