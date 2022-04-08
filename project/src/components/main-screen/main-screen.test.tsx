import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import MainScreen from './main-screen';
import { name } from 'faker';
import { makeFakeOffers } from '../../mocks/data-mock';

const mockStore = configureMockStore();

describe('Component: MainScreen', () => {
  it('should render "MainScreen" when user navigate to "/" url', () => {
    const history = createMemoryHistory();
    history.push('/');
    const fakeCities = Array.from({length: 6}, name.title);
    const mockOffers = makeFakeOffers;

    const store = mockStore({
        DATA: {
          offers: mockOffers,
        },
        INTERFACE: {
          cities: fakeCities,
          city: fakeCities[0],
        }
      }
    );

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/city/i)).toHaveLength(6);
    expect(screen.getByTestId(/places_and_map/i)).toBeInTheDocument();
  });
});
