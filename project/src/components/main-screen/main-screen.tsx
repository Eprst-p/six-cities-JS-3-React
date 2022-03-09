/* eslint-disable no-console */
import PlaceCard from './place-card';
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
  const handlerMouseEnterCard = (CardId: number) => {
    dispatch(chooseOfferID(CardId));
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
