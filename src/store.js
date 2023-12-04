import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { routinePromiseWatcherSaga } from "redux-saga-routines";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createInjectorsEnhancer, forceReducerReload } from "redux-injectors";

import rootSaga from "./sagas";
import createReducer from "./reducers";

export default function configureAppStore() {
    const sagaOptions = {};
    const sagaMiddleware = createSagaMiddleware(sagaOptions);

    const middlewares = [sagaMiddleware];

    const store = configureStore({
        reducer: createReducer(),
        middleware: [
            ...getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }),
            ...middlewares,
        ],
        enhancers: [
            createInjectorsEnhancer({
                createReducer,
                runSaga: sagaMiddleware.run,
            }),
        ],
    });
    const persistor = persistStore(store);

    sagaMiddleware.run(rootSaga);
    sagaMiddleware.run(routinePromiseWatcherSaga);

    if (module.hot) {
        module.hot.accept("./reducers", () => {
            forceReducerReload(store);
        });
    }

    return { store, persistor };
}
