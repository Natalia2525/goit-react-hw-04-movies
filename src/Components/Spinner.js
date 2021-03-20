import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class Spinner extends Component {
    render() {
        return (
            <Loader
                style={{ textAlign: 'center' }}
                className="Loader"
                type="Circles"
                color="rgb(124, 37, 165)"
                height={80}
                width={80}
            />
        );
    }
}

export default Spinner;
