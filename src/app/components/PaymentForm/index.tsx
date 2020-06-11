/**
 *
 * PaymentForm
 *
 */
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface Props {
  ticket: any;
  clientSecret: string;
  handleNext: Function;
}

const useStyles = makeStyles(theme => ({
  cardGrid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buttonGrid: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    width: '50%',
    height: '40px',
  },
  buttonProgress: {
    color: '#ffffff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const PaymentForm = memo((props: Props) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  const classes = useStyles();

  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleChange = async event => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    let cardElement = elements!.getElement(CardElement);
    if (cardElement != null) {
      const payload = await stripe!.confirmCardPayment(props.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'testing',
          },
        },
      });
      console.log('payload finished', payload);
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
      } else {
        setError('');
        setProcessing(false);
        setSucceeded(true);
        props.handleNext();
      }
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Credit/Debit Card
      </Typography>
      <Grid container spacing={3}>
        {/* Show any error that happens when processing the payment */}
        {error && <Error>{error}</Error>}
        <Grid item xs={12} md={12} className={classes.cardGrid}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.buttonGrid}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
            disabled={processing || disabled || succeeded}
          >
            {processing ? (
              <CircularProgress size={24} className={classes.buttonProgress} />
            ) : (
              'Pay'
            )}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});

const Error = styled.div`
  color: rgb(256, 115, 134);
  font-size: 16px;
  line-height: 20px;
  margin-top: 30px;
  text-align: center;
  width: 100%;
`;
