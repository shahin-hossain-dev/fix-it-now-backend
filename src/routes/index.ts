import { Router } from "express";
import authRouter from "../modules/Auth/auth.routes";
import serviceRouter from "../modules/Service/service.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/services",
    router: serviceRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
