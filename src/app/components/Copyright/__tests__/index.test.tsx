import React from 'react';
import { render } from '@testing-library/react';

import { Copyright } from '..';

describe('<Copyright  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Copyright />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
