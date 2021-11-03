import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./Modal.css";

export default function Modal({ isModalOn, modalMessage, hideModal, handleClick }) {
  return (
    <div className={classNames("modal", { "show-modal": isModalOn })}>
      <section className="modal-section">
        {modalMessage}
        <button onClick={hideModal}>Cancelar</button>
        <button onClick={handleClick}>Ok</button>
      </section>
    </div>
  );
}
