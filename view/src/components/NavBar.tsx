import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';

const filterIcon: IIconProps = { iconName: 'Filter' };
import '../style/NavBar.css';
import logo from '../logo.png';


/* eslint-disable react/jsx-no-bind */
export const NavBar = () => {
  const imageProps: IImageProps = {
    
    imageFit: ImageFit.contain,
  };
  return (
    <div className="NavBar">
    <div className="logo">
    <Image
        {...imageProps}
        src= {logo}
        alt='F(ree)-Stats'
        width={200}
        height={70}
      />
    </div>
    <div className="searchbox">
      <SearchBox labelText="Search"        
        placeholder="Search for analysis"
        iconProps={filterIcon}
        onSearch={newValue => console.log('value is ' + newValue)}
        onChange={newValue => console.log('value is ' + newValue)}
        disableAnimation
      />
    </div>
  </div>

    
  );
};


