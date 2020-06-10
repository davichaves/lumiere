import React from 'react';
import { render } from '@testing-library/react';

import { PaymentForm } from '..';

describe('<PaymentForm  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<PaymentForm />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
