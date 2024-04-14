export type Community = {
    id: string;
    name?: string;
    description?: string;
    imageUrl?: string;
    admin?: string;
    createdAt?: Date;
    ratingsCount?: number;
    reviewsCount?: number;
   
  }

  export type User = {
    id: string;
    name: string;
    email: string;
    image?: string;
  }

  