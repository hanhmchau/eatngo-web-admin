import React from 'react';
import { connect } from 'react-redux';
import { createBrand } from '../../../actions/Brand';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import CardBox from 'components/CardBox/index';
import Switch from 'material-ui/Switch';
import Avatar from 'material-ui/Avatar';
import { CloudUpload } from 'material-ui-icons';

class BrandList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			brand: {
				name: '',
				description: '',
				avatar: '',
				creatorId: props.currentUser ? props.currentUser.id : 1
			}
		};
	}
	componentDidMount() {}
	openCloudinaryWidget() {
		const that = this;
		window.cloudinary.openUploadWidget(
			{ cloud_name: 'dd7m2qcf4', upload_preset: 'kauzccgl', tags: ['xmas'] },
			function(error, result) {
				if (!error) {
					that.update('avatar', result[0].url);
				}
			}
		);
	}
	createBrand() {
		this.props.onCreateBrand({
			brand: this.state.brand,
			history: this.props.history
		});
	}
	update(key, value) {
		this.setState(
			{
				brand: {
					...this.state.brand,
					[key]: value
				}
			},
			() => {}
		);
	}
	render() {
		const brand = this.state.brand || {};
		return (
			<div className="app-wrapper">
				{/* <ContainerHeader match={this.props.match} title="My Brands" /> */}
				<div className="d-flex justify-content-center">
					<div className="animated slideInUpTiny animation-duration-3 w-100">
						<CardBox styleName="col-lg-12" heading="Create new brand">
							<Avatar
								onClick={() => this.openCloudinaryWidget()}
								alt="Remy Sharp"
								className="big-avatar"
								src={brand.avatar}
							>
								{!brand.avatar && <CloudUpload />}
							</Avatar>
							<form className="row" noValidate autoComplete="off">
								<div className="col-md-3 col-12">
									<TextField
										id="name"
										label="Name"
										defaultValue={brand.name}
										onChange={e => {
											this.update('name', e.target.value);
										}}
										margin="normal"
										fullWidth
									/>
								</div>
								<div className="col-12">
									<TextField
										id="name"
										label="Description"
										multiline={true}
										rows={1}
										rowsMax={4}
										defaultValue={brand.description}
										onChange={e => {
											this.update('description', e.target.value);
										}}
										margin="normal"
										fullWidth
									/>
								</div>
								<Button
									variant="raised"
									className="jr-btn jr-btn-label left bg-primary text-white m-3"
									onClick={() => this.createBrand()}
								>
									<i className="zmdi zmdi-check zmdi-hc-fw " />
									<span>Create brand</span>
								</Button>
							</form>
						</CardBox>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return state.members;
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateBrand: brand => {
			dispatch(createBrand(brand));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandList);
