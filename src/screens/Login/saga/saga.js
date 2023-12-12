import * as ROUTES from "../../../constants/routes";

import { call, put, takeLeading } from "redux-saga/effects";
import * as navigationService from "../../../epics-reducers/navigationServices";
import {
  userData,
  userLogin,
} from "../../../epics-reducers/services/userServices";
import {
  userLoginRoutine,
  userLogoutRoutine
} from "./routines";

export function* loginAction(action) {
  try {
    const responseData = yield call(userLogin, action.payload);
    if (responseData.token) {
      const responseInfo = yield call(userData, responseData.token);
      const data = Object.assign({}, responseInfo, {
        token: responseData.token,
      });
      yield put(userLoginRoutine.success(data));
      navigationService.replace(ROUTES.APP_MAIN);
    }
  } catch (err) {
    yield put(userLoginRoutine.failure(err));
  }
}

export function* logoutAction(action) {
  yield put(userLogoutRoutine.success());
  navigationService.replace(ROUTES.APP_AUTH);
}

export default function* authSaga() {
  yield takeLeading(userLoginRoutine.TRIGGER, loginAction);
  yield takeLeading(userLogoutRoutine.TRIGGER, logoutAction);
}
