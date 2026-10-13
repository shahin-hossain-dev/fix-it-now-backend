import { Router } from "express";
import authRouter from "../modules/Auth/auth.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
