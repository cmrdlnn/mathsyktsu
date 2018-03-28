import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Collapse } from 'reactstrap';

class ButtonsMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentOpen: null };
  }

  handleClick = (buttonIndex) => {
    this.setState({ currentOpen: this.state.currentOpen === buttonIndex ? null : buttonIndex });
  }

  render() {
    const { colors, items, title, titles } = this.props;

    return (
      <div className="buttons-menu">
        { title && <h5>{ title }</h5> }
        <ButtonGroup style={{ marginBottom: '2%' }}>
          { items.map(({ color, onClick, title: buttonTitle }, index) => (
            <Button
              color={color || colors[index]}
              key={index}
              onClick={onClick || (() => { this.handleClick(index); })}
            >
              { buttonTitle || titles[index] }
            </Button>
          ))}
        </ButtonGroup>
        {
          items.map(({ Component, onClick, props }, index) => (
            Component && (
              onClick ? (
                <Component {...props} />
              ) : (
                <Collapse key={index} isOpen={this.state.currentOpen === index}>
                  <Component {...props} />
                </Collapse>
              )
            )
          ))
        }
      </div>
    );
  }
}

ButtonsMenu.defaultProps = {
  colors: [
    'info',
    'success',
    'danger',
  ],
  titles: [
    'Добавить',
    'Изменить',
    'Удалить',
  ],
};

ButtonsMenu.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.string,
  ),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      Component: PropTypes.func,
      onClick: PropTypes.func,
      props: PropTypes.object,
      title: PropTypes.string,
    }),
  ).isRequired,
  title: PropTypes.string,
  titles: PropTypes.arrayOf(
    PropTypes.string,
  ),
};

export default ButtonsMenu;
