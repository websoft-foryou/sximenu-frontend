import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';

import  Bootbox  from  'bootbox-react';
import ReactTable from "react-table";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import ImageUploader from "react-images-upload";

import NewCategoryImage from "../../assets/images/category.png";
import myAPI from "../../../Api";
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/mystyle.css';
import '../../assets/css/dashboard.scss';


// reference url: https://developer.aliyun.com/mirror/npm/package/react-table-v6

class Category extends Component {
    constructor(props) {
        super(props);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.state = {
            processing: 'Submit',
            loading: false,
            showConfirm: false,
            showModal: false,
            table_data: [],
            category_name_en: '',
            category_name_hb: '',
            initial_image: [],
        };
        this.auth = this.props.auth;
        this.category_image = [];
        this.category_id = 0;
    }

    componentDidMount() {
        this.getAllCategories();
    }

    getAllCategories = () => {
        this.setState({loading: true});
        try {
            myAPI.getAllCategories(this.auth.getToken()).then(response => {
                this.setState({ table_data: response.data.result});
            });
        } catch(err) {
            toast.error(err.message);
        } finally {
            this.setState({loading: false});
            this.category_id = 0;
        }
    };

    saveData = () => {
        if (this.category_id === 0)
            this.storeCategory();
        else
            this.updateCategory();
    };

    storeCategory = async() => {
        this.setState({processing: 'Adding...'});
        try {
            await myAPI.addCategory({
                category_name_en: this.state.category_name_en,
                category_name_hb: this.state.category_name_hb,
                category_image: this.category_image,
                is_freemium: this.auth.isFreemium(),
                is_premium: this.auth.isPremium()
            }, this.auth.getToken()).then(response => {
                if (response.data.success === true) {
                    this.toggleModal();
                    this.getAllCategories();
                }
                else
                    toast.warn(response.data.result);
            });
        } catch(err) {
            toast.error(err.message);
        } finally {
            this.setState({processing: 'Submit'});
        }
    };
    updateCategory = async() => {

        this.setState({processing: 'Updating...'});
        try {
            await myAPI.updateCategory({
                category_name_en: this.state.category_name_en,
                category_name_hb: this.state.category_name_hb,
                category_image: this.category_image,
                is_freemium: this.auth.isFreemium(),
                is_premium: this.auth.isPremium()
            }, this.auth.getToken(), this.category_id).then(response => {
                if (response.data.success === true) {
                    this.toggleModal();
                    this.getAllCategories();
                }
                else
                    toast.warn(response.data.result);
            });
        } catch(err) {
            toast.error(err.message);
        } finally {
            this.setState({processing: 'Submit'});
        }
    };
    removeCategory = async() => {
        this.setState({ showConfirm: false});
        this.setState({loading: true});
        try {
            await myAPI.removeCategory(this.auth.getToken(), this.category_id).then(response => {
                if (response.data.success === true)
                    this.getAllCategories();
                else
                    toast.warn(response.data.result);
            });
        } catch(err) {
            toast.error(err);
        } finally {
            this.setState({loading: false});
        }
    };
    
    toggleModal = () => {
        this.setState( { showModal: ! this.state.showModal })
    };

    addCategoryModal = () => {
        this.setState({
            category_name_en: '',
            category_name_hb: '',
            initial_image: []
        });
        this.category_image = [];
        this.category_id = 0;
        this.toggleModal();
    };

    editCategoryModeal = (item) => {

        let image = [];
        image.push(item.image);
        this.setState({
            category_name_en: item.category_name_en,
            category_name_hb: item.category_name_hb,
            initial_image: image
        });

        this.category_image = image;
        this.category_id = item.category_id;
        this.toggleModal();

    };

    toggleConfirm = (item) => {
        if (item) {
            this.category_id = item.category_id;
            this.setState({ showConfirm: true })
        }

    };

    handleImageUpload(pictureFiles, pictureDataURLs) {
        this.category_image = pictureDataURLs;
    }
    
