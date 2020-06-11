/**
 *
 * CheckoutPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectCheckoutPage } from './selectors';
import { checkoutPageSaga } from './saga';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { PaymentForm } from '../../components/PaymentForm/index';
import { Review } from '../../components/Review/index';
import { Navigation } from '../../components/Navigation';
import { Copyright } from '../../components/Copyright/index';
import { BASE_URL, API_KEY } from '../../constants';

interface Props {}

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(500 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(5, 5, 5),
  },
  separator: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  buttonGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonWatch: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    width: '50%',
    height: '40px',
  },
}));

const steps = ['Payment', 'Watch Film'];

const promise = loadStripe(
  'pk_test_514N77t4p8YFTjFXka3zhKeSuKFhTy20nzc6iD7hf2w7qKEuO2m7dsyYQxM6CEkTHKdpsls1iIpVqep5jMRH8A5lX00dtidNgV7',
);

export const CheckoutPage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: checkoutPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkoutPage = useSelector(selectCheckoutPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  let { blob } = useParams();

  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    fetch(`${BASE_URL}/tickets/paid`, {
      method: 'POST',
      body: JSON.stringify({
        movie_id: checkoutPage.movie.id,
      }),
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
        Authorization: String(Cookies.get('token')),
      },
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.error) {
          console.log('checkout paid error: ', data.error);
        } else {
          setActiveStep(activeStep + 1);
          dispatch(actions.setTicket(data.ticket));
          dispatch(actions.setMovie(data.movie));
        }
      });
  };

  useEffect(() => {
    if (checkoutPage.movie.id === 0) {
      fetch(`${BASE_URL}/movies/${blob}`, {
        method: 'GET',
        headers: {
          'api-key': API_KEY,
          Authorization: String(Cookies.get('token')),
        },
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            dispatch(actions.setMovie(data.movie));
            dispatch(actions.setCurrentUser(data.user));
            const body = JSON.stringify({
              movie_id: data.movie.id,
              user_id: data.user.id,
            });
            fetch(`${BASE_URL}/tickets`, {
              method: 'POST',
              body: body,
              headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY,
                Authorization: String(Cookies.get('token')),
              },
            })
              .then(resp => resp.json())
              .then(data => {
                if (data.error) {
                  console.log('data movies error: ', data.error);
                  if (data.error === 'valid ticket found') {
                    dispatch(actions.setTicket(data.ticket));
                    setActiveStep(activeStep + 1);
                  }
                } else {
                  dispatch(actions.setTicket(data.ticket));
                  dispatch(actions.setClientSecret(data.client_secret));
                }
              });
          }
        });
    }
  });

  if (checkoutPage.ticket.status === 'paid' && activeStep === 0) {
    setActiveStep(activeStep + 1);
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Checkout - {checkoutPage.movie.title}</title>
        <meta name="description" content="Description of CheckoutPage" />
      </Helmet>
      <CssBaseline />
      <Navigation user={checkoutPage.current_user} />
      <Elements stripe={promise}>
        <main className={classes.layout}>
          {checkoutPage.movie.id !== 0 && (
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Rent - {checkoutPage.movie.title}
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Review movie={checkoutPage.movie} />
              <Divider variant="middle" className={classes.separator} />
              <React.Fragment>
                {activeStep === 1 ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is {checkoutPage.ticket.id}. We have
                      emailed your order confirmation.
                    </Typography>
                    <Grid item xs={12} md={12} className={classes.buttonGrid}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          history.push(`/watch`);
                        }}
                        className={classes.buttonWatch}
                      >
                        Watch Now
                      </Button>
                    </Grid>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <PaymentForm
                      ticket={checkoutPage.ticket}
                      clientSecret={checkoutPage.client_secret}
                      handleNext={handleNext}
                    />
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          )}
          <Copyright />
        </main>
      </Elements>
    </React.Fragment>
  );
});
