import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const access_token = localStorage.getItem('access_token');

      if (!access_token) {
        router.push('/login'); // Redirect to the login page if there's no access token
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
