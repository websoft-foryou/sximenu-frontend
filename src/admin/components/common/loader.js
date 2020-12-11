import React, { Fragment , useState , useEffect } from 'react';

const Loader = () => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
          }, 1000);
        
    },[show]);
    return (
        <Fragment>
            <div className={`loader-wrapper ${show ? '' : 'loderhide'}`} >
                <div className="loader bg-white">
                    <div className="whirly-loader"> </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Loader;