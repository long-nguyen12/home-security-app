import * as ROUTES from "../../../constants/routes";

import { call, put, takeEvery, takeLeading } from "redux-saga/effects";
import {
  userData,
  userLogin,
} from "../../../epics-reducers/services/userServices";
import * as navigationService from "../../../epics-reducers/navigationServices";
import LoadingService from "../../../components/Loading/LoadingService";
import {
  userInfoRoutine,
  userLoginRoutine,
  userLogoutRoutine,
} from "./routines";

export function* loginAction(action) {
  try {
    LoadingService.show();
    const responseData = yield call(userLogin, action.payload);
    if (responseData.token) {
      const responseInfo = yield call(userData, responseData.token);
      const data = Object.assign({}, responseInfo, {
        token: responseData.token,
      });
      yield put(userLoginRoutine.success(data));
      navigationService.replace(ROUTES.APP_MAIN);
    }
    LoadingService.hide();
  } catch (err) {
    LoadingService.hide();
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
