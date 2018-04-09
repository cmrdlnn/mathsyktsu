import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Paper from '../components/Paper';
import PapersManagment from '../components/PapersManagment';

class Papers extends React.Component {
  componentWillMount() {
    const { issue, papersIndex } = this.props;

    if (issue) papersIndex(issue.id);
  }

  componentWillReceiveProps(nextProps) {
    const { issue, papersIndex } = nextProps;

    if (this.props.issue.id !== issue.id) papersIndex(issue.id);
  }

  topics = () => {
    const { isRussian, papers: { all } } = this.props;

    return all.reduce((result, paper) => {
      let currentTopic;
      let paperProps = { id: paper.id };
      let prefix;

      if (isRussian) {
        currentTopic = paper.topic;
        prefix = '';
        paperProps.keywordsTitle = 'Ключевые слова';
        paperProps.linkTitle = 'Скачать статью';
      } else {
        currentTopic = paper.english_topic;
        prefix = 'english_';
        paperProps.keywordsTitle = 'Keywords';
        paperProps.linkTitle = 'Download paper';
      }

      paperProps = ['autors', 'description', 'keywords', 'title'].reduce((props, prop) => {
        props[prop] = paper[`${prefix}${prop}`];
        return props;
      }, paperProps);

      if (!result[currentTopic]) {
        result[currentTopic] = [paperProps];
      } else {
        result[currentTopic].push(paperProps);
      }

      return result;
    }, {});
  }

  render() {
    const { papers: { all, fetching } } = this.props;

    if (fetching) return null;

    const {
      isRedactor,
      isRussian,
      issue,
      modalIsOpen,
      paperCreate,
      paperDestroy,
      paperUpdate,
      sendModalProps,
    } = this.props;

    const topics = this.topics();

    return (
      <Fragment>
        { isRedactor
          && (
            <PapersManagment
              issue={issue}
              paperCreate={paperCreate}
              paperDestroy={paperDestroy}
              papers={all}
              papersExists={!!all.length}
              paperUpdate={paperUpdate}
              modalIsOpen={modalIsOpen}
              sendModalProps={sendModalProps}
              topics={topics}
            />
          )
        }
        { all.length ? (
          <Fragment>
            <div className="paper-wrapper">
              <div className="paper-title">
                { isRussian ? 'СТАТЬИ' : 'PAPERS' }
              </div>
            </div>
            {
              Object.keys(topics).map(topic => (
                <div className="mb-3 mt-3">
                  <h4>
                    { topic }
                  </h4>
                  <div className="topic-containers">
                    { topics[topic].map(paper => <Paper {...paper} />) }
                  </div>
                </div>
              ))
            }
          </Fragment>
        ) : (
          <p className="caption">
            {
              isRussian ? (
                'Не найдено ни одной статьи у данного экземпляра журнала'
              ) : (
                'No paper found in this issue'
              )
            }
          </p>
        )}
      </Fragment>
    );
  }
}

Papers.defaultProps = { issue: null };

Papers.propTypes = {
  isRussian: PropTypes.bool.isRequired,
  issue: PropTypes.shape({
    english_title: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  papers: PropTypes.shape({
    all: PropTypes.arrayOf(
      PropTypes.shape({
        autors: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        english_autors: PropTypes.string.isRequired,
        english_description: PropTypes.string.isRequired,
        english_keywords: PropTypes.string.isRequired,
        english_title: PropTypes.string.isRequired,
        english_topic: PropTypes.string.isRequired,
        filename: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        keywords: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        topic: PropTypes.string.isRequired,
      }),
    ).isRequired,
    fetching: PropTypes.bool.isRequired,
  }).isRequired,
  papersIndex: PropTypes.func.isRequired,
};

export default Papers;

