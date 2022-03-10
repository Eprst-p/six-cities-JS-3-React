/* eslint-disable no-console */
import PlaceCard from './place-card';
import SortForm from './sort-form';
import MainMap from '../map/main-map';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import {changeCity, chooseOfferID} from '../../store/action';


function MainScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const cities = useAppSelector((state) => state.cities);
  const newCity = useAppSelector((state) => state.city);
  const offerID = useAppSelector((state) => state.chosenOfferID);
  const offersForCity = offers.filter((offer) => offer.city.name === newCity);
  const chosenOffer = offersForCity.find((offer) => offer.id === offerID);
  const dispatch = useAppDispatch();

  const handlerOnCityClick = (city: string) => {
    dispatch(changeCity(city));
    console.log(changeCity(city));
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
                offersForCity.map((location) => (
                  <PlaceCard
                    key={`place-card-${location.id}`}
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
