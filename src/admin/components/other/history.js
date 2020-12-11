import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';

import ReactTable from "react-table";

import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/mystyle.css';

const UserHistory = () => {
    const columns = [
        { Header: 'Date Time', accessor: 'date_time', filterable: true, style: { textAlign: 'center'} },
        { Header: 'Action', accessor: 'action', filterable: true, style: { textAlign: 'center'} },
        { Header: 'Section', accessor: 'section', filterable: true, style: { textAlign: 'center'} },
        { Header: 'Original Value', accessor: 'original_value', filterable: true, style: { textAlign: 'center'} },
        { Header: 'New Value', accessor: 'new_value', filterable: true, style: { textAlign: 'center'} }
    ];
    const data = [
        {
            date_time : "2020-12-01 12:20:12",
            action: "Update",
            section: "Category Name",
            original_value: "aaa",
            new_value: "bbb"
        },
        {
            date_time : "2020-12-01 12:40:12",
            action: "New",
            section: "Product",
            original_value: "",
            new_value: "mmmm"
        },
        {
            date_time : "2020-12-01 13:02:12",
            action: "Delete",
            section: "Product",
            original_value: "hhh",
            new_value: ""
        }
    ];

    console.log(data);


    return (
        <Fragment>
            <Breadcrumb title="" parent="History" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="float-left">User History</h5>
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


        </Fragment>

    );

};

export default UserHistory;