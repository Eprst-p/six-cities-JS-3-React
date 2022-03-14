/* eslint-disable no-console */
import Card from '../card/card';
import SortForm from './sort-form';
import MainMap from '../map/main-map';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {changeCity, chooseOfferID} from '../../store/action';
import {getOffersForCity, getChosenOffer, getSortedOffers} from '../../store/selectors';
import {Variant} from '../../settings/card-variants';


function MainScreen(): JSX.Element {
  const cities = useAppSelector((state) => state.cities);
  const newCity = useAppSelector((state) => state.city);
  const offersForCity = useAppSelector(getOffersForCity);
  const chosenOffer = useAppSelector(getChosenOffer);
  const sortedOffers = useAppSelector(getSortedOffers);
  const dispatch = useAppDispatch();

  const handlerOnCityClick = (city: string) => {
    dispatch(changeCity(city));
  };
  const handlerMouseEnterCard = (id: number) => {
    dispatch(chooseOfferID(id));
  };
  const handlerMouseLeaveCard = () => {
    dispatch(chooseOfferID(0));
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              cities.map((city) =>
                (
                  <li className="locations__item" key={city}>
                    <a className="locations__item-link tabs__item" href="/#" onClick = {() => handlerOnCityClick(city)}>
                      <span>{city}</span>
                    </a>
                  </li>
                ),
              )
            }
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{`${offersForCity.length} places to stay in ${newCity}`}</b>
              <SortForm />
            <div className="cities__places-list places__list tabs__content">
              {
                sortedOffers.map((location) => (
                  <Card
                    key={`place-card-${location.id}`}
                    variant={Variant.PlaceCard}
                    offer={location}
                    handlerMouseEnterCard={() => handlerMouseEnterCard(location.id)}
                    handlerMouseLeaveCard={() => handlerMouseLeaveCard()}
                  />))
              }
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <MainMap chosenOffer={chosenOffer} offers={offersForCity} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