    render() {

        const columns = [
            { Header: 'Image', accessor: 'image', filterable: false, style: { textAlign: 'center'},
                Cell: row => <img src={row.original.image} style={{height: `30px`}} alt="Category"/>
            },
            { Header: 'Name (EN)', accessor: 'category_name_en', filterable: false, style: { textAlign: 'center'} },
            { Header: 'Name (HB)', accessor: 'category_name_hb', filterable: false, style: { textAlign: 'center'} },
            { Header: 'Action', accessor: 'category_id', filterable: false, style: { textAlign: 'center'},
                Cell: row =>
                    <div>
                        <span className='datamng-control edit' onClick={() => this.editCategoryModeal(row) }>
                            <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i>
                        </span>
                        <span className='datamng-control delete' onClick={() => this.toggleConfirm(row)}>
                            <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}></i>
                        </span>
                    </div>
            }
        ];

        return (
            <Fragment>
                <Breadcrumb title="Category" parent="Data" />
                {this.state.loading &&
                <div id="myOverlay" className="overlay">
                    <div className="overlay-content">
                        <div className="loader-box" style={{display: "block"}}>
                            <div className="loader">
                                <div className="line bg-warning"></div>
                                <div className="line bg-warning"></div>
                                <div className="line bg-warning"></div>
                                <div className="line bg-warning"></div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-4 col-lg-2" key={`category_box_0`}>
                                            <div className="card category-box">
                                                <div className="card-body category-body">
                                                    <img key={`category_image_add`}  src={NewCategoryImage} alt="Category" />
                                                    <div className="category-body-hover">
                                                        <ul>
                                                            <li>
                                                                <button className="btn" type="button" onClick={() => this.addCategoryModal()}>
                                                                    <i className="fa fa-plus"></i>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="card-footer category-footer text-center" style={{margin: '15px'}}>
                                                    <button type="button" className="btn btn-default" onClick={() => this.addCategoryModal()}>New Category</button>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            this.state.table_data.map((item, i) =>

                                                <div className="col-12 col-sm-6 col-md-4 col-lg-2" key={`category_box_${item.category_id}`}>
                                                    <div className="card category-box">
                                                        <div className="card-body category-body">
                                                            <img src={item.image}  />
                                                            <div className="category-body-hover">
                                                                <ul>
                                                                    <li>
                                                                        <button className="btn" type="button" onClick={() => this.editCategoryModeal(item) }>
                                                                            <i className="fa fa-edit"></i>
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="btn" type="button" onClick={() => this.toggleConfirm(item)}>
                                                                            <i className="fa fa-scissors"></i>
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer category-footer">
                                                            <span><label>EN:</label> {item.category_name_en}</span>
                                                            <span><label>HB:</label> {item.category_name_hb}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                <ToastContainer />
                <Modal isOpen={this.state.showModal} toggle={() => this.toggleModal()}>
                    <ModalHeader toggle={() => this.toggleModal()}>New Category</ModalHeader>
                    <ModalBody>
                        <form className="needs-validation" noValidate="" >
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="category_image">Category Image:</label>
                                { this.auth.isFreemium() &&
                                    <span className="freemium">* You are Freemium. So can not upload image.</span>
                                }
                                { this.auth.isPremium() &&
                                    <ImageUploader
                                        withIcon={true}
                                        withPreview={true}
                                        singleImage={true}
                                        buttonText='Choose images'
                                        defaultImages={this.state.initial_image}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        onChange={this.handleImageUpload}
                                    />

                                }
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="category_name_en">Category Name (EN):</label>
                                <input className="form-control" type="text" placeholder="" value={this.state.category_name_en} onChange={e => this.setState({category_name_en: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="category_name_hb">Category Name (HB):</label>
                                {this.auth.isFreemium() &&
                                    <span className="freemium">* You are Freemium. So can not edit this field.</span>
                                }
                                {this.auth.isPremium() &&
                                    <input className="form-control" type="text" placeholder="" value={this.state.category_name_hb}
                                        onChange={e => this.setState({category_name_hb: e.target.value})} />
                                }
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                        <Button color="primary" onClick={() => this.saveData()}>{this.state.processing}</Button>
                    </ModalFooter>
                </Modal>

                <Bootbox show={this.state.showConfirm}
                         type={"confirm"}
                         message={"The category will be removed. Are you sure?"}
                         onSuccess={() => this.removeCategory()}
                         onCancel={() => this.setState({showConfirm: false})}
                />

            </Fragment>

        );
    }
};

export default Category;