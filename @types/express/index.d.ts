import { User } from './path/to/user/schema'; // Adjust the import according to your user schema path

declare global {
  namespace Express {
    interface User {
      userId: string; // Add other properties if needed
      username: string; // Example of another property
      // ...other user properties
    }

    interface Request {
      user?: User;
    }
  }
}
