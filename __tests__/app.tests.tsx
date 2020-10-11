import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/views/app/app';

describe('<App /> component renders and ', () => {
  test('displays properly header and footer.', () => {
    const { getByText } = render(<App />);
    const headerElement = getByText(/TANKER SHIP ROUTE TRACKER/i);
    expect(headerElement).toBeTruthy();

    const footerElement = getByText(/Created by : Patryk Podolski/i);
    expect(footerElement).toBeTruthy();
  });
});
