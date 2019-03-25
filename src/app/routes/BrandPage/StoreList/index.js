import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import StoreItem from '../StoreItem';
import { connect } from 'react-redux';
import { addStore, deleteStore } from 'actions/Brand';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import Dialog, {
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText
} from 'material-ui/Dialog';

const defaultStore = {
	name: '',
	address: '',
	phone: '',
	openingHour: '08:00:00',
	closingHour: '18:00:00',
	image: 'https://via.placeholder.com/300'
};

class StoreList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			activeStoreId: 0
		};
	}
	componentDidMount() {
		// this.props.onLoadStores(1);
	}
	handleClickOpen = id => {
		this.setState({ open: true, activeStoreId: id });
	};
	handleClose = () => {
		this.setState({ open: false, activeStoreId: 0 });
	};
	deleteStore() {
		this.props.onDeleteStore(this.state.activeStoreId);
		this.handleClose();
	}
	addStore() {
		this.props.onAddStore({
			...defaultStore,
			brandId: this.props.brandId
		});
	}
	render() {
		const stores = this.props.stores;
		return (
			<div className="app-wrapper">
				{/* <ContainerHeader match={this.props.match} title="My Brands" /> */}
				<div className="d-flex justify-content-center">
					<div className="animated slideInUpTiny animation-duration-3 w-100">
						{stores
							.sort((a, b) => a.id - b.id)
							.map((data, index) => (
								<StoreItem
									key={index}
									data={{ ...data }}
									brandId={this.props.brandId}
									openDeleteModal={this.handleClickOpen.bind(this)}
									styleName="card shadow "
								/>
							))}
						<Button
							onClick={() => this.addStore()}
							variant="raised"
							className="jr-btn jr-btn-label left bg-primary text-white"
						>
							<i className="zmdi zmdi-plus zmdi-hc-fw " />
							<span>Create new store</span>
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
						Delete this store?
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-slide-description">
							Are you sure you want to delete this store? This action is
							irreversible.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose.bind(this)} color="secondary">
							Cancel
						</Button>
						<Button onClick={this.deleteStore.bind(this)} color="primary">
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
		onAddStore: store => {
			dispatch(addStore(store));
		},
		onDeleteStore: id => {
			dispatch(deleteStore(id));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(StoreList);
