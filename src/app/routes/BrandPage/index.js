import React from 'react';
import { connect } from 'react-redux';
import { loadBrand, updateBrand } from '../../../actions/Brand';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import CardBox from 'components/CardBox/index';
import Switch from 'material-ui/Switch';
import Avatar from 'material-ui/Avatar';
import { CloudUpload, Store, Info, FreeBreakfast } from 'material-ui-icons';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import StoreList from './StoreList';
import FoodList from './FoodList';

class BrandList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updatedBrand: {},
			value: 0
		};
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};
	componentDidMount() {
		this.props.onLoadBrand(this.props.match.params.id);
	}
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
	update(key, value) {
		this.setState(
			{
				updatedBrand: {
					...this.state.updatedBrand,
					[key]: value
				}
			},
			() => {
				const updatedBrand = {
					...this.props.activeBrand,
					...this.state.updatedBrand
				};
				this.props.onUpdateBrand(updatedBrand);
			}
		);
	}
	render() {
		const brand = this.props.activeBrand || {};
		return (
			<div className="app-wrapper">
				{/* <ContainerHeader match={this.props.match} title="My Brands" /> */}
				<div className="d-flex justify-content-center">
					<div className="animated slideInUpTiny animation-duration-3 w-100">
						<Paper>
							<Tabs
								value={this.state.value}
								onChange={this.handleChange}
								fullWidth
								indicatorColor="secondary"
								textColor="secondary"
								scrollable
								scrollButtons="on"
							>
								<Tab icon={<Info />} label="INFO" />
								<Tab icon={<Store />} label="STORES" />
								<Tab icon={<FreeBreakfast />} label="FOODS" />
							</Tabs>
							{this.state.value === 0 && (
								<div styleName="col-lg-12" className="p-5" heading={brand.name}>
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
										<div className="col-md-3 col-12">
											<h6
												style={{
													display: 'inline-block',
													paddingTop: '35px',
													color: 'gray'
												}}
											>
												Active
											</h6>
											<Switch
												classes={{
													checked: 'text-primary',
													bar: 'bg-primary'
												}}
												checked={brand.isDisabled}
												onChange={e =>
													this.update('isDisabled', e.target.checked)
												}
												aria-label="checkedA"
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
									</form>
								</div>
							)}
							{
								this.state.value === 1 && <StoreList brandId={brand.id} stores={brand.stores} />
							}
							{
								this.state.value === 2 && <FoodList brandId={brand.id} foods={brand.foods}></FoodList>
							}
						</Paper>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		activeBrand: state.brands.activeBrand || {}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoadBrand: id => {
			dispatch(loadBrand(id));
		},
		onUpdateBrand: brand => {
			dispatch(updateBrand(brand));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BrandList);
