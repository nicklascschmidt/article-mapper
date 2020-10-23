import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';

import App from './App';

afterEach(cleanup)

test('<Layout> renders correctly', () => {
  const { getByText, getByTestId } = render(<App />);
  expect(getByText(/article mapper/i)).toBeInTheDocument();
  expect(getByTestId('layout-container')).toBeTruthy();
});

