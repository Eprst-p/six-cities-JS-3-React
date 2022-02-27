/* eslint-disable no-console */
import FavoriteCard from './favorite-card';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {offerTypes, offerType} from '../../types/offer-types';
import {useState,} from 'react';

type FavoritesLocationsProps = {
  city: string;
  locationsPerCity: offerTypes;
}

function FavoritesLocations({city, locationsPerCity}: FavoritesLocationsProps): JSX.Element {
  const [id, setId] = useState(0);
  const handlerMouseEnterCard = (offer?: offerType) => {
    offer
    ?
    setId(offer.id)
    :
    setId(0)
  };
  console.log(id)

  return (
    <>
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {
          locationsPerCity.map((location) => (
            <FavoriteCard
              key={`favorite-card-${location.id}`}
              offer={location}
              handlerMouseEnterCard={() => handlerMouseEnterCard(location)}
              handlerMouseLeaveCard={() => handlerMouseEnterCard()}
              />))
        }
      </div>
    </>
  );
}

export default FavoritesLocations;
