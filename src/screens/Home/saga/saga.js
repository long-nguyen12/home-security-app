import { call, put, takeEvery, takeLeading } from "redux-saga/effects";

import LoadingService from "../../../components/Loading/LoadingService";
import { getSettings } from "../../../epics-reducers/services/settingServices";
import { settingRoutine } from "./routines";

export function* onGetRecords(action) {
    try {
        LoadingService.show();
        const responseData = yield call(getSettings);
        if (responseData) {
            yield put(settingRoutine.success(responseData));
        }
        LoadingService.hide();
    } catch (err) {
        LoadingService.hide();
        yield put(settingRoutine.failure(err));
    }
}

export default function* homeSaga() {
    yield takeLeading(settingRoutine.TRIGGER, onGetRecords);
}
