import React from 'react';
import classNames from 'classnames';
import defaultPhoto from '../../assets/default_profile.png';
import './Photo.css';

const Photo = ({ className, ...props }) => (
  <img
    className={classNames('photo', className)}
    src={defaultPhoto}
    alt=""
    {...props}
  />
);

export default Photo;
