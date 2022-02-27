import {commentType} from '../../types/comment-type';

type PropretyReviewProps = {
  comment: commentType;
}

function PropretyReview({comment} : PropretyReviewProps): JSX.Element {

  //тут надо дату преобразовать в нужный формат. Я пока не понял, как это сделать с дефолтным Date

  return (
    <>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          Max
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
      </div>
    </>
  );
}

export default PropretyReview;
