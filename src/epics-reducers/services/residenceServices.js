import axios from "axios";
import { COMMON_APP, API } from "../../constants";

export function getAllProvince() {
    return axios
        .get(
            `${COMMON_APP.HOST_API}${API.PROVINCE_QUERY.format(
                1,
                0,
                "&sort_by=code&order_by=1"
            )}`
        )
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return null;
        });
}

export function getDistrictsByProvince(provinceId) {
    return axios
        .get(
            `${COMMON_APP.HOST_API}${API.DISTRICT_BY_PROVINCE.format(
                provinceId
            )}`
        )
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return null;
        });
}

export function getDistrictsById(id) {
    return axios
        .get(`${COMMON_APP.HOST_API}${API.DISTRICT_BY_ID.format(id)}`)
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return null;
        });
}

export function getWardsByDistrict(districtId) {
    return axios
        .get(
            `${COMMON_APP.HOST_API}${API.WARDS_BY_DISTRICT.format(districtId)}`
        )
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return null;
        });
}

export function getWardsById(id) {
    return axios
        .get(`${COMMON_APP.HOST_API}${API.WARDS_BY_ID.format(id)}`)
        .then((res) => {
            if (res.data) {
                return res.data;
            } else {
                return null;
            }
        })
        .catch((error) => {
            return null;
        });
}
