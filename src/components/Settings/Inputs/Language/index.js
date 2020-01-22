import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import TranslateIcon from '@material-ui/icons/Translate';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import { useMediaQuery } from '@material-ui/core';

const NAME = 'Settings.Inputs.Language';

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
  button: {
    justifyContent: 'space-between',
  },
});

function Language({ className, displayHelperText, fullWidth, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const { t, i18n } = useTranslation('UI');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = useCallback((language) => () => {
    i18n.changeLanguage(language);
    handleClose();
  }, [i18n]);

  return (
    <FormGroup className={clsx({ [classes.fullWidth]: fullWidth })}>
      <Button
        className={clsx(classes.button, className)}
        variant="contained"
        color="primary"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={matches && <TranslateIcon />}
        endIcon={<ArrowDropDownIcon />}
        {...rest}
      >
        {t(`${NAME}.${i18n.language}`)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem value="fr" onClick={handleChange('fr')}>{t(`${NAME}.fr`)}</MenuItem>
        <MenuItem value="en" onClick={handleChange('en')}>{t(`${NAME}.en`)}</MenuItem>
      </Menu>
      {displayHelperText && <FormHelperText>{t(`${NAME}.helperText`)}</FormHelperText>}
    </FormGroup>
  );
}

Language.propTypes = {
  className: PropTypes.string,
  displayHelperText: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Language.defaultProps = {
  className: '',
  displayHelperText: false,
  fullWidth: false,
};

export default Language;
