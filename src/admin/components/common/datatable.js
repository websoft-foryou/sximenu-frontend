import React, { useState, Component, Fragment } from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Datatable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData,
            myColumn: this.props.myColumn,
        }
    }

    selectRow = (e, i) => {
        if (!e.target.checked) {
            this.setState({
                checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            this.state.checkedValues.push(i);
            this.setState({
                checkedValues: this.state.checkedValues
            })
        }
    }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        console.log(cellInfo);
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable={false}
                suppressContentEditableWarning
                // onBlur={e => {
                //     const data = [...this.state.myData];
                //     data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                //     this.setState({ myData: data });
                // }}
                dangerouslySetInnerHTML={{
                    __html: this.state.myData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
        return '';
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    render() {

        const { pageSize, myClass, pagination } = this.props;
        const { myData, myColumn } = this.state

        const columns = [];

        for (var key in myColumn[0]) {
            let editable = this.renderEditable
            if (key === "image") {
                editable = null;
            }
            if (key === "status") {
                editable = null;
            }
            if (key === "avtar") {
                editable = null;
            }
            if (key === "vendor") {
                editable = null;
            }
            if (key === "skill") {
                editable = null;
            }
            if (key === "user") {
                editable = null;
            }

            columns.push({
                Header: <b>{this.Capitalize(myColumn[0][key].toString())}</b>,
                accessor: key,
                Cell: editable,
                filterable: editable == null ? false : true,
                style: {
                    textAlign: 'center'
                }
            });
        }


        return (
            <Fragment>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Datatable;