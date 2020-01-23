import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import { allowAudio } from 'store/allowAudio';
import { updateSettings } from 'store/settings';

const AllowAudio = ({ dispatch, isAllowed, ...passThroughProps }) => {
  const { t } = useTranslation('UI');

  const handleAllowAudio = useCallback(() => {
    dispatch(updateSettings({ audio: true }));
    dispatch(allowAudio());
  }, [dispatch]);

  return !isAllowed ? (
    <Alert
      severity="info"
      variant="outlined"
      action={(
        <Button color="inherit" size="small" onClick={handleAllowAudio}>
          {t('AllowAudio.action')}
        </Button>
      )}
      {...passThroughProps}
    >
      {t('AllowAudio.text')}
    </Alert>
  ) : null;
};

AllowAudio.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAllowed: PropTypes.bool.isRequired,
};

export default connect((state) => ({ isAllowed: state.allowAudio }))(AllowAudio);
