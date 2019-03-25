import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import configureStore from './store/index';

const store = configureStore();

const rootEl = document.getElementById('app-site');
AccountKit.init({
    appId: '559717777526537',
    state: 'b895234af645976dee1e39a60fdd0592',
    version: 'v3.2',
    fbAppEventsEnabled: true,
    redirect: '{{REDIRECT_URL}}'
});
console.log('Initializing account kit.');

// Create a reusable render method that we can call more than once
let render = () => {
	// Dynamically import our main App component, and render it
	const App = require('./containers/App').default;

	ReactDOM.render(
		<Provider store={store}>
			<HashRouter basename="/">
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</HashRouter>
		</Provider>,
		rootEl
	);
};

if (module.hot) {
	// Support hot reloading of components.
	// Whenever the App component file or one of its dependencies
	// is changed, re-import the updated component and re-render it
	module.hot.accept('./containers/App', () => {
		setTimeout(render);
	});
}
render();
