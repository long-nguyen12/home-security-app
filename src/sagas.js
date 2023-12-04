import { all } from "redux-saga/effects";
import authSaga from "./screens/Login/saga/saga";
import homeSaga from "./screens/Home/saga/saga";

export default function* rootSaga() {
    yield all([authSaga(),homeSaga()]);
}
