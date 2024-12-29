import express from "express";

declare global {
  namespace Express {
    interface Request {
      userWithRoles?: {
        user: any;
        roles: string[];
      };
    }
  }
}