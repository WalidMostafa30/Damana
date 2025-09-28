// hooks/usePermission.js
import { useSelector } from "react-redux";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasUserAndPermission,
} from "../utils/checkPermission";

export const usePermission = () => {
  const { profile, loading } = useSelector((state) => state.profile);

  return {
    loading,
    has: (perm) => hasPermission(profile, perm),
    hasAndUser: (perm) => hasUserAndPermission(profile, perm),
    hasAny: (perms) => hasAnyPermission(profile, perms),
    hasAll: (perms) => hasAllPermissions(profile, perms),
  };
};
