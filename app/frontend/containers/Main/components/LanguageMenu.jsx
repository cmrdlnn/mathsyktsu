import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeLanguage } from 'modules/language';

const LanguageMenu = ({ language, languageChange }) => (
  <div className="language-menu">
    {
      language === 'russian' ? (
        <Fragment>
          <button className="rus-active" />
          <button className="eng" onClick={languageChange} />
        </Fragment>
      ) : (
        <Fragment>
          <button className="rus" onClick={languageChange} />
          <button className="eng-active" />
        </Fragment>
      )
    }
  </div>
);

LanguageMenu.propTypes = {
  language: PropTypes.string.isRequired,
  languageChange: PropTypes.func.isRequired,
};

const mapStateToProps = ({ language }) => ({ language });

const mapDispatchToProps = dispatch => ({
  languageChange: bindActionCreators(changeLanguage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageMenu);
