// utils/checkPermission.js

export const hasPermission = (user, permission) => {
  if (!user) return false;

  // لازم يكون user من نوع company
  if (user.account_type !== "company") return false;

  // لو هو الـ primary user يبقى عنده كل الصلاحيات
  if (user.is_company_primary === 1) return true;

  // لو مش primary يبقى لازم company_permissions موجودة
  if (!Array.isArray(user.company_permissions)) return false;

  return user.company_permissions.includes(permission);
};

export const hasUserAndPermission = (user, permission) => {
  if (!user) return false;

  // ✅ لو اليوزر مش شركة → نسمح له يدخل
  if (user.account_type !== "company") return true;

  // ✅ لو الشركة Primary → نسمح له يدخل
  if (user.is_company_primary === 1) return true;

  // ✅ لو الشركة مش Primary → لازم يكون عندها صلاحيات
  if (!Array.isArray(user.company_permissions)) return false;

  return user.company_permissions.includes(permission);
};

// عشان تشيك اكتر من صلاحية
export const hasAnyPermission = (user, permissions = []) => {
  if (!user || user.account_type !== "company") return false;

  if (user.is_company_primary === 1) return true;

  if (!Array.isArray(user.company_permissions)) return false;

  return permissions.some((perm) => user.company_permissions.includes(perm));
};

export const hasAllPermissions = (user, permissions = []) => {
  if (!user || user.account_type !== "company") return false;

  if (user.is_company_primary === 1) return true;

  if (!Array.isArray(user.company_permissions)) return false;

  return permissions.every((perm) => user.company_permissions.includes(perm));
};
