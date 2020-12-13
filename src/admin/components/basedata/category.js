import React, { Fragment, Component, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';

import  Bootbox  from  'bootbox-react';
import ReactTable from "react-table";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import ImageUploader from "react-images-upload";

import myAPI from "../../../Api";
import 'react-toastify/dist/ReactToastify.css';
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/mystyle.css';

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

    editCategoryModeal = (row) => {

        let image = new Array();
        image.push(row.original.image);
        this.setState({
            category_name_en: row.original.category_name_en,
            category_name_hb: row.original.category_name_hb,
            initial_image: image
        });

        this.category_image = image;
        this.category_id = row.original.category_id;
        this.toggleModal();

    };

    toggleConfirm = (row) => {
        if (row) this.category_id = row.original.category_id;
        this.setState({ showConfirm: true })
    };

    handleImageUpload(pictureFiles, pictureDataURLs) {
        this.category_image = pictureDataURLs;
    }
    
    render() {

        const columns = [
            { Header: 'Image', accessor: 'image', filterable: false, style: { textAlign: 'center'},
                Cell: row => <img src={row.original.image} style={{height: `30px`}} />
            },
            { Header: 'Name (EN)', accessor: 'category_name_en', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Name (HB)', accessor: 'category_name_hb', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Action', accessor: 'category_id', filterable: false, style: { textAlign: 'center'},
                Cell: row =>
                    <div>
                        <span className='datamng-control edit' onClick={() => this.editCategoryModeal(row) }>
                            <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i>
                        </span>
                        <span className='datamng-control delete' onClick={() => this.toggleConfirm(row, true)}>
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
                                <div className="card-header">
                                    <h5 className="float-left">Category</h5>
                                    <div className="float-right">
                                        <button type="button" className="btn btn-success" onClick={() => this.addCategoryModal()}>New Category</button>
                                    </div>
                                </div>
                                <div className="card-body datatable-react">
                                    <ReactTable
                                        data={this.state.table_data}
                                        columns={columns}
                                        defaultPageSize={10}
                                        className={'-striped -highlight'}
                                        showPagination={true}
                                    />
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
                         onClose={() => this.setState({showConfirm: false})}
                />

            </Fragment>

        );
    }
};

export default Category;