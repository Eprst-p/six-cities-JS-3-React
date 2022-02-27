import {offerType} from '../../types/offer-type';

type PropretyHostProps = {
  offer: offerType | null;
}

function PropretyHost({offer}: PropretyHostProps): JSX.Element {
  return (
    <>
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
          <img className="property__avatar user__avatar" src={offer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="property__user-name">
          {offer?.host.name}
        </span>
        <span className="property__user-status">
          {
            offer?.host.isPro === true
              ?
                'Pro'
              : null
          }
        </span>
      </div>
      <div className="property__description">
        <p className="property__text">
          {offer?.description}
        </p>
        <p className="property__text">
          An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
        </p>
      </div>
    </>
  );
}

export default PropretyHost;
