// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ReactNode } from "react";
import { useGetAuthDetailsQuery } from "../services/authDetailsApi";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const admin = useSelector((state: RootState) => state.auth.admin);
  const { isLoading } = useGetAuthDetailsQuery(undefined, {
    skip: !!admin,
  });
  if (!admin) {
    return <Navigate to="/" replace />;
  }
  if (isLoading) return <div>Checking authentication...</div>;
  return children;
};

export default ProtectedRoute;
