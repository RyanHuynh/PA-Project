import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { Modal } from 'semantic-ui-react';

// Styles
import './DragModal.scss';

const DragModal = props => (
  <Modal id={props.id} className={`drag-modal ${props.className || ''}`} dimmer={props.dimmer} open={props.open} size={props.size}>
    <Draggable handle=".handle" cancel={props.draggableCancelClass}>
      <div>
        <header className="handle">
          <h3>{props.header}</h3>
          {props.headerOptions}
        </header>
        <section className="modal-content">
          {props.children}
        </section>
      </div>
    </Draggable>
  </Modal>
);

DragModal.propTypes = {
  id: PropTypes.string,
  header: PropTypes.string,
  headerOptions: PropTypes.node,
  children: PropTypes.node,
  size: PropTypes.string,
  dimmer: PropTypes.bool,
  open: PropTypes.bool,
  draggableCancelClass: PropTypes.string,
  className: PropTypes.string,
};

DragModal.defaultProps = {
  showClose: true,
  className: null,
};

export default DragModal;

