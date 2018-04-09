import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

class PaperUpdating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownTitle: 'Выберите статью',
      isOpen: false,
      paperId: null,
    };
  }

  selectPaper = (dropdownTitle, paperId) => {
    this.setState({ dropdownTitle, paperId });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  togglePaperDestroying = () => {
    const { modalIsOpen, onDestroy, sendModalProps } = this.props;

    if (modalIsOpen) {
      sendModalProps({ isOpen: false });
    } else {
      sendModalProps({
        body: 'Внимание! Статья будет удалена безвозвратно.',
        header: 'Вы действительно хотите удалить выбранную статью?',
        isOpen: true,
        onConfirm: () => { onDestroy(this.state.paperId); },
        toggle: this.togglePaperDestroying,
      });
    }
  }

  render() {
    const { onDestroy, topics } = this.props;
    const { dropdownTitle, isOpen, paperId } = this.state;

    return (
      <Fragment>
        <Dropdown isOpen={isOpen} toggle={this.toggle} >
          <div className={isOpen ? 'dropup' : ''}>
            <DropdownToggle caret color="warning">
              { dropdownTitle }
            </DropdownToggle>
          </div>
          <DropdownMenu className="scrollable-menu">
            {
              Object.keys(topics).map(topic => (
                <Fragment>
                  <DropdownItem header>{ topic }</DropdownItem>
                  { topics[topic].map(paper => (
                    <DropdownItem
                      onClick={() => { this.selectPaper(topic, paper.id); }}
                    >
                      { paper.title }
                    </DropdownItem>
                  ))}
                </Fragment>
              ))
            }
          </DropdownMenu>
        </Dropdown>
        <Collapse isOpen={!!paperId}>
          { paperId
            && (

              <Button
                className="mt-3"
                color="warning"
                onClick={this.togglePaperDestroying}
              >
                Удалить
              </Button>
            )
          }
        </Collapse>
      </Fragment>
    );
  }
}

PaperUpdating.propTypes = {
};

export default PaperUpdating;
