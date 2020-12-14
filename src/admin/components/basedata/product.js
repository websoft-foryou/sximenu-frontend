import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';

import  Bootbox  from  'bootbox-react';
import ReactTable from "react-table";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {toast} from "react-toastify";
import ImageUploader from "react-images-upload";

import myAPI from "../../../Api";
import MeatIcon from "../../../assets/img/meat.svg"
import VeganIcon from "../../../assets/img/vegan.svg"
import ChiliIcon from "../../../assets/img/chili.svg"
import BeerIcon from "../../../assets/img/alcohol.svg"

import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/mystyle.css';


// reference url: https://developer.aliyun.com/mirror/npm/package/react-table-v6

class Product extends Component {
    constructor(props) {
        super(props);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleProductType = this.handleProductType.bind(this);
        this.state = {
            processing: 'Submit',
            loading: false,
            showConfirm: false,
            showModal: false,
            table_data: [],
            category_list: [],
            category_id: 0,
            product_name_en: '',
            product_name_hb: '',
            product_description_en: '',
            product_description_hb: '',
            product_price: '',
            initial_product_type: [],
            initial_image: [],
        };
        this.auth = this.props.auth;
        this.product_image = [];
        this.product_type = [];
        this.product_id = 0;
    }

    componentDidMount() {
        this.getCategoriesList();
        this.getAllProducts();
    }

    getCategoriesList = () => {
        this.setState({loading: true});
        try {
            myAPI.getCategoriesList(this.auth.getToken()).then(response => {
                if (response.data.success === true)
                    this.setState({category_list: response.data.result});
                else
                    toast.error(response.data.result);
            });
        } catch(err) {
            toast.error(err.message);
        } finally {
            this.setState({loading: false});
            this.setState({category_id : 0});
        }
    };

