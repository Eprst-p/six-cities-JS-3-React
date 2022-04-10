import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import LoginScreen from './login-screen';
import { AuthorizationStatus } from '../../settings/auth-status';
import { internet, name } from 'faker';

const mockStore = configureMockStore();

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');
    const store = mockStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userEmail: internet.email(),
        },
        INTERFACE: {
          cities: Array.from({length: 6}, name.title)
        }
      }
    );

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LoginScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId(/submit_button/i)).toBeInTheDocument();
    expect(screen.getByTestId(/locations_link/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'vasyan_petrosyan@mail.ru');
    userEvent.type(screen.getByTestId('password'), 'ss44');

    expect(screen.getByDisplayValue(/vasyan_petrosyan@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/ss44/i)).toBeInTheDocument();
  });
});
