/* eslint-disable no-console */
import PropretyHost from './proprety-host';
import PropretyReview from './proprety-review';
import PropretyFormReview from './proprety-form-review';
import LoadingScreen from '../loading-screen/loading-screen';
import Card from '../card/card';
import RoomMap from '../map/room-map';
import {Variant} from '../../settings/card-variants'
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks/redux-hooks';
import {fetchCommentsAction, fetchOfferAction, fetchOffersNearByAction} from '../../store/api-actions';


function PropretyScreen(): JSX.Element {
  const offer = useAppSelector((state) => state.offer);
  const offersNearBy = useAppSelector((state) => state.offersNearBy);
  const comments = useAppSelector((state) => state.comments);
  const {id} = useParams();
  const currentId = Number(id);
  const dispatch = useAppDispatch();
  const apartmentFeatures = [
    offer?.type,
    `${offer?.bedrooms} Bedrooms`,
    `Max ${offer?.maxAdults} adults`,
  ];

  useEffect(() => {
    if (offer === undefined || offer.id !== currentId) {
      dispatch(fetchOfferAction(currentId));
      dispatch(fetchCommentsAction(currentId));
      dispatch(fetchOffersNearByAction(currentId));
    }
  }, [currentId, dispatch, comments, offer, offersNearBy]);

  if (!offer || offer.id !== currentId) {
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
              offer?.images.map((photo) =>
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
              offer?.isPremium === true
              ?
              <div className="property__mark">
                <span>Premium</span>
              </div>
              : null
            }
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {offer?.title}
              </h1>
              <button className="property__bookmark-button button" type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: '80%'}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{offer?.rating}</span>
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
              <b className="property__price-value">&euro;{offer?.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {
                  offer?.goods.map((item) =>
                    (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>)
                  )
                }
              </ul>
            </div>
            <div className="property__host">
              <PropretyHost offer={offer} />
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments?.length}</span></h2>
              <ul className="reviews__list">
                {
                  comments?.map((comment) =>
                    (
                    <li className="reviews__item" key={`review-${comment.id}`}>
                      <PropretyReview key={`review-${comment.id}`} comment={comment}/>
                    </li>)
                  )
                }
              </ul>
              <PropretyFormReview />
            </section>
          </div>
        </div>
        <section className="property__map map">
          <RoomMap chosenOffer={offer} offers={offersNearBy} />
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

export default PropretyScreen;
