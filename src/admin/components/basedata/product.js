import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';

import  Bootbox  from  'bootbox-react';
import ReactTable from "react-table";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ImageUpload from "../common/imageupload";

import MeatIcon from "../../../assets/img/meat.svg"
import VeganIcon from "../../../assets/img/vegan.svg"
import ChiliIcon from "../../../assets/img/chili.svg"
import BeerIcon from "../../../assets/img/beer.svg"

import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/mystyle.css';
import myAPI from "../../../Api";
import {toast} from "react-toastify";
import ImageUploader from "react-images-upload";
// reference url: https://developer.aliyun.com/mirror/npm/package/react-table-v6

class Product extends Component {
    constructor(props) {
        super(props);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.state = {
            processing: 'Submit',
            loading: false,
            showConfirm: false,
            showModal: false,
            table_data: [],
            category_list: [],
            product_id: 0,
            product_name_en: '',
            product_name_hb: '',
            product_description_en: '',
            product_description_hb: '',
            product_price: '',
            product_type: '',
            initial_image: [],
        };
        this.auth = this.props.auth;
        this.product_image = [];
        this.product_id = 0;
    }

    componentDidMount() {
        this.getAllCategories();
        this.getAllProducts();
    }

    getAllCategories = () => {
        this.setState({loading: true});
        try {
            myAPI.getAllCategories(this.auth.getToken()).then(response => {
                if (response.data.success === true)
                    this.setState({category_list: response.data.result});
                else
                    toast.error(response.data.result);
            });
        } catch(err) {
            toast.error(err.message);
        } finally {
            this.setState({loading: false});
            this.category_id = 0;
        }
    };

    getAllProducts = () => {
        this.setState({loading: true});
        try {
            myAPI.getAllProducts(this.auth.getToken()).then(response => {
                this.setState({ table_data: response.data.result});
            });
        } catch(err) {
            toast.error(err.message);
        } finally {
            this.setState({loading: false});
            this.product_id = 0;
        }
    };

    saveData = () => {
        if (this.product_id === 0)
            this.storeProduct();
        else
            this.updateProduct();
    };

