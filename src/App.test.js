import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login screen when not authenticated', () => {
  render(<App />);
  const usernameLabel = screen.getByText(/username/i);
  const passwordLabel = screen.getByText(/password/i);
  expect(usernameLabel).toBeInTheDocument();
  expect(passwordLabel).toBeInTheDocument();
});
