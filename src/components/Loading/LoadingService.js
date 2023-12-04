import React from "react";

import { ModalService } from "@ui-kitten/components";

import Loading from "./Loading";
class LoadingService {
    static modalId = "";

    static show() {
        if (!this.isLoading()) {
            this.modalId = ModalService.show(<Loading />);
        }
    }

    static hide() {
        this.modalId = ModalService.hide(this.modalId);
    }

    static isLoading() {
        return !!this.modalId;
    }
}

export default LoadingService;
