import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import { updateSettings } from 'store/settings';

const NAME = 'Settings.Inputs.SoundVolume';

const useStyles = makeStyles({
  input: {
    width: 75,
  },
});

function SoundVolume({ dispatch, name, value }) {
  const classes = useStyles();
  const { t } = useTranslation('UI');

  const handleSliderChange = useCallback((e, soundVolume) => {
    dispatch(updateSettings({ soundVolume }));
  }, [dispatch]);

  const handleInputChange = useCallback((e) => {
    let soundVolume = e.target.value === '' ? '' : Number(e.target.value);
    if (soundVolume < 0) { soundVolume = 0; } else if (soundVolume > 100) { soundVolume = 100; }

    dispatch(updateSettings({ soundVolume }));
  }, [dispatch]);

  return (
    <FormControl fullWidth>
      <Typography id={name} variant="body2" gutterBottom>{t(`${NAME}.label`)}</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <VolumeUpIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleSliderChange}
            aria-labelledby={name}
          />
        </Grid>
        <Grid item>
          <OutlinedInput
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleInputChange}
            labelWidth={0}
            inputProps={{
              step: 5,
              min: 0,
              max: 100,
              type: 'number',
            }}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

SoundVolume.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string,
  value: PropTypes.number.isRequired,
};

SoundVolume.defaultProps = {
  name: 'soundVolume',
};

export default connect((state) => ({ value: state.settings.soundVolume }))(SoundVolume);
