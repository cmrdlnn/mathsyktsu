import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SidebarItems = ({ items, location: { pathname }, history: { push } }) => (
  <Fragment>
    { Object.keys(items).map((path) => {
      const className = `sidebar-section${pathname === path ? '-active' : ''}`;

      return (
        <button
          className={className}
          key={path}
          onClick={() => { push(path); }}
        >
          { items[path] }
        </button>
      );
    })}
  </Fragment>
);

SidebarItems.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  items: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default SidebarItems;
