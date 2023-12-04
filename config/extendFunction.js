import moment from "moment";
import axios from "axios";
import { LogBox } from "react-native";
import { showToast } from "../src/epics-reducers/services/common";
import I18n from "../src/utilities/I18n";
import {
    userInfoRoutine,
    userLoginRoutine,
} from "../src/screens/Login/saga/routines";

export const extendFunction = (store) => {
    let apiReq = 0,
        apiRes = 0;
    LogBox.ignoreAllLogs();
    axios.interceptors.request.use(
        function (config) {
            if (__DEV__)
                console.log(
                    config.method,
                    config.url,
                    JSON.stringify(config.data)
                );

            apiReq++;
            let token = store.getState().auth.token;
            if (token) {
                config.headers["Authorization"] = "Bearer " + token;
            }
            config.timeout = 30000;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (res) => {
            apiRes++;

            if (apiRes === apiReq && res.data.success === false) {
                let message =
                    res.data && res.data.message
                        ? res.data.message
                        : "Đã có lỗi xảy ra!";
                res.data = null;
                console.log(message, "messagemessagemessage");
                showToast(message);
            }
            return res;
        },
        (error) => {
            apiRes++;

            if (error.response && error.response.status === 401) {
                store.dispatch(userLoginRoutine.FAILURE);
                store.dispatch(userInfoRoutine.FAILURE);
            }

            let message = I18n.t("show_error");
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            )
                message = error.response.data.message;
            console.log(message);
            showToast(message);

            return Promise.reject(error);
        }
    );

    moment.updateLocale("en", {
        relativeTime: {
            future: I18n.t("in_s"),
            past: I18n.t("s_ago"),
            s: I18n.t("a_few_seconds"),
            ss: I18n.t("d_seconds"),
            m: I18n.t("a_minute"),
            mm: I18n.t("d_minutes"),
            h: I18n.t("an_hour"),
            hh: I18n.t("d_hours"),
            d: I18n.t("a_day"),
            dd: I18n.t("d_days"),
            M: I18n.t("a_month"),
            MM: I18n.t("d_months"),
            y: I18n.t("a_year"),
            yy: I18n.t("d_years"),
        },
    });

    if (!String.prototype.format) {
        // define format of string
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != "undefined"
                    ? args[number]
                    : match;
            });
        };
    }
};
