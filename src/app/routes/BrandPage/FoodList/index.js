import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import StoreItem from '../StoreItem';
import { connect } from 'react-redux';
import { addFood, deleteFood } from 'actions/Brand';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import Dialog, {
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText
} from 'material-ui/Dialog';
import FoodItem from '../FoodItem';
import { List } from 'material-ui';

const defaultFood = {
	name: 'Name',
	price: 10,
	description: 'Description',
    sour: 0,
    spicy: 0,
    typeId: 1,
	images: ['https://via.placeholder.com/300']
};

class FoodList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			activeFoodId: 0
		};
	}
	componentDidMount() {
		// this.props.onLoadStores(1);
	}
	handleClickOpen = id => {
		this.setState({ open: true, activeFoodId: id });
	};
	handleClose = () => {
		this.setState({ open: false, activeFoodId: 0 });
	};
	deleteFood() {
		this.props.onDeleteFood(this.state.activeFoodId);
		this.handleClose();
	}
	addFood() {
		this.props.onAddFood({
			...defaultFood,
			brandId: this.props.brandId
		});
	}
	render() {
		const foods = this.props.foods || [];
		return (
			<div className="app-wrapper">
				{/* <ContainerHeader match={this.props.match} title="My Brands" /> */}
				<div className="d-flex justify-content-center">
					<div className="animated slideInUpTiny animation-duration-3 w-100">
						<List>
							{foods
								.sort((a, b) => a.id - b.id)
								.map((data, index) => (
									<FoodItem key={index} data={data} openDeleteModal={this.handleClickOpen.bind(this)} />
								))}
						</List>
						<Button
							onClick={() => this.addFood()}
							variant="raised"
							className="jr-btn jr-btn-label left bg-primary text-white"
						>
							<i className="zmdi zmdi-plus zmdi-hc-fw " />
							<span>Create new food</span>
						</Button>
					</div>
				</div>
				<Dialog
					open={this.state.open}
					keepMounted
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
				>
					<DialogTitle id="alert-dialog-slide-title">
						Delete this food item?
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							Are you sure you want to delete this food item? This action is
							irreversible.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose.bind(this)} color="secondary">
							Cancel
						</Button>
						<Button onClick={this.deleteFood.bind(this)} color="primary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddFood: store => {
			dispatch(addFood(store));
		},
		onDeleteFood: id => {
			dispatch(deleteFood(id));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(FoodList);
