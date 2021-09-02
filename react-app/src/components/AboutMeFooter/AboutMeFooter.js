import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import './AboutMeFooter.css';


const AboutMeFooter = () => {


    return (



        <footer id="about_me_footer">
            <div id="amf_links_container">
                <button><a href="https://github.com/goosey-goose/CAPSTONE-PROJECT"><i className="fab fa-github"></i></a></button>
                <button><a href="https://www.linkedin.com/in/gustavo-miranda-31218a30"><i className="fab fa-linkedin"></i></a></button>
            </div>
        </footer>



    );
};

export default AboutMeFooter;
