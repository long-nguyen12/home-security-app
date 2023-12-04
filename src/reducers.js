import { SECURE_KEY, STORAGE_KEY } from "./constants/app";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { authReducer } from "./screens/Login/saga/slice";
import * as SecureStore from "expo-secure-store";
import createSecureStore from "@neverdull-agency/expo-unlimited-secure-store";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { combineReducers } from "redux";
import { homeReducer } from "./screens/Home/saga/slice";

export default function createReducer(injectedReducers = {}) {
    const secureStorage = createSecureStore();

    const persistConfig = {
        key: STORAGE_KEY,
        storage: AsyncStorage,
        version: 1,
        timeout: 30000,
        stateReconciler: autoMergeLevel2,
    };

    const securePersistConfig = {
        key: SECURE_KEY,
        storage: secureStorage,
        version: 1,
        timeout: 30000,
        stateReconciler: autoMergeLevel2,
    };

    const rootReducer = combineReducers({
        auth: persistReducer(securePersistConfig, authReducer),
        home: homeReducer,
        ...injectedReducers,
    });

    return persistReducer(persistConfig, rootReducer);
}
