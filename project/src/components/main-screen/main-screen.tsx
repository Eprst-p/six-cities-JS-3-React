/* eslint-disable no-console */
import PlacesAndMap from './places-and-map';
import EmptyPlaces from './empty-places';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import { changeCity } from '../../store/interface-process/interface-process';
import {getOffersForCity, getCities, getCity} from '../../store/selectors';
import {memo, useCallback} from 'react';


function MainScreen(): JSX.Element {
  const cities = useAppSelector(getCities);
  const newCity = useAppSelector(getCity);
  const offersForCity = useAppSelector(getOffersForCity);
  const dispatch = useAppDispatch();

  const handlerOnCityClick = useCallback((city: string) =>dispatch(changeCity(city)), [dispatch]);

  return (
    <main className={`page__main page__main--index ${offersForCity.length === 0 ? 'page__main--index-empty' : ''}`}>
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
        {
          offersForCity.length === 0
          ?
          <EmptyPlaces city={newCity} />
          :
          <PlacesAndMap offers={offersForCity} city={newCity} />
        }
      </div>
    </main>
  );
}

export default memo(MainScreen);
