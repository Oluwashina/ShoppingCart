import React, { useEffect } from "react";
import "../../styles/modal.css";
import { CSSTransition } from "react-transition-group";
import rider from "../../assets/images/rider2.png";

const Modal = (props) => {
  useEffect(() => {
    if (props.show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [props.show]);

  return (
    <>
      <CSSTransition
        in={props.show}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div className="modal" onClick={props.onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-close-icon" onClick={props.onClose}>
              <i className="mdi mdi-close"style={{fontSize: 20}}></i>
            </div>

            <div className="modal-content-layout">
              <div className="text-center">
                <img src={rider} width="80" height="80" className="img-fluid" alt="rider" />
                </div>

              <h5 className="modal-title mt-2">{props.title}</h5>

              <div className="">{props.children}</div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Modal;
