import {memo} from 'react';
import {CommentType} from '../../types/comment-type';

type PropretyReviewProps = {
  comment: CommentType;
}

function PropretyReview({comment} : PropretyReviewProps): JSX.Element {
  const date = new Date(comment.date);
  const year = date.getFullYear();
  const mounth = date.getMonth();
  const day = date.getDate();

  type optionsType = {
    year: 'numeric';
    month: 'long';
  }
  const options :optionsType = {year: 'numeric', month: 'long'};
  const dateInFormat = new Intl.DateTimeFormat('en-US', options).format(date);

  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
        {
            comment.user.isPro === true
              ?
                <span className="property__user-status">
                  Pro
                </span>
              : null
          }
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${comment.rating*20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={`${year}-${mounth}-${day}`}>{dateInFormat}</time>
      </div>
    </>
  );
}

export default memo(PropretyReview);
