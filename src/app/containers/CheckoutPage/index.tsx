/**
 *
 * CheckoutPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, actions } from './slice';
import { selectCheckoutPage } from './selectors';
import { checkoutPageSaga } from './saga';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { AddressForm } from '../../components/AddressForm/index';
import { PaymentForm } from '../../components/PaymentForm/index';
import { Review } from '../../components/Review/index';
import { Navigation } from '../../components/Navigation';
import { Copyright } from '../../components/Copyright/index';
import { BASE_URL, API_KEY } from '../../constants';
import { Movie } from '../HomePage/types';

interface Props {}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Billing address', 'Payment details', 'Review your order'];

function getStepContent(step: number, movie: Movie) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review movie={movie} />;
    default:
      throw new Error('Unknown step');
  }
}

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
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (Object.keys(checkoutPage.current_user).length === 0) {
      fetch(`${BASE_URL}/users/profile`, {
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
            // Here you should have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
          } else {
            // setUser(data);
            dispatch(actions.setCurrentUser(data));
          }
        });
    }
    if (checkoutPage.movie.id === 0) {
      fetch(`${BASE_URL}/movies/${blob}`, {
        method: 'GET',
        headers: {
          'api-key': API_KEY,
        },
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('checkout movie', data);
          if (data.error) {
            console.log(data.error);
            // Here you should have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
          } else {
            dispatch(actions.setMovie(data));
          }
        });
    }
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Checkout - {checkoutPage.movie.title}</title>
        <meta name="description" content="Description of CheckoutPage" />
      </Helmet>
      <CssBaseline />
      <Navigation user={checkoutPage.current_user} />
      <main className={classes.layout}>
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
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, checkoutPage.movie)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
});
