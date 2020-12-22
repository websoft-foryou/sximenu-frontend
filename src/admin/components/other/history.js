import React, {Fragment, useState, useEffect} from 'react';
import Breadcrumb from '../common/breadcrumb';
import ReactTable from "react-table";
import UnlockButton from "../common/unlockButton";

import myAPI from "../../../Api";
import 'react-table/react-table.css';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/mystyle.css';
import {toast} from "react-toastify";

const UserHistory = (props) => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const auth = props.auth;

    const columns = [
        { Header: 'Date Time', accessor: 'date_time', filterable: true, style: { textAlign: 'center'} },
        { Header: 'Action', accessor: 'action', filterable: true, style: { textAlign: 'center'},
            Cell: row => {
                let icon = '';
                let iconClass = 'icon' + row.original.action;
                if (row.original.action === 'Browse') icon = 'icofont icofont-globe-alt';
                if (row.original.action === 'New') icon = 'icofont icofont-paper';
                if (row.original.action === 'Update') icon = 'icofont icofont-pencil-alt-5';
                if (row.original.action === 'Delete') icon = 'icofont icofont-ui-remove';
                return (<div><i className={`${icon} ${iconClass}`}></i> {row.original.action}</div>)
            }
        },
        { Header: 'Section', accessor: 'section', filterable: true, style: { textAlign: 'center'} },
        { Header: 'Original Value', accessor: 'original_value', filterable: true, style: { textAlign: 'center'} },
        { Header: 'New Value', accessor: 'new_value', filterable: true, style: { textAlign: 'center'} }
    ];

    useEffect(() => {
        if (auth.isPremium()) getHistoryData();
    },[]);

    const getHistoryData = async() => {
        setLoading(true)
        try {
            await myAPI.getHistoryData(auth.getToken()).then(response => {
                if (response.data.success) {
                    setTableData( response.data.result);
                }
                else
                    toast.error(response.data.result);

            });

        } catch(e) {
            toast.error(e.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Fragment>
            <Breadcrumb title="" parent="History" />
            {loading &&
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
                                <h5 className="float-left">User History</h5>
                            </div>
                            {auth.isFreemium() &&
                                <UnlockButton title="unlock"/>
                            }
                            <div className={`card-body datatable-react ${auth.isFreemium() ? `freemium_status` : `` }` }>
                                <ReactTable
                                    data={tableData}
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