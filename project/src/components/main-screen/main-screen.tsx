/* eslint-disable no-console */
import PlacesAndMap from './places-and-map';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-hooks';
import { changeCity } from '../../store/interface-process/interface-process';
import {getOffersForCity, getCities, getCity, getCitiesMemo, getCityMemo, getOffersForCityMemo} from '../../store/selectors';
import React from 'react';


function MainScreen(): JSX.Element {
  //вариант с мемоизацией самого useSelect, не срабаывает
  //const cities = useAppSelector(getCities, (prev, next) => prev===next);
  //const newCity = useAppSelector(getCity, (prev, next) => prev===next);
  //const offersForCity = useAppSelector(getOffersForCity, (prev, next) => prev===next);

  const cities = useAppSelector(getCitiesMemo);
  const newCity = useAppSelector(getCityMemo);
  const offersForCity = useAppSelector(getOffersForCityMemo);

  const dispatch = useAppDispatch();

  const handlerOnCityClick = React.useCallback((city: string) =>dispatch(changeCity(city)), []);

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
        <PlacesAndMap offers={offersForCity} city={newCity} />
      </div>
    </main>
  );
}

export default MainScreen;
