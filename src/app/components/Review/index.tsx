/**
 *
 * Review
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

interface Props {
  movie: any;
}

const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA',
];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export const Review = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const classes = useStyles();

  const movie = props.movie;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem} key={movie.blob}>
          <ListItemText primary={movie.title} secondary={movie.title} />
          <Typography variant="body2">{`$ ${(movie.price / 100).toFixed(
            2,
          )}`}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {`$ ${(movie.price / 100).toFixed(2)}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
