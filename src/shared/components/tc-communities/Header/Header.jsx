/**
 * The Header component for communities
 *
 * Along with css modules it has global css classes
 * so the whole design can be overridden by an additional css file
 */

import _ from 'lodash';
import React from 'react';
import PT from 'prop-types';
import Avatar from 'components/Avatar';
import { Link, NavLink } from 'react-router-dom';
import { getRatingColor } from 'utils/tc';
import './Header.scss';

export default function Header(props) {
  const {
    logos, menuItems, communityId, cssUrl, isMobileOpen, onMobileToggleClick, profile,
  } = props;

  const loginState = profile ? (
    <div
      /* Login state component. */
      styleName="user-menu"
    >
      <div
        style={{
          color: getRatingColor(_.get(profile, 'maxRating.rating', 0)),
        }}
        styleName="user-menu-handle"
      >
        {profile.handle}
      </div>
      <div styleName="avatar">
        <Avatar url={profile.photoURL} />
      </div>
    </div>
  ) : null;

  return (
    <div>
      {cssUrl && <link rel="stylesheet" type="text/css" href={cssUrl} />}
      <header styleName="container" className="tc-communities__header__container">
        <div styleName="header" className="tc-communities__header__header">
          <div styleName="logos" className="tc-communities__header__logos">
            {_.map(logos, (logoUrl, index) =>
              (menuItems.length ? (
                <Link
                  key={index}
                  to={`/community/${communityId}/${menuItems[0].url}`}
                  styleName="logo"
                  className="tc-communities__header__logo"
                >
                  <img src={logoUrl} alt="Community logo" />
                </Link>
              ) : (
                <span
                  key={index}
                  styleName="logo"
                  className="tc-communities__header__logo"
                >
                  <img src={logoUrl} alt="Community logo" />
                </span>
              )),
            )}
          </div>
          <div styleName="avatar-mobile">
            <Avatar url={profile ? profile.photoURL : ''} />
          </div>
          <button
            styleName="mobile-toggle"
            className="tc-communities__header__mobile-toggle"
            onClick={onMobileToggleClick}
          >
            <span>Toggle navigation</span>
            <i /><i /><i />
          </button>
        </div>
        <div
          styleName={`menu-wrap${isMobileOpen ? ' open' : ''}`}
          className={`tc-communities__header__menu-wrap${isMobileOpen ? ' tc-communities__header__open' : ''}`}
        >
          <ul styleName="menu" className="tc-communities__header__menu">
            {_.concat(_.map(menuItems, item => (
              <li
                styleName="menu-item"
                className="tc-communities__header__menu-item"
                key={item.url}
              >
                <NavLink
                  styleName="menu-link"
                  className="tc-communities__header__menu-link"
                  activeClassName="menu-link_active tc-communities__header__menu-link_active"
                  to={`/community/${communityId}/${item.url}`}
                >
                  {item.title}
                </NavLink>
              </li>
            )), loginState)}
          </ul>
        </div>
      </header>
    </div>
  );
}

Header.defaultProps = {
  menuItems: [],
  logos: [],
  isMobileOpen: false,
  cssUrl: null,
  communityId: null,
  profile: null,
};

Header.propTypes = {
  menuItems: PT.arrayOf(PT.shape({
    title: PT.string.isRequired,
    url: PT.string.isRequired,
  })),
  logos: PT.arrayOf(PT.string),
  isMobileOpen: PT.bool,
  cssUrl: PT.string,
  onMobileToggleClick: PT.func.isRequired,
  communityId: PT.string,
  profile: PT.shape({}),
};
