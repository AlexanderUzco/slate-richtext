import React from 'react';
import JSONPretty from 'react-json-prettify';

const DataRichText = ({data})=> {
    return(
        <div className='data'>
            <JSONPretty json={data}/>
        </div>
    )
}

export default DataRichText;