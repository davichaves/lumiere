/**
 *
 * PaymentForm
 *
 */
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface Props {
  ticket: any;
  clientSecret: string;
}

const useStyles = makeStyles(theme => ({
  cardGrid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
      }
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Credit/Debit Card
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} className={classes.cardGrid}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
