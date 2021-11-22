import React from "react";
import PopupInfo from "../PopupInfo/PopupInfo";

export default function PopupSuccess() {
  return (
    <PopupInfo
      popupType="success"
      popupInfoImage="../../images/popupInfoImage_success.png"
      popupInfoTitle="Вы успешно зарегистрировались!"
    />
  );
}