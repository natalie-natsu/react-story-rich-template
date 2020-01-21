import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'ReBucked',
  },
}));

const NAME = 'ProjectName';

const ProjectName = ({ className, ...typographyProps }) => {
  const classes = useStyles();
  const { t } = useTranslation('UI');

  return (
    <Typography
      className={clsx(classes.root, className)}
      {...typographyProps}
    >
      {t(NAME)}
    </Typography>
  );
};

ProjectName.propTypes = {
  className: PropTypes.string,
};

ProjectName.defaultProps = {
  className: '',
};

export default ProjectName;
