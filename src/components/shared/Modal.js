import classNames from "classnames";
import "./Modal.css";

export default function Modal({
  isModalOn,
  modalMessage,
  hideModal,
  handleClick,
}) {
  return (
    <div
    className={classNames("modal", "modal-fade", { "show-modal": isModalOn })}     
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{modalMessage}</div>
          <div className="modal-footer">
            <button
              onClick={hideModal}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button onClick={handleClick} type="button" className="btn btn-primary">
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
