import cors from "cors";
import express from "express";
import { verifyJWT } from "./auth/auth_middleware";
import { checkRole } from "./auth/user_filter";
import Roles from "./auth/Roles";
import { corsOptions } from "./configs/cors";
const app = express();
const port = 9001;


app.use(cors(corsOptions)); // Apply CORS middleware


app.get(
  "/protected",
  verifyJWT as any,
  checkRole(Roles.User) as any,
  (req: express.Request, res: express.Response) => {
    //@ts-ignore
    res.json({ message: "Access granted", user: req.userWithRoles });
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
