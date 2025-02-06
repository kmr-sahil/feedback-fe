"use client"
import { useRouter } from 'next/navigation';
import { useProjectContext } from "@/app/projectContext";

const withAuth = (WrappedComponent :any) => {
  const AuthenticatedComponent = (props :any) => {
    const router = useRouter();

    const {isAuth, loading} = useProjectContext(); // true means authenticated user and false means not

    if(loading) {
      return <div></div>;
    }

    if(!isAuth && !loading) {
      router.push('/business/signin');
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
