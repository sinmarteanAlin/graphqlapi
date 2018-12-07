import React from 'react';
import Input from '../../../widgets/input/Input';

const SearchInput = (props) => {
    return (
        <Input
            labelFor="search"
            labelText=""
            inputType="text"
            inputId="search"
            inputPlaceholder="Search Movie"
            value={props.search}
            name="search"
            handleChange={props.handleChange}
        />
    )
}

export default SearchInput;
