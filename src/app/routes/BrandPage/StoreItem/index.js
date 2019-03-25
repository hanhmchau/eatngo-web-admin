import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import { connect } from 'react-redux';
import { updateStore, deleteStore } from 'actions/Brand';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import { TextField } from 'material-ui';
import { TimePicker } from 'material-ui-pickers';
import Divider from 'material-ui/Divider';
import { updateStoreInternally } from '../../../../actions/Brand';

class StoreItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
	}
	componentDidMount() {}
	openCloudinaryWidget(id = 0) {
		const that = this;
		window.cloudinary.openUploadWidget(
			{ cloud_name: 'dd7m2qcf4', upload_preset: 'kauzccgl', tags: ['xmas'] },
			function(error, result) {
				if (!error) {
					that.update('image', result[0].url);
				}
			}
		);
	}
	update(key, value) {
		this.props.onUpdateStoreInternally({
			...this.props.data,
			[key]: value
		});
	}
	updateAtServer() {
		this.props.onUpdateStore({
			...this.props.data
		});
	}
	render() {
		let {
			id,
			image,
			name,
			address,
			phone,
			openingHour = new Date(),
			closingHour
		} = this.props.data;
		openingHour = new Date(`${new Date().toDateString()} ${openingHour}`);
		closingHour = new Date(`${new Date().toDateString()} ${closingHour}`);
		return (
			<div className={'user-list d-flex flex-row w-100'}>
				<Avatar
					onClick={() => this.openCloudinaryWidget(id)}
					alt="..."
					src={image}
					className="user-avatar avatar-shadow image-uploader"
				/>
				<div className="description w-100">
					<div className="row">
						<div className="col-md-4 col-12">
							<TextField
								id="name"
								label="Name"
								value={name}
								onChange={e => this.update('name', e.target.value)}
								margin="normal"
								fullWidth
							/>
						</div>
						<div className="col-md-3 col-12">
							<TextField
								id="phone"
								label="Phone number"
								value={phone}
								onChange={e => this.update('phone', e.target.value)}
								margin="normal"
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12 col-12">
							<TextField
								id="address"
								label="Address"
								value={address}
								onChange={e => this.update('address', e.target.value)}
								margin="normal"
								fullWidth
							/>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-md-2 col-12 my-0">
							<div key="basic_time" className="picker">
								<TimePicker
									showTodayButton
									label="Opening Hour"
									todayLabel="now"
									value={openingHour}
									onChange={() => {}}
								/>
							</div>
						</div>
						<div className="col-md-4 col-12">
							<div className="picker">
								<TimePicker
									showTodayButton
									label="Closing Hour"
									todayLabel="now"
									value={closingHour}
									onChange={() => {}}
								/>
							</div>
						</div>
					</div>
					<ul className="list-inline d-sm-flex flex-sm-row jr-mbtn-list">
						<li>
							<Button
								onClick={() => {
									this.updateAtServer();
								}}
								color="primary"
							>
								Save
							</Button>
						</li>
						<li>
							<Button
								onClick={() => {
									this.props.openDeleteModal(id);
								}}
								color="secondary"
							>
								Delete
							</Button>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onDeleteStore: id => {
			dispatch(deleteStore(id));
		},
		onUpdateStore: store => {
			dispatch(updateStore(store));
		},
		onUpdateStoreInternally: store => {
			dispatch(updateStoreInternally(store));
		}
	};
};

export default connect(
	null,
	mapDispatchToProps
)(StoreItem);
