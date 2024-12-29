import cors from "cors";
import express from "express";
import { verifyJWT } from "./auth/auth_middleware";
import { checkRole } from "./auth/role_middleware";
const app = express();
const port = 9001;



// CORS setup
const corsOptions = {
  origin: "*", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};

app.use(cors(corsOptions)); // Apply CORS middleware
// Protected route

app.get(
  "/protected",
  verifyJWT as any,
  checkRole("user") as any,
  (req: express.Request, res: express.Response) => {
    //@ts-expect-error
    res.json({ message: "Access granted", user: req.user });
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
