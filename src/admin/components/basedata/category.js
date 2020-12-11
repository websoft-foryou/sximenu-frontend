import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';

import  Bootbox  from  'bootbox-react';
import ReactTable from "react-table";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ImageUpload from "../common/imageupload";

import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/mystyle.css';
// reference url: https://developer.aliyun.com/mirror/npm/package/react-table-v6

class Category extends Component {
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
    setShowConfirm = (id, bShow) => {
        this.setState({
            showConfirm: bShow
        })
    };
    removeData = (id) => {
        console.log('Yes');
    };

    render() {
        const columns = [
            { Header: 'Image', accessor: 'image', filterable: false, style: { textAlign: 'center'} },
            { Header: 'Name (EN)', accessor: 'name_en', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Name (HB)', accessor: 'name_hb', filterable: true, style: { textAlign: 'center'} },
            { Header: 'Action', accessor: 'action', filterable: false, style: { textAlign: 'center'},
                Cell: props =>
                    <div>
                        <span className='datamng-control edit' >
                            <i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)' }}></i>
                        </span>
                        <span className='datamng-control delete' onClick={() => this.setShowConfirm(1, true)}>
                            <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e' }}></i>
                        </span>
                    </div>
            }
        ];
        const data = [
            {
                image : "1",
                name_en: "Category 1",
                name_hb: "Category 1 HB",
                actions: "4"
            }
        ];
        console.log(data);
        return (
            <Fragment>
                <Breadcrumb title="Category" parent="Data" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="float-left">Category</h5>
                                    <div className="float-right">
                                        <button type="button" className="btn btn-success" onClick={() => this.setShowModal()}>New Category</button>
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

                <Modal isOpen={this.state.showModal} toggle={() => this.setShowModal()}>
                    <ModalHeader toggle={() => this.setShowModal()}>New Category</ModalHeader>
                    <ModalBody>
                        <form className="needs-validation" noValidate="" >
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="category_image">Category Image:</label>
                                <ImageUpload />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="category_name_en">Category Name (EN):</label>
                                <input className="form-control" type="text" placeholder="" />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label" htmlFor="category_name_hb">Category Name (HB):</label>
                                <input className="form-control" type="text" placeholder="" />
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
                         message={"The category will be removed. Are you sure?"}
                         onSuccess={() => this.removeData(1)}
                         onCancel={() => this.setShowConfirm(0, false)}
                         onClose={() => this.setShowConfirm(0,false)}
                />
            </Fragment>

        );
    }
};

export default Category;