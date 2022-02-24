import {commentType} from '../types/comment-type';
import {getRandomPositiveNumber, getRandomElement} from './randomaizers';
import {descriptions} from './sources';

const currentDate = new Date();

const generateComment = ():commentType => (
  {
    comment: getRandomElement(descriptions),
    date: currentDate.toString(),
    id: getRandomPositiveNumber(1,10000000),
    rating: getRandomPositiveNumber(10,50)/10,
    user: {
    avatarUrl: 'img/avatar-max.jpg',
    id: getRandomPositiveNumber(1,10000000),
    isPro: Boolean(getRandomPositiveNumber(0, 1)),
    name: 'Oliver.conner'
    }
  }
);

const generateComments = () => {
  const commentsAmount = getRandomPositiveNumber(1, 10);
  const comments = [];
  for (let i = 0; i< commentsAmount; i++) {
    comments.push(generateComment());
  }
  return comments;
};

export {generateComments}
