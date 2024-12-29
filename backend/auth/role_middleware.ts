import express from "express";

export const checkRole = (requiredRole: string) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //@ts-ignore
    const roles = req.userWithRoles?.roles;

    if (!roles || !Array.isArray(roles)) {
      return res.status(403).json({ message: "Roles not found or invalid" });
    }

    if (!roles.includes(requiredRole)) {
      return res.status(403).json({ message: `Access denied: Requires role '${requiredRole}'` });
    }

    next(); 
  };
};