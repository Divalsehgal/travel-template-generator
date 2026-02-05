import type { User } from 'firebase/auth';

// User type from Firebase
export type FirebaseUser = User;

// Auth context type
export interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  error: Error | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// User profile data stored in Firestore
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  createdAt: string;
  lastLoginAt: string;
}
