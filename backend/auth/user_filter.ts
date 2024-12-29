import express from "express";
import Roles from "./Roles";

export const checkRole = (requiredRole: Roles) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    //@ts-ignore
    const roles = req.role;
console.log(roles);

    if (!roles || !Array.isArray(roles)) {

      return res.status(403).json({ message: "Roles not found or invalid" });
    }

    if (!roles.includes(requiredRole)) {
      
      return res.status(403).json({ message: `Access denied: Requires role '${requiredRole}'` });
    }
    else{
      
    }

    next(); // Role is valid, proceed to the next middleware or route
  };
};