    storeProduct = async() => {
        this.setState({processing: 'Adding...'});
        try {
            await myAPI.addProduct({
                category_id: this.state.category_id,
                product_name_en: this.state.product_name_en,
                product_name_hb: this.state.product_name_hb,
                product_description_en: this.state.product_description_en,
                product_description_hb: this.state.product_description_hb,
                product_image: this.product_image,
                product_price: this.state.product_price,
                product_type: this.state.product_type,
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
    updateProduct = async() => {

        this.setState({processing: 'Updating...'});
        try {
            await myAPI.updateProduct({
                category_id: this.state.category_id,
                product_name_en: this.state.product_name_en,
                product_name_hb: this.state.product_name_hb,
                product_description_en: this.state.product_description_en,
                product_description_hb: this.state.product_description_hb,
                product_image: this.product_image,
                product_price: this.state.product_price,
                product_type: this.state.product_type,
                is_freemium: this.auth.isFreemium(),
                is_premium: this.auth.isPremium()
            }, this.auth.getToken(), this.product_id).then(response => {
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
    removeProduct = async() => {
        this.setState({ showConfirm: false});
        this.setState({loading: true});
        try {
            await myAPI.removeProduct(this.auth.getToken(), this.product_id).then(response => {
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

    addProductModal = () => {
        this.setState({
            category_id: 0,
            product_name_en: '',
            product_name_hb: '',
            product_description_en: '',
            product_description_hb: '',
            product_price: '',
            product_type: '',
            initial_image: []
        });
        this.product_image = [];
        this.product_id = 0;
        this.toggleModal();
    };

    editProductModeal = (row) => {

        let image = new Array();
        image.push(row.original.image);
        this.setState({
            category_id: row.original.category_id,
            product_name_en: row.original.product_name_en,
            product_name_hb: row.original.product_name_hb,
            product_description_en: row.original.product_name_en,
            product_description_hb: row.original.product_name_hb,
            product_price: row.original.product_price,
            product_type: row.original.product_type,
            initial_image: image
        });
        //console.log(row.original.image);
        this.product_image = image;
        this.product_id = row.original.product_id;
        this.toggleModal();

    };

    toggleConfirm = (row) => {
        if (row) this.product_id = row.original.product_id;
        this.setState({ showConfirm: true })
    };

    handleImageUpload(pictureFiles, pictureDataURLs) {
        this.product_image = pictureDataURLs;
    }

    render() {
        const columns = [
            { Header: 'Category', accessor: 'category_name', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Product (EN)', accessor: 'product_name_en', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Product (HB)', accessor: 'product_name_hb', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Price($)', accessor: 'product_price', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Images', accessor: 'product_image', filterable: false, style: { textAlign: 'center'},
                Cell: props => {
                    var image_elements = props.value.map((img_name) => {
                        return (<img src={require('../../assets/uploads/' + img_name)} key={img_name} alt={''}/>)
                    })
                    return (<div className="product_list_thumbnail">{image_elements}</div>);

                }
            },
            { Header: 'Product Type', accessor: 'product_type', filterable: false, style: { textAlign: 'center'},
                Cell: props => {
                    var image_elements = props.value.map((img_name) => {
                        return (<img src={require('../../../assets/img/' + img_name)} key={img_name} alt={''}/>)
                    })
                    return (<div className="product_type_thumbnail">{image_elements}</div>);
                }
            },
            { Header: 'Action', accessor: 'product_id', filterable: false, style: { textAlign: 'center'},
                Cell: props =>
                    <div>
                        <span className='datamng-control edit' >
                            <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i>
                        </span>
                        <span className='datamng-control delete' onClick={() => this.setShowConfirm(1)}>
                            <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}></i>
                        </span>
                    </div>
            }
        ];

        const data = [
            {
                category : "test category",
                name_en: "test product en",
                name_hb: "test product hb",
                price: 100,
                image: ['download-1.jpg', 'download-2.jpg', 'download-3.jpg'],
                product_type: ['meat.svg', 'vegan.svg', 'chili.svg'],
                actions: "4"
            }
        ];

        return (
            <Fragment>
                <Breadcrumb title="Product" parent="Data" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="float-left">Product</h5>
                                    <div className="float-right">
                                        <button type="button" className="btn btn-success" onClick={() => this.addProductModal()}>New Product</button>
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

                <Modal isOpen={this.state.showModal} toggle={() => this.toggleModal()}  size="lg">
                    <ModalHeader toggle={() => this.toggleModal()}>New Product</ModalHeader>
                    <ModalBody>
                        <form className="needs-validation" noValidate="" >
                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="cbo_category">Category: </label>
                                        <select className="form-control digits" id="cbo_category">
                                            <option>Product 1</option>
                                            <option>Product 2</option>
                                            <option>Product 3</option>
                                            <option>Product 4</option>
                                            <option>Product 5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-12 col-lg-6">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_name_en">Product Name (EN):</label>
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_name_hb">Product Name (HB):</label>
                                        <input className="form-control" type="text" placeholder="" />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_description_en">Product Description (EN):</label>
                                        <textarea className="form-control" id="product_description_en"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_description_hb">Product Description (HB):</label>
                                        <textarea className="form-control" id="product_description_hb"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_image">Product Image:</label>
                                        <ImageUploader
                                            withIcon={false}
                                            withPreview={true}
                                            singleImage={true}
                                            buttonText='Choose images'
                                            defaultImages={this.state.initial_image}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            onChange={this.handleImageUpload}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12 col-lg-4">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_name_hb">Price($):</label>
                                        <input className="form-control" type="number" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-12 col-lg-7 ml-4">
                                    <div className="form-group mb-0">
                                        <label className="col-form-label" htmlFor="product_name_hb">Product Type:</label>
                                    </div>
                                    <div className="form-group m-checkbox-inline mb-0 ml-1">
                                        <div className="checkbox checkbox-dark">
                                            <input id="inline-1" type="checkbox"/>
                                            <label htmlFor="inline-1"><img src={MeatIcon} style={{ height: '25px', marginTop: '-15px'}} alt={''}/></label>
                                        </div>
                                        <div className="checkbox checkbox-dark">
                                            <input id="inline-2" type="checkbox"/>
                                            <label htmlFor="inline-2"><img src={VeganIcon} style={{ height: '25px', marginTop: '-15px'}} alt={''}/></label>
                                        </div>
                                        <div className="checkbox checkbox-dark">
                                            <input id="inline-3" type="checkbox"/>
                                            <label htmlFor="inline-3"><img src={ChiliIcon} style={{ height: '25px', marginTop: '-15px'}} alt={''}/></label>
                                        </div>
                                        <div className="checkbox checkbox-dark">
                                            <input id="inline-4" type="checkbox"/>
                                            <label htmlFor="inline-4"><img src={BeerIcon} style={{ height: '25px', marginTop: '-15px'}} alt={''}/></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                        <Button color="primary">Submit</Button>
                    </ModalFooter>
                </Modal>

                <Bootbox show={this.state.showConfirm}
                         type={"confirm"}
                         message={"The product will be removed. Are you sure?"}
                         onSuccess={() => this.removeProduct()}
                         onClose={() => this.setState({showConfirm: false})}
                />
            </Fragment>

        );
    }
};

export default Product;