    getAllProducts = () => {
        this.setState({loading: true});
        try {
            myAPI.getAllProducts(this.auth.getToken()).then(response => {
                if (response.data.success)
                    this.setState({ table_data: response.data.result});
                else
                    toast.error(response.data.result);
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
                product_type: this.product_type,
                is_freemium: this.auth.isFreemium(),
                is_premium: this.auth.isPremium()
            }, this.auth.getToken()).then(response => {
                if (response.data.success === true) {
                    this.toggleModal();
                    this.getAllProducts();
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
                product_type: this.product_type,
                is_freemium: this.auth.isFreemium(),
                is_premium: this.auth.isPremium()
            }, this.auth.getToken(), this.product_id).then(response => {
                if (response.data.success === true) {
                    this.toggleModal();
                    this.getAllProducts();
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
                    this.getAllProducts();
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
            initial_product_type: [],
            initial_image: [],

        });
        this.product_image = [];
        this.product_id = 0;
        this.toggleModal();
    };

    editProductModeal = (row) => {

        this.setState({
            category_id: row.original.category_id,
            product_name_en: row.original.product_name_en,
            product_name_hb: row.original.product_name_hb,
            product_description_en: row.original.product_description_en,
            product_description_hb: row.original.product_description_hb,
            product_price: row.original.product_price,
            initial_image: row.original.product_image,
            initial_product_type: row.original.product_type
        });

        this.product_image = row.original.product_image;
        this.product_id = row.original.product_id;
        this.product_type = row.original.product_type;

        this.toggleModal();

    };

    toggleConfirm = (row) => {
        if (row) this.product_id = row.original.product_id;
        this.setState({ showConfirm: true })
    };

    handleImageUpload(pictureFiles, pictureDataURLs) {
        this.product_image = pictureDataURLs;
    }

    handleProductType(checked, value) {
        if (checked) {
            let new_product_type = this.product_type.concat(value);
            this.product_type =  new_product_type;
        }
        else {
            let new_product_type = this.product_type.filter(function(item) {
                return item !== value;
            })
            this.product_type =  new_product_type;
        }
        this.setState({initial_product_type: this.product_type});
    }

    render() {
        const columns = [
            { Header: 'Category', accessor: 'category_name', filterable: false, style: { textAlign: 'center'} },
            { Header: 'Product (EN)', accessor: 'product_name_en', filterable: false, style: { textAlign: 'center'} },
            { Header: 'Product (HB)', accessor: 'product_name_hb', filterable: false, style: { textAlign: 'center'} },
            { Header: 'Price($)', accessor: 'product_price', filterable: false, style: { textAlign: 'center'} },
            { Header: 'Images', accessor: 'product_image', filterable: false, style: { textAlign: 'center'},
                Cell: row => {
                    var image_element = row.original.product_image.map((img_data, index) => {
                        return <img src={img_data} style={{height: `30px`}} key={`product_image_${row.index}_${index}`} alt="Product"/>
                    });
                    if (row.original.product_image.length == 1 && row.original.product_image[0] === "")
                        return (<div className="product_list_thumbnail">- no image -</div>)
                    else
                        return (<div className="product_list_thumbnail">{image_element}</div>)
                }
            },
            { Header: 'Product Type', accessor: 'product_type', filterable: false, style: { textAlign: 'center'},
                Cell: row => {
                    var image_elements = row.original.product_type.map((type_name) => {
                        return (<img src={require('../../../assets/img/' + type_name + '.svg')} key={type_name + row.index} alt={''}/>)
                    });
                    return (<div className="product_type_thumbnail">{image_elements}</div>);
                }
            },
            { Header: 'Action', accessor: 'product_id', filterable: false, style: { textAlign: 'center'},
                Cell: row =>
                    <div>
                        <span className='datamng-control edit' onClick={() => this.editProductModeal(row) } >
                            <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i>
                        </span>
                        <span className='datamng-control delete'  onClick={() => this.toggleConfirm(row)} >
                            <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}></i>
                        </span>
                    </div>
            }
        ];


        return (
            <Fragment>
                <Breadcrumb title="Product" parent="Data" />
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
                                        <label htmlFor="category_list">Category: </label>
                                        <select className="form-control digits" value={this.state.category_id} onChange={e => this.setState({ category_id: e.target.value })}>
                                            {
                                                this.state.category_list.map((category, index) => {
                                                    return <option value={category.id} key={index}>{category.name_en}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-12 col-lg-6">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_name_en">Product Name (EN):</label>
                                        <input className="form-control" type="text" placeholder="" value={this.state.product_name_en} onChange={e => this.setState({ product_name_en: e.target.value })}/>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_name_hb">Product Name (HB):</label>
                                        {this.auth.isFreemium() &&
                                            <span className="freemium">* You are Freemium. So can not edit this field.</span>
                                        }
                                        {this.auth.isPremium() &&
                                            <input className="form-control" type="text" placeholder="" value={this.state.product_name_hb}
                                                   onChange={e => this.setState({product_name_hb: e.target.value})}/>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_description_en">Product Description (EN):</label>
                                        <textarea className="form-control" value={this.state.product_description_en}
                                                  onChange={e => this.setState({ product_description_en: e.target.value})}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_description_hb">Product Description (HB):</label>
                                        {this.auth.isFreemium() &&
                                        <span className="freemium">* You are Freemium. So can not edit this field.</span>
                                        }
                                        {this.auth.isPremium() &&
                                        <textarea className="form-control" value={this.state.product_description_hb}
                                                  onChange={e => this.setState({product_description_hb: e.target.value})}></textarea>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_image">Product Image:</label>
                                        { this.auth.isFreemium() &&
                                        <span className="freemium">* You are Freemium. So can not upload image.</span>
                                        }
                                        {this.auth.isPremium() &&
                                        <ImageUploader
                                            withIcon={false}
                                            withPreview={true}
                                            singleImage={false}
                                            buttonText='Choose images'
                                            defaultImages={this.state.initial_image}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                            onChange={this.handleImageUpload}
                                        />
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-12 col-lg-4">
                                    <div className="form-group">
                                        <label className="col-form-label" htmlFor="product_name_hb">Price($):</label>
                                        <input className="form-control" type="number" placeholder="" value={this.state.product_price} onChange={e => this.setState({product_price: e.target.value})}/>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-7 ml-4">
                                    <div className="form-group mb-0">
                                        <label className="col-form-label" htmlFor="product_name_hb">Product Type:</label>
                                    </div>
                                    <div className="form-group m-checkbox-inline mb-0 ml-1">
                                        <div className="checkbox checkbox-dark">
                                            <input id="inline-1" type="checkbox" checked={this.state.initial_product_type.includes('meat') ? true : false} onChange={e => this.handleProductType(e.target.checked, 'meat')} />
                                            <label htmlFor="inline-1"><img src={MeatIcon} style={{ height: '25px', marginTop: '-15px'}} alt={''}/></label>
                                        </div>
                                        <div className="checkbox checkbox-dark">
                                            <input id="inline-2" type="checkbox" checked={this.state.initial_product_type.includes('vegan') ? true : false} onChange={e => this.handleProductType(e.target.checked, 'vegan')} />
                                            <label htmlFor="inline-2"><img src={VeganIcon} style={{ height: '25px', marginTop: '-15px'}} alt={''}/></label>
                                        </div>
                                        <div className="checkbox checkbox-dark">
                                            <input id="inline-3" type="checkbox" checked={this.state.initial_product_type.includes('chili') ? true : false} onChange={e => this.handleProductType(e.target.checked, 'chili')} />
                                            <label htmlFor="inline-3"><img src={ChiliIcon} style={{ height: '25px', marginTop: '-15px'}} alt={''}/></label>
                                        </div>
                                        <div className="checkbox checkbox-dark">
                                            <input id="inline-4" type="checkbox" checked={this.state.initial_product_type.includes('alcohol') ? true : false} onChange={e => this.handleProductType(e.target.checked, 'alcohol')} />
                                            <label htmlFor="inline-4"><img src={BeerIcon} style={{ height: '25px', marginTop: '-15px'}} alt={''}/></label>
                                        </div>
                                    </div>
                                </div>
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
                         message={"The product will be removed. Are you sure?"}
                         onSuccess={() => this.removeProduct()}
                         onCancel={() => this.setState({showConfirm: false})}
                />
            </Fragment>

        );
    }
};

export default Product;