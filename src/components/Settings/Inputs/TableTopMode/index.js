import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { updateSettings } from 'store/settings';

const NAME = 'Settings.Inputs.TableTopMode';

const useStyles = makeStyles({
  switch: {
    marginRight: 10,
  },
});

function TableTopMode({ dispatch, displayHelperText, name, value }) {
  const classes = useStyles();
  const { t } = useTranslation('UI');

  const handleChange = useCallback((e) => {
    dispatch(updateSettings({ tableTopMode: e.target.checked }));
  }, [dispatch]);

  return (
    <FormGroup>
      <FormControlLabel
        control={(
          <Switch
            name={name}
            checked={value}
            onChange={handleChange}
            className={classes.switch}
          />
        )}
        label={t(`${NAME}.label`)}
      />
      {displayHelperText && <FormHelperText>{t(`${NAME}.helperText`)}</FormHelperText>}
    </FormGroup>
  );
}

TableTopMode.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayHelperText: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.bool.isRequired,
};

TableTopMode.defaultProps = {
  displayHelperText: false,
  name: 'tableTopMode',
};

export default connect((state) => ({ value: state.settings.tableTopMode }))(TableTopMode);
