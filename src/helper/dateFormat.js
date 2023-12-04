export function dateFormatter(stringDate) {
    if (stringDate) {
        let dateFormat = new Date(stringDate);
        return `${("0" + dateFormat.getDate()).slice(-2)}/${(
            "0" +
            (dateFormat.getMonth() + 1)
        ).slice(-2)}/${dateFormat.getFullYear()}`;
    } else {
        return "";
    }
}

export function timeFormatter(stringDate) {
    if (stringDate) {
        let dateFormat = new Date(stringDate);
        return `${("0" + dateFormat.getDate()).slice(-2)}/${(
            "0" +
            (dateFormat.getMonth() + 1)
        ).slice(-2)}/${dateFormat.getFullYear()} - ${(
            "0" + dateFormat.getHours()
        ).slice(-2)}:${("0" + dateFormat.getMinutes()).slice(-2)}`;
    } else {
        return "";
    }
}

export function formatDateDMY(stringDate) {
    if (stringDate) {
        let dateFormat = new Date(stringDate);
        return `${("0" + dateFormat.getDate()).slice(-2)}/${(
            "0" +
            (dateFormat.getMonth() + 1)
        ).slice(-2)}/${dateFormat.getFullYear()}`;
    } else {
        return "";
    }
}

export function formatDateYMD(stringDate) {
    if (stringDate) {
        let dateFormat = new Date(stringDate);
        return `${dateFormat.getFullYear()}-${(
            "0" +
            (dateFormat.getMonth() + 1)
        ).slice(-2)}-${("0" + dateFormat.getDate()).slice(-2)}`;
    } else {
        return "";
    }
}

function formatDateMDY(stringDate) {
    if (stringDate) {
        let dateFormat = new Date(stringDate);
        return `${("0" + (dateFormat.getMonth() + 1)).slice(-2)}/${(
            "0" + dateFormat.getDate()
        ).slice(-2)}/${dateFormat.getFullYear()}`;
    } else {
        return "";
    }
}

export function dateFormatYMD(stringDate) {
    if (stringDate) {
        let dateFormat = new Date(stringDate);
        return `${dateFormat.getFullYear()}-${(
            "0" +
            (dateFormat.getMonth() + 1)
        ).slice(-2)}-${("0" + dateFormat.getDate()).slice(-2)}`;
    } else {
        return "";
    }
}

export function getDayOfWeek(day) {
    const dict = [
        { day: 0, name: "Chủ nhật" },
        { day: 1, name: "Thứ 2" },
        { day: 2, name: "Thứ 3" },
        { day: 3, name: "Thứ 4" },
        { day: 4, name: "Thứ 5" },
        { day: 5, name: "Thứ 6" },
        { day: 6, name: "Thứ 7" },
    ];
    return dict.filter((item) => item.day == day)[0].name;
}
