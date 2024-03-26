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
import setting from './svg/setting.svg';
import edit from './svg/edit.svg';
import default_messages from './svg/default_messages.svg';
import default_calls from './svg/default_calls.svg';
import default_contacts from './svg/default_contacts.svg';
import default_settings from './svg/default_settings.svg';
import focus_messages from './svg/focus_messages.svg';
import focus_calls from './svg/focus_calls.svg';
import focus_contacts from './svg/focus_contacts.svg';
import focus_settings from './svg/focus_settings.svg';

const icons = {
  logo,
  default_messages,
  default_calls,
  default_contacts,
  default_settings,
  focus_messages,
  focus_calls,
  focus_contacts,
  focus_settings,

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
  edit,
};

const SvgIcons = ({name = '', width, height, ...restProps}) => {
  const isValidIcon = name in icons;

  if (!isValidIcon) {
    console.warn(`Invalid icon name: ${name}`);
    return null;
  }

  const IconComponent = icons[name];

  return <IconComponent width={width} height={height} {...restProps} />;
};

export default SvgIcons;
