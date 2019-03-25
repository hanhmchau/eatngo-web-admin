import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleCollapsedNav } from 'actions/index';

import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import SamplePage from './routes/SamplePage';
import BrandPage from './routes/BrandPage';
import FoodPage from './routes/FoodPage';
import NewBrandPage from './routes/NewBrandPage';
import BrandList from './routes/BrandList';
import { isIOS, isMobile } from 'react-device-detect';
import '../assets/styles.scss';

import { COLLAPSED_DRAWER, FIXED_DRAWER } from 'constants/ActionTypes';

class App extends React.Component {
	onToggleCollapsedNav = () => {
		const val = !this.props.navCollapsed;
		this.props.toggleCollapsedNav(val);
	};

	render() {
		if (!this.props.currentUser) {
			return <Redirect to="/login" />;
		}
		const { match, drawerType } = this.props;
		const drawerStyle = drawerType.includes(FIXED_DRAWER)
			? 'fixed-drawer'
			: drawerType.includes(COLLAPSED_DRAWER)
			? 'collapsible-drawer'
			: 'mini-drawer';
		//set default height and overflow for iOS mobile Safari 10+ support.
		if (isIOS && isMobile) {
			$('#body').addClass('ios-mobile-view-height');
		} else if ($('#body').hasClass('ios-mobile-view-height')) {
			$('#body').removeClass('ios-mobile-view-height');
		}
		return (
			<div className={`app-container ${drawerStyle}`}>
				<Sidebar onToggleCollapsedNav={this.onToggleCollapsedNav.bind(this)} />
				<div className="app-main-container">
					<div className="app-header">
						<Header
							drawerType={drawerType}
							onToggleCollapsedNav={this.onToggleCollapsedNav}
						/>
					</div>

					<main className="app-main-content-wrapper">
						<div className="app-main-content">
							<Route path={`${match.url}/sample-page`} component={SamplePage} />
							<Route path={`${match.url}/my-brands`} component={BrandList} />
							<Route
								path={`${match.url}/add-new-brand`}
								component={NewBrandPage}
							/>
							<Route path={`${match.url}/brand/:id`} component={BrandPage} />
							<Route path={`${match.url}/food/:id`} component={FoodPage} />
						</div>
						{/* <Footer /> */}
					</main>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ settings, members }) => {
	const { navCollapsed, drawerType } = settings;
	return { navCollapsed, drawerType, currentUser: members.currentUser };
};
export default connect(
	mapStateToProps,
	{ toggleCollapsedNav }
)(App);
