import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

class SidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsedItems: [] };
  }

  toggle = (itemIndex) => {
    const { collapsedItems } = this.state;
    const collapsed = [...collapsedItems];
    collapsed[itemIndex] = !collapsedItems[itemIndex];
    this.setState({ collapsedItems: collapsed });
  }

  itemClass = isActive => (
    `sidebar-section${isActive ? '-active' : ''}`
  )

  render() {
    const { activeItem, activeSubitem, items, onItemClick, onSubitemClick } = this.props;

    return (
      <Fragment>
        { items.map((item, index) => {
          const haveSubitems = item.subitems.length > 0;

          return (
            <Fragment key={item.id}>
              <button
                className={this.itemClass(activeItem === item.id)}
                onClick={
                  haveSubitems
                    ? () => { this.toggle(index); }
                    : () => { onItemClick(item); }
                }
              >
                { item.title }
              </button>
              { haveSubitems &&
                <Collapse
                  isOpen={this.state.collapsedItems[index]}
                  style={{ marginLeft: '1vw' }}
                >
                  {
                    item.subitems.map(subitem => (
                      <button
                        className={this.itemClass(activeSubitem === subitem.id)}
                        key={subitem.id}
                        onClick={() => { onSubitemClick(subitem); }}
                      >
                        { subitem.title }
                      </button>
                    ))
                  }
                </Collapse>
              }
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

SidebarMenu.defaultProps = {
  activeItem: null,
  activeSubitem: null,
  items: [],
  onSubitemClick: null,
};

SidebarMenu.propTypes = {
  activeItem: PropTypes.number,
  activeSubitem: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      subitems: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  onItemClick: PropTypes.func.isRequired,
  onSubitemClick: PropTypes.func,
};

export default SidebarMenu;
