export type Comment = {
  id: string;
  movie_id: string;
  message: string;
  created_at: string;
};

export type CommentsDto = Comment[];
