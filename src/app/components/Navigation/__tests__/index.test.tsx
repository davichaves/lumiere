import React from 'react';
import { render } from '@testing-library/react';

import { Navigation } from '..';

describe('<Navigation  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Navigation user={{}} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
