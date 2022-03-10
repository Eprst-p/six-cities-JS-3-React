/* eslint-disable no-console */
import PlaceCard from './place-card';
import MainMap from '../map/main-map';
import {offerTypes} from '../../types/offer-types';
import {useState} from 'react';

type MainScreenProps = {
  offers: offerTypes;
  cities: string[];
}

function MainScreen({offers, cities}: MainScreenProps): JSX.Element {
  const [chosenCity, setCity] = useState('Paris');
  const offersForCity = offers.filter((offer) => offer.city.name === chosenCity);
  const handlerOnCityClick = (city: string) => {
    setCity(city)
  };

  const [id, setId] = useState(offersForCity[0].id);
  const handlerMouseEnterCard = (CardId?: number) => {
    setId(CardId ? CardId : 0)
  };

  const chosenOffer = offersForCity.find((offer) => offer.id === id);

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
            <b className="places__found">{`${offersForCity.length} places to stay in ${chosenCity}`}</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              {
                offersForCity.map((location) => (
                  <PlaceCard
                    key={`place-card-${location.id}`}
                    offer={location}
                    handlerMouseEnterCard={() => handlerMouseEnterCard(location.id)}
                    handlerMouseLeaveCard={() => handlerMouseEnterCard()}
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
