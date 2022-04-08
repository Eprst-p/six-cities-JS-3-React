import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PlacesAndMap from './main-screen';
import { datatype } from 'faker/locale/vi';
import { SortOption } from '../../settings/sort-options';
import { makeFakeCities, makeFakeOffers } from '../../mocks/data-mock';
import { address} from 'faker';
import { AuthorizationStatus } from '../../settings/auth-status';

const mockStore = configureMockStore();

describe('Component: PlacesAndMap', () => {
  const history = createMemoryHistory();
  history.push('/');

  it('should render "PlacesAndMap" when offersForCity !== 0', () => {
    const mockOffers = makeFakeOffers;
    const fakeCities = makeFakeCities;

    const store = mockStore({
        DATA: {
          offers: mockOffers,
        },
        INTERFACE: {
          chosenOfferID: datatype.number(),
          sortOption: SortOption.Popular,
          cities: fakeCities,
          city: fakeCities[0],
        },
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
        },
      }
    );

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
            <PlacesAndMap />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId(/cities_places/i)).toBeInTheDocument();
    expect(screen.getByTestId(/filled_cards_container/i)).toBeInTheDocument();
    expect(screen.getByTestId(/cities__map/i)).toBeInTheDocument();
  });

  it('should not render "PlacesAndMap" when offersForCity === 0', () => {
    const mockOffers = makeFakeOffers;
    const fakeCities = Array.from({length:6}, address.city);

    const store = mockStore({
        DATA: {
          offers: mockOffers,
        },
        INTERFACE: {
          chosenOfferID: datatype.number(),
          sortOption: SortOption.Popular,
          cities: fakeCities,
          city: fakeCities[0],
        },
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
        },
      }
    );

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
            <PlacesAndMap />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByTestId(/cities_places/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/filled_cards_container/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId(/cities__map/i)).not.toBeInTheDocument();
  });
});
