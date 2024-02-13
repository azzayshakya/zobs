import React from 'react';
import InputField from '../component/InputField';

const Location = ({handleChange}) => {
    return <div>
        <div>
            <h4>Location</h4>

        </div>
        <div>
            <label>
                <input type="radio" name="text" id="" onChange={handleChange} />
                <span></span>all
            </label>
            <InputField handleChange={handleChange} value="london" title="london" name="test"/>

        </div>
    </div>;
}


export default Location;