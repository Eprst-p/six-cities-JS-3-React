import {CommentType} from '../../types/comment-type';

const sortByNewerDate = (first:CommentType, second:CommentType) => {
  const firstDate = new Date(first.date);
  const secondDate = new Date(second.date);
    return +secondDate - +firstDate;
}

export {sortByNewerDate};
