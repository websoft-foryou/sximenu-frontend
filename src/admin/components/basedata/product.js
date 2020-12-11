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
// reference url: https://developer.aliyun.com/mirror/npm/package/react-table-v6

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            showModal: false
        }
    }
    setShowModal = () => {
        this.setState( {
            showModal: ! this.state.showModal
        })
    };
    setShowConfirm = (id) => {
        this.setState({
            showConfirm: ! this.state.showConfirm
        })
    };
    removeData = (id) => {
        console.log('Yes');
    };

    render() {
        const columns = [
            { Header: 'Category', accessor: 'category', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Name (EN)', accessor: 'name_en', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Name (HB)', accessor: 'name_hb', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Price($)', accessor: 'price', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Images', accessor: 'image', filterable: false, style: { textAlign: 'center'},
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
            { Header: 'Action', accessor: 'action', filterable: false, style: { textAlign: 'center'},
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
                                        <button type="button" className="btn btn-success" onClick={() => this.setShowModal()}>New Product</button>
                                    </div>
                                </div>
                                <div className="card-body datatable-react">
                                    <ReactTable
                                        data={data}
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

                <Modal isOpen={this.state.showModal} toggle={() => this.setShowModal()}  size="lg">
                    <ModalHeader toggle={() => this.setShowModal()}>New Product</ModalHeader>
                    <ModalBody>
                        <form className="needs-validation" noValidate="" >
                            <div className="form-row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="cbo_category">Category: </label>
                                        <select className="form-control digits" id="cbo_category">
                                            <option>Category 1</option>
                                            <option>Category 2</option>
                                            <option>Category 3</option>
                                            <option>Category 4</option>
                                            <option>Category 5</option>
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
                                        <ImageUpload />
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
                        <Button color="secondary" onClick={() => this.setShowModal()}>Cancel</Button>
                        <Button color="primary">Submit</Button>
                    </ModalFooter>
                </Modal>

                <Bootbox show={this.state.showConfirm}
                         type={"confirm"}
                         message={"The product will be removed. Are you sure?"}
                         onSuccess={() => this.removeData(1)}
                         onCancel={() => this.setShowConfirm(0)}
                         onClose={() => this.setShowConfirm(0)}
                />
            </Fragment>

        );
    }
};

export default Product;