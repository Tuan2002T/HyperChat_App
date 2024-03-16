import React from 'react';
import logo from './svg/logo.svg';
import go from './svg/go.svg';
import back from './svg/back.svg';
import search from './svg/search.svg';
import qr from './svg/qr.svg';
import plus from './svg/plus.svg';
import add_user from './svg/add-user.svg';
import group from './svg/group.svg';
import friend from './svg/friend.svg';
import call from './svg/phone-call.svg';
import setting  from './svg/setting.svg';

const icons  = {
  logo,
  go,
  back,
  search,
  qr,
  plus,
  add_user,
  group,
  friend,
  call,
  setting,
};

const SvgIcons = ({ name = '', width, height, ...restProps }) => {
  const isValidIcon = name in icons;
  
  if (!isValidIcon) {
    console.warn(`Invalid icon name: ${name}`);
    return null;
  }

  const IconComponent = icons[name];
 
  return (
    <IconComponent width={width} height={height} {...restProps} />
  );
};

export default SvgIcons;
