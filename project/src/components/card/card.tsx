import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import {Variant} from '../../settings/card-variants';
import {offerType} from '../../types/offer-types';
import {generatePath} from "react-router";
import React, { useCallback, useMemo } from 'react';
import {useAppDispatch} from '../../hooks/redux-hooks';
import {changeFavoritesAction, fetchFavoritesAction, fetchOffersAction, fetchOffersNearByAction } from '../../store/api-actions';
import throttle from 'lodash.throttle'


type CardProps = {
  variant: Variant;
  offer: offerType;
  handleMouseOverCard: (id:number) => void;
}

type CardClasses = {
  articleClass: string,
  divImgWrapperClass: string,
  divInfoClass: string,
  imgWidth: number,
  imgHeigh: number,
}

const cardDifferences:Map<Variant, CardClasses> = new Map();

cardDifferences
  .set(
    Variant.PlaceCard, {
      articleClass: "cities__place-card place-card",
      divImgWrapperClass: "cities__image-wrapper place-card__image-wrapper",
      divInfoClass: "place-card__info",
      imgWidth: 260,
      imgHeigh: 200,
    }
  )
  .set(
    Variant.FavoriteCard, {
      articleClass: "favorites__card place-card",
      divImgWrapperClass: "favorites__image-wrapper place-card__image-wrapper",
      divInfoClass: "favorites__card-info place-card__info",
      imgWidth: 150,
      imgHeigh: 110,
    }
  )
  .set(
    Variant.NearPlaceCard, {
      articleClass: "near-places__card place-card",
      divImgWrapperClass: "near-places__image-wrapper place-card__image-wrapper",
      divInfoClass: "place-card__info",
      imgWidth: 260,
      imgHeigh: 200,
    }
  );

function Card({variant, offer, handleMouseOverCard} : CardProps): JSX.Element {
  const cardSettings = useMemo(() => cardDifferences.get(variant), [variant]);
  const favoriteStatus = offer.isFavorite;
  const dispatch = useAppDispatch();

  const handleMouseEnterCard = useCallback(throttle(() => handleMouseOverCard(offer.id), 350), [handleMouseOverCard]);
  const handleMouseLeaveCard = useCallback(throttle(() => handleMouseOverCard(0), 350), [handleMouseOverCard]);
  const handleBookmarkClick = useCallback(() => {
    dispatch(changeFavoritesAction(offer))
    .then(() => dispatch(fetchOffersAction()))
    .then(() => dispatch(fetchFavoritesAction()))
    .then(() => dispatch(fetchOffersNearByAction(offer.id)));
  }, [dispatch, offer]);

  return (
    <article className={cardSettings?.articleClass} onMouseEnter={handleMouseEnterCard} onMouseLeave={handleMouseLeaveCard} >
      {
        offer.isPremium
        ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : null
      }
      <div className={cardSettings?.divImgWrapperClass}>
        <Link  to={generatePath(AppRoute.Proprety, {id: `${offer.id}`})}>
          <img className="place-card__image" src={offer.previewImage} width={cardSettings?.imgWidth} height={cardSettings?.imgHeigh} alt="Place" />
        </Link>
      </div>
      <div className={cardSettings?.divInfoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${favoriteStatus ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating)*20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link  to={generatePath(AppRoute.Proprety, {id: `${offer.id}`})}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

function equalProps(prevProps:CardProps, nextProps:CardProps) {
  return prevProps.offer === nextProps.offer && prevProps.variant === nextProps.variant;
};

export default React.memo(Card, equalProps) ;
