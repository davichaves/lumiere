import React from 'react';
import { render } from '@testing-library/react';

import { AddressForm } from '..';

describe('<AddressForm  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AddressForm />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
