import React from 'react';
import { connect } from 'react-redux';
import {
	loadFood,
	updateFood,
	loadFoodTypes,
	addFoodImage,
	deleteFoodImage
} from 'actions/Brand';
import Button from 'material-ui/Button';
import { Link, withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import CardBox from 'components/CardBox/index';
import Switch from 'material-ui/Switch';
import Avatar from 'material-ui/Avatar';
import {
	CloudUpload,
	Store,
	Info,
	FreeBreakfast,
	Delete,
	Clear,
	LiveTv
} from 'material-ui-icons';
import Paper from 'material-ui/Paper';
import ContainerHeader from 'components/ContainerHeader';
import {
	FormControl,
	MenuItem,
	Select,
	InputLabel,
	Card,
	IconButton,
	List
} from 'material-ui';
import { Slider } from 'material-ui-slider';
import { CardMedia } from 'material-ui';
import { CardActions } from 'material-ui';
import { Checkbox } from 'material-ui';

class FoodPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updatedFood: {},
			value: 0
		};
		this.props.onLoadFoodTypes();
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};
	componentDidMount() {
		this.props.onLoadFood(this.props.match.params.id);
	}
	openCloudinaryWidget() {
		const that = this;
		window.cloudinary.openUploadWidget(
			{ cloud_name: 'dd7m2qcf4', upload_preset: 'kauzccgl', tags: ['xmas'] },
			function(error, result) {
				if (!error) {
					that.props.onAddFoodImage(that.props.activeFood, result[0].url);
				}
			}
		);
	}
	deleteImage(img) {
		// let images = this.props.activeFood.images || [];
		// images = images.filter(ig => ig.image !== img.image);
		this.props.onDeleteFoodImage(this.props.activeFood, img.image);
	}
	deleteAttribute(order) {
		let attributes = this.props.activeFood.attributes || [];
		attributes = attributes.filter((val, index) => index !== order);
		this.update('attributes', attributes);
	}
	deleteOption(attributeOrder, optionOrder) {
		let attributes = this.props.activeFood.attributes || [];
		let attr = attributes[attributeOrder];
		attr.options = attr.options.filter((val, index) => index !== optionOrder);
		this.update('attributes', attributes);
	}
	addOption(attributeOrder) {
		let attributes = this.props.activeFood.attributes || [];
		let attr = attributes[attributeOrder];
		attr.options.push({
			name: 'New option',
			price: 0
		});
		this.update('attributes', attributes);
	}
	updateAttribute(attributeOrder, key, value) {
		let attributes = this.props.activeFood.attributes || [];
		let attr = attributes[attributeOrder];
		attr[key] = value;
		this.update('attributes', attributes);
	}
	updateOption(attributeOrder, optionOrder, key, value) {
		let attributes = this.props.activeFood.attributes || [];
		let attr = attributes[attributeOrder];
		const opt = attr.options[optionOrder];
		opt[key] = value;
		this.update('attributes', attributes);
	}
	addNewAttribute() {
		const attributes = this.props.activeFood.attributes || [];
		attributes.push({
			name: 'New attribute',
			compulsory: false,
			options: [
				{
					name: 'New option 1',
					price: 0
				},
				{
					name: 'New option 2',
					price: 0
				}
			]
		});
		this.update('attributes', attributes);
	}
	update(key, value) {
		this.setState(
			{
				updatedFood: {
					...this.state.updatedFood,
					[key]: value
				}
			},
			() => {
				const updatedFood = {
					...this.props.activeFood,
					...this.state.updatedFood
				};
				this.props.onUpdateFood(updatedFood);
			}
		);
	}
	render() {
		const food = this.props.activeFood || {
			images: [],
			type: {}
		};
		const repImage = food.images[0];
		food.attributes = food.attributes ? food.attributes : [];
		const {
			typeId,
			images,
			id,
			name,
			description,
			price,
			sour,
			spicy,
			attributes = []
		} = {
			...food
		};
		console.log(attributes);
		return (
			<div className="app-wrapper">
				<ContainerHeader
					match={this.props.match}
					title={food.name}
					hasBreadcrumb={false}
				/>
				<div className="d-flex justify-content-center">
					<div className="animated slideInUpTiny animation-duration-3 w-100">
						<Paper>
							<div styleName="col-lg-12" className="p-5" heading={food.name}>
								<Avatar
									className="big-avatar avatar-shadow image-uploader"
									src={repImage && repImage.image}
								>
									{!repImage && <CloudUpload />}
								</Avatar>
								<form className="row" noValidate autoComplete="off">
									<div className="col-md-3 col-12">
										<TextField
											id="name"
											label="Name"
											value={name}
											onChange={e => {
												this.update('name', e.target.value);
											}}
											margin="normal"
											fullWidth
										/>
									</div>
									<div className="col-md-3 col-12">
										<TextField
											id="standard-number"
											label="Price"
											value={price}
											onChange={e => {
												this.update('price', e.target.value);
											}}
											type="number"
											margin="normal"
										/>
									</div>
									<div className="col-12">
										<TextField
											id="name"
											label="Description"
											multiline={true}
											rows={1}
											rowsMax={4}
											value={description}
											onChange={e => {
												this.update('description', e.target.value);
											}}
											margin="normal"
											fullWidth
										/>
									</div>
									<div className="col-12 mt-3">
										<FormControl>
											<InputLabel htmlFor="age-simple">Type</InputLabel>
											<Select
												onChange={e => this.update('typeId', e.target.value)}
												value={typeId || 1}
											>
												{this.props.foodTypes.map(data => (
													<MenuItem key={data.id} value={data.id}>
														{data.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
									<div className="col-12 mt-3">
										<FormControl>
											<InputLabel htmlFor="age-simple">
												Sour ({sour})
											</InputLabel>
											<div
												className="mt-5"
												style={{ width: 768, maxWidth: '100%' }}
											>
												<Slider
													onChangeComplete={val => this.update('sour', val)}
													color="#bf4040"
													defaultValue={sour}
													min={0}
													max={10}
												/>
											</div>
										</FormControl>
									</div>
									<div className="col-12 mt-3">
										<FormControl>
											<InputLabel htmlFor="age-simple">
												Spicy ({spicy})
											</InputLabel>
											<div
												className="mt-5"
												style={{ width: 768, maxWidth: '100%' }}
											>
												<Slider
													onChangeComplete={val => this.update('spicy', val)}
													color="#bf4040"
													defaultValue={spicy}
													min={0}
													max={10}
												/>
											</div>
										</FormControl>
									</div>
									<div className="col-12 mt-3">
										<h6>Images</h6>
										{images.map(img => (
											<div
												style={{
													display: 'inline-block',
													position: 'relative'
												}}
											>
												<IconButton
													onClick={() => this.deleteImage(img)}
													style={{
														position: 'absolute',
														right: '0'
													}}
													size="small"
												>
													<Delete />
												</IconButton>
												<Card
													style={{
														display: 'inline-block',
														margin: '20px 20px 0 0'
													}}
												>
													<CardMedia
														component="img"
														alt="Contemplative Reptile"
														height="140"
														image={img.image}
														title="Contemplative Reptile"
													/>
												</Card>
											</div>
										))}
										<Avatar
											onClick={() => this.openCloudinaryWidget()}
											className="image-uploader"
										>
											<CloudUpload />
										</Avatar>
									</div>
									<div className="col-12 mt-3">
										<h6>Attributes</h6>
										{attributes.map((attr, attributeOrder) => (
											<div className="my-4">
												<TextField
													onChange={e =>
														this.updateAttribute(
															attributeOrder,
															'name',
															e.target.value
														)
													}
													label="Attribute"
													value={attr.name}
												/>
												<Checkbox
													onChange={e =>
														this.updateAttribute(
															attributeOrder,
															'compulsory',
															e.target.checked
														)
													}
													label="Compulsory"
													checked={attr.compulsory}
												/>
												<IconButton
													onClick={() => this.deleteAttribute(attributeOrder)}
													size="small"
												>
													<Delete />
												</IconButton>

												<List>
													{attr.options.map((opt, optionOrder) => (
														<div className="row ml-5 mt-2">
															<TextField
																onChange={e =>
																	this.updateOption(
																		attributeOrder,
																		optionOrder,
																		'name',
																		e.target.value
																	)
																}
																className="col-md-7 mr-4"
																label="Option"
																value={opt.name}
															/>
															<TextField
																onChange={e =>
																	this.updateOption(
																		attributeOrder,
																		optionOrder,
																		'price',
																		e.target.value
																	)
																}
																className="col-md-4"
																label="Price"
																value={opt.price}
															/>
															<IconButton
																onClick={() =>
																	this.deleteOption(attributeOrder, optionOrder)
																}
																size="small"
															>
																<Clear />
															</IconButton>
														</div>
													))}
													<Button
														className="ml-4 mt-2 jr-btn jr-btn-label left text-primary"
														onClick={() => this.addOption(attributeOrder)}
													>
														Add new option
													</Button>
												</List>
											</div>
										))}
										<Button
											onClick={() => this.addNewAttribute()}
											variant="raised"
											className="jr-btn jr-btn-label left bg-primary text-white"
										>
											<i className="zmdi zmdi-plus zmdi-hc-fw " />
											<span>Add new attribute</span>
										</Button>
									</div>
								</form>
							</div>
						</Paper>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		foodTypes: state.brands.foodTypes || [],
		activeFood: state.brands.activeFood
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLoadFood: id => {
			dispatch(loadFood(id));
		},
		onUpdateFood: brand => {
			dispatch(updateFood(brand));
		},
		onLoadFoodTypes: () => {
			dispatch(loadFoodTypes());
		},
		onAddFoodImage: (food, image) => {
			dispatch(addFoodImage(food, image));
		},
		onDeleteFoodImage: (food, image) => {
			dispatch(deleteFoodImage(food, image));
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FoodPage);
