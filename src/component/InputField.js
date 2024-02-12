import React from 'react';

const InputField = ({handleChange,value,title,name}) => {
    return <div>
        <label htmlFor="">
            <input type="radio" name={name} value={value} onChange={handleChange} />
            <span></span>{title}
        </label>

    </div>;
}

export default InputField;