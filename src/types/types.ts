// types/types.ts

export type Community = {
    id: string;
    name?: string;
    description?: string;
    imageUrl?: string;
    admin?: string;
    createdAt?: Date;
    ratingsCount?: number;
    reviewsCount?: number;
    averageRating?: number | string;
    ratings?: Rating[];
    reviews?: Review[];
   
}

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
}

export type Rating = {
 id: string;
 value: number;
 createdAt: Date;
 user: User;
 community: Community;
}

export type Review = {
  id: string;
  content: string;
  createdAt: Date;
  user: User;
  community: Community;
}

export type RatRevCom = Community & {
  ratingsReviews: (Rating & {review?: Review })[];
}

  