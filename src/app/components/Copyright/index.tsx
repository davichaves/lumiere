/**
 *
 * Copyright
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

interface Props {}

export const Copyright = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t('Copyright.copyright')}
      <Link color="inherit" href="https://material-ui.com/">
        Lumiere
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
});
