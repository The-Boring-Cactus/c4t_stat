import React from 'react'
import {Link} from 'office-ui-fabric-react'
import '../style/Footer.css';

/* eslint-disable react/jsx-no-bind */
export const Footer  = () => {
    return (
        <div className="footer-container">
            {'© F(ree)-Stats App 2020 '}
            {' -- Made with '}
            <span className="text-red">♥</span>
            {' by '}
            <Link href="http://www.c4t.dev/peyote">Peyote </Link>    
        </div>
    );
  };
  