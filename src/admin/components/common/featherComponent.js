import React from 'react';
import * as feather from 'feather-icons';

const FeatherComponent = (props) => {    
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: feather.toSvg(props.dataFeather) }} />
        </div>
    );
};

export default FeatherComponent;