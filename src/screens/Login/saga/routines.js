import { createRoutine } from "redux-saga-routines";

export const userLoginRoutine = createRoutine("user/userLogin");

export const userInfoRoutine = createRoutine("user/userData");

export const userLogoutRoutine = createRoutine("user/userLogout");
