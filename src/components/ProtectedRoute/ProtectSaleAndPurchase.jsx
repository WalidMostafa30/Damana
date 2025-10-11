import { usePermission } from "../../hooks/usePermission";

const ProtectSaleAndPurchase = ({ permission, children }) => {
  const { hasAndUser } = usePermission();

  if (!hasAndUser(permission)) {
    return <div></div>;
  }

  return children;
};

export default ProtectSaleAndPurchase;
