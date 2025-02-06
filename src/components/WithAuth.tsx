"use client";
import { useRouter } from "next/navigation";
import { useProjectContext } from "@/app/projectContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const { isAuth, loading } = useProjectContext();

    useEffect(() => {
      if (!loading && !isAuth) {
        toast.error("Please login to access this page");
        router.push("/business/signin");
      }
    }, [isAuth, loading]); // Ensure it only triggers when loading is done

    if (loading) {
      return <div></div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
