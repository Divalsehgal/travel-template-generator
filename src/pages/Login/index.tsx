import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles.module.scss';

const Login = () => {
  const { user, loading, error, signInWithGoogle } = useAuth();

  // Redirect if already logged in
  if (user && !loading) {
    return <Navigate to="/projects" replace />;
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      // Error is handled in the context
      console.error('Login failed:', err);
    }
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["login__container"]}>
        <div className={styles["login__header"]}>
          <span className={`material-symbols-outlined ${styles["login__icon"]}`}>
            landscape
          </span>
          <h1 className={styles["login__title"]}>Shiv Bhoomi</h1>
          <p className={styles["login__subtitle"]}>Trek Template Generator</p>
        </div>

        <div className={styles["login__content"]}>
          <h2 className={styles["login__heading"]}>Welcome Back</h2>
          <p className={styles["login__description"]}>
            Sign in to create and manage your trek itinerary PDFs
          </p>

          {error && (
            <div className={styles["login__error"]}>
              <span className="material-symbols-outlined">error</span>
              {error.message}
            </div>
          )}

          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={styles["login__google-btn"]}
          >
            {loading ? (
              <>
                <span className={`material-symbols-outlined ${styles["login__spinner"]}`}>
                  progress_activity
                </span>
                Signing in...
              </>
            ) : (
              <>
                <svg className={styles["login__google-icon"]} viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>

        <div className={styles["login__footer"]}>
          <p>Create beautiful trek itineraries in minutes</p>
          <div className={styles["login__features"]}>
            <div className={styles["login__feature"]}>
              <span className="material-symbols-outlined">edit_document</span>
              <span>Easy Editor</span>
            </div>
            <div className={styles["login__feature"]}>
              <span className="material-symbols-outlined">picture_as_pdf</span>
              <span>PDF Export</span>
            </div>
            <div className={styles["login__feature"]}>
              <span className="material-symbols-outlined">cloud_sync</span>
              <span>Cloud Sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
