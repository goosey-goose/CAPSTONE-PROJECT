import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import './PageNotFound.css';


const PageNotFound = () => {


    return (

        <>
            <div><img src="https://live.staticflickr.com/65535/51414154001_6303ff75dc_k.jpg" width="1280" height="655" alt="error-2129569_1920"></img></div>
            <div id="oops_404">Oops!</div>
            <div id="oops_404_subtext">We can't seem to find the page you're looking for.</div>
            <div id="oops_404_home_link">Here's a helpful link to get you back home: <Link to="/">Let's Go!</Link></div>
        </>

    );
};

export default PageNotFound;
