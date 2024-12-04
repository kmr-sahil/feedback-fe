"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent :any) => {
  const AuthenticatedComponent = (props :any) => {
    const router = useRouter();

    useEffect(() => {
      const isLogin = localStorage.getItem('isLogin');
      const isBusiness = localStorage.getItem('isBusiness');

      if (isLogin) {
        const loginDate = new Date(isLogin);
        const currentDate = new Date();
        const daysDifference =
          (currentDate.getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24); // Difference in days

        if (daysDifference > 30 && isBusiness != 'true') {
          router.back(); // Redirect back if conditions are met
        }
      } else {
        router.push('/business/signin'); // Redirect to login if not authenticated
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
