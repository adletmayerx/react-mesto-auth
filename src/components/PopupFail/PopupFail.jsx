import React from "react";
import PopupInfo from "../PopupInfo/PopupInfo";

export default function PopupFail() {
  return (
    <PopupInfo
      popupType="fail"
      popupInfoImage="../../images/popupInfoImage_fail.png"
      popupInfoTitle="Что-то пошло не так! Попробуйте ещё раз.!"
    />
  );
}