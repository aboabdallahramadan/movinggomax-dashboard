'use client';

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-boxdark">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
        
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-dark dark:text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-body-color dark:text-bodydark">
            The page you are looking for might have been removed, 
            had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-opacity-90"
        >
          <svg
            className="fill-current"
            width="16"
            height="14"
            viewBox="0 0 16 14"
          >
            <path d="M14.7 6.29a1 1 0 0 0 0-1.41l-6-6a1 1 0 0 0-1.41 0l-6 6a1 1 0 1 0 1.41 1.41L8 1.59l5.29 5.29a1 1 0 0 0 1.41 0z" />
          </svg>
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
