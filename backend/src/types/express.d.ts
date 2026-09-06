// Augments Express's Request type with the field requireAuth attaches, so
// every controller gets req.user typed without a cast.
declare namespace Express {
  export interface Request {
    user?: {
      id: string;
    };
  }
}