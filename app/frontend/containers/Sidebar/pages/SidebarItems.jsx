import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SidebarItems = ({ items, location: { pathname } }) => (
  <Fragment>
    { Object.keys(items).map((key) => {
      const className = `sidebar-section${pathname === key ? '-active' : ''}`;
      return (
        <Link href={key} key={key} to={key}>
          <div className={className}>{ items[key] }</div>
        </Link>
      );
    })}
  </Fragment>
);

SidebarItems.propTypes = {
  items: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default SidebarItems;
