import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import PaperForm from './PaperForm';

class PaperUpdating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownTitle: 'Выберите статью',
      isOpen: false,
      paperId: null,
    };
  }

  hints = () => {
    const paper = this.props.papers.find(({ id }) => id === this.state.paperId);
    const {
      autors,
      description,
      english_autors,
      english_description,
      english_keywords,
      english_title,
      english_topic,
      filename,
      keywords,
      title,
      topic,
    } = paper;

    return {
      autors: {
        defaultValue: autors,
        placeholder: 'Введите новых авторов статьи...',
        title: 'Новые авторы статьи',
      },
      description: {
        defaultValue: description,
        placeholder: 'Введите новое описание статьи...',
        title: 'Новое описание статьи',
      },
      english_autors: {
        defaultValue: english_autors,
        placeholder: 'Введите новых авторов статьи на английском языке...',
        title: 'Новые авторы статьи на английском языке',
      },
      english_description: {
        defaultValue: english_description,
        placeholder: 'Введите новое описание статьи на английском языке...',
        title: 'Новое описание статьи на английском языке',
      },
      english_keywords: {
        defaultValue: english_keywords,
        placeholder: 'Введите новые ключевые слова статьи на английском языке...',
        title: 'Новые ключевые слова статьи на английском языке',
      },
      english_title: {
        defaultValue: english_title,
        placeholder: 'Введите новое название статьи на английском языке...',
        title: 'Новое название статьи на английском языке',
      },
      english_topic: {
        defaultValue: english_topic,
        placeholder: 'Введите тему новой статьи на английском языке...',
        title: 'Тема новой статьи на английском языке',
      },
      file: {
        required: false,
        title: `Новый файл статьи (текущий файл - ${filename})`,
      },
      keywords: {
        defaultValue: keywords,
        placeholder: 'Введите новые ключевые слова для статьи...',
        title: 'Новые ключевые слова статьи',
      },
      title: {
        defaultValue: title,
        placeholder: 'Введите новое название статьи...',
        title: 'Новой название статьи',
      },
      topic: {
        defaultValue: topic,
        placeholder: 'Введите новую тему статьи на английском языке...',
        title: 'Новая тема статьи на английском языке',
      },
    };
  }

  selectPaper = (dropdownTitle, paperId) => {
    this.setState({ dropdownTitle, paperId });
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { onUpdate, topics } = this.props;
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
              <PaperForm
                buttonText="Изменить"
                hints={this.hints()}
                onSubmit={(data) => { onUpdate(paperId, data); }}
              />
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
