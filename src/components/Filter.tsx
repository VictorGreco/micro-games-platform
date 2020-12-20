import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface FilterConfig {
    value: string;
    handleChange: any;
}

const Filter = ({ value, handleChange }: FilterConfig): JSX.Element => {
    return (
        <form>
            <input className="form-control me-2"
                value={value}
                onChange={handleChange}
                type="search"
                arial-label="Search"
                placeholder="Search" />
        </form>

    );
};

export default Filter;