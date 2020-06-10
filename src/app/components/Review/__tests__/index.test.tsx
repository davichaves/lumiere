import React from 'react';
import { render } from '@testing-library/react';

import { Review } from '..';

describe('<Review  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Review movie={{}} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
