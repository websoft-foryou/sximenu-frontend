import React, { Fragment } from 'react';
import {Button} from "reactstrap";
import { useHistory } from 'react-router-dom';

const UnlockButton = (props) => {
    const history = useHistory();
    const redirectToMembership = () => {
        history.push('/admin/membership');
    };

    return (
        <Fragment>
            <div className="lock-section">
                <Button color="default" className="unlock" onClick={ () => redirectToMembership() }><i className="icon-unlock"></i> &nbsp;{props.title}</Button>
            </div>
        </Fragment>
    );
};

export default UnlockButton;