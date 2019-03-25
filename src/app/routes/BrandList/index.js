import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import ListItem from './Component/ListItem';
import { connect } from 'react-redux';
import { loadBrands } from '../../../actions/Brand';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';

class BrandList extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.onLoadBrands(this.props.currentUser.id);
	}
	render() {
		const brands = this.props.brands;
		return (
			<div className="app-wrapper">
				{/* <ContainerHeader match={this.props.match} title="My Brands" /> */}
				<div className="d-flex justify-content-center">
					<div className="animated slideInUpTiny animation-duration-3 w-100">
						{brands.map((data, index) => (
							<ListItem key={index} data={data} styleName="card shadow " />
						))}
						<Button
							variant="raised"
							className="jr-btn jr-btn-label left bg-primary text-white"
						>
							<i className="zmdi zmdi-plus zmdi-hc-fw " />
							<span>
								<Link
									to="/dashboard/add-new-brand"
									style={{ textDecoration: 'none', color: 'white' }}
								>
									Create new brand
								</Link>
							</span>
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		...state.brands,
		currentUser: state.members.currentUser
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoadBrands: id => {
			dispatch(loadBrands(id));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandList);
