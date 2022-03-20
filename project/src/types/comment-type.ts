export type CommentType = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
};

export type NewCommentType = {
  comment: string
  rating: number
};

export type CommentData = {
  newComment: NewCommentType
  id: number
};
