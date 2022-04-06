import PropretyHost from './property-host';
import PropretyReview from './property-review';
import PropertyFormReview from './property-form-review';
import LoadingScreen from '../loading-screen/loading-screen';
import Card from '../card/card';
import Map from '../map/map';
import {Variant} from '../../settings/card-variants'
import {MapVariant} from '../../settings/map-settings';
import {useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {changeFavoritesAction, fetchCommentsAction, fetchOfferAction, fetchOffersNearByAction} from '../../store/api-actions';
import {AuthorizationStatus} from '../../settings/auth-status'
import {getAuthStatus, getComments, getCommentsFinally, getOffer, getOffersNearBy} from '../../store/selectors';


function PropertyScreen(): JSX.Element {
  const {id} = useParams();
  const currentId = Number(id);
  const currentOffer = useAppSelector(getOffer);
  const offersNearBy = useAppSelector(getOffersNearBy);
  const comments = useAppSelector(getCommentsFinally);
  const allComments = useAppSelector(getComments);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const [favoriteStatus, setFavoriteStatus] = useState(currentOffer?.isFavorite)
  const apartmentFeatures = [
    currentOffer?.type,
    `${currentOffer?.bedrooms} Bedrooms`,
    `Max ${currentOffer?.maxAdults} adults`,
  ];

  const handleMouseOverCard = () => null;

  const handleBigBookmarkClick = useCallback(() => {
    if(currentOffer) {
      dispatch(changeFavoritesAction(currentOffer))
      .then(() => dispatch(fetchOfferAction(currentId)))
      .then(() => setFavoriteStatus(!favoriteStatus));
    }
  }, [favoriteStatus, currentOffer, currentId, dispatch]);

  useEffect(() => {
    if(currentOffer === undefined || currentOffer.id !== currentId) {
      dispatch(fetchOfferAction(currentId));
      dispatch(fetchOffersNearByAction(currentId));
    }
  }, [currentOffer, currentId, dispatch]);

  useEffect(() => {
    if (currentOffer === undefined || currentOffer.id !== currentId) {
      dispatch(fetchCommentsAction(currentId));
    }
  }, [comments, dispatch, currentId, currentOffer]);

  if (!currentOffer || currentOffer.id !== currentId) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {
              currentOffer?.images.map((photo) =>
                (
                  <div className="property__image-wrapper" key={photo}>
                    <img className="property__image" src={photo} alt="studio" key={photo} />
                  </div>),
              )
            }
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {
              currentOffer?.isPremium
              ?
              <div className="property__mark">
                <span>Premium</span>
              </div>
              : null
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {currentOffer?.title}
              </h1>
              <button
                className={`property__bookmark-button button ${favoriteStatus ? 'property__bookmark-button--active' : ''}`}
                type="button"
                onClick={handleBigBookmarkClick}
              >
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${Math.round(currentOffer.rating)*20}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{currentOffer?.rating}</span>
            </div>
            <ul className="property__features">
              {
                apartmentFeatures.map((feature) =>
                  (
                    <li className="property__feature property__feature--entire" key={feature}>
                      {feature}
                    </li>)
                )
              }
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{currentOffer?.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {
                  currentOffer?.goods.map((item) =>
                    (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>)
                  )
                }
              </ul>
            </div>
            <div className="property__host">
              <PropretyHost offer={currentOffer} />
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{allComments.length}</span></h2>
              <ul className="reviews__list">
                {
                  comments.map((comment) =>
                    (
                    <li className="reviews__item" key={`review-${comment.id}`}>
                      <PropretyReview key={`review-${comment.id}`} comment={comment}/>
                    </li>)
                  )
                }
              </ul>
              {
                authStatus === AuthorizationStatus.Auth
                ?
                <PropertyFormReview id={currentId} />
                : null
              }
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map chosenOffer={currentOffer} offers={offersNearBy} variant={MapVariant.RoomMap} />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {
              offersNearBy.map((location) => (
                <li className="reviews__item" key={`near-card-${location.id}`}>
                  <Card
                    key={`place-card-${location.id}`}
                    variant={Variant.NearPlaceCard}
                    offer={location}
                    handleMouseOverCard={handleMouseOverCard}
                  />
                </li>)
                )
            }
          </div>
        </section>
      </div>
    </main>
  );
}

export default PropertyScreen;
