import React, { useCallback, useMemo, useState } from 'react';
import { Modal, Button, Toast, ToastContainer } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";

const localizer = momentLocalizer(moment);


const ShiftSchedule = () => {
  const [shifts, setShifts] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastOpen, setToastOpen] = useState(false);

  const handleAddEvent = useCallback((slotInfo) => {
    const now = new Date(); // Lấy ngày hiện tại
    if (slotInfo.start <= now) {
      setToastMessage("Cannot select past dates");
      setToastOpen(true);
      return;
    }

    const newShift = {
      title: "New Shift",
      start: slotInfo.start,
      end: slotInfo.end,
      allDay: slotInfo.allDay,
    };
    setShifts([...shifts, newShift]);
  }, [shifts]);
  
  const handleSelectEvent = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleDeleteEvent = () => {
    setShifts(shifts.filter((shift) => shift !== currentEvent));
    setShowModal(false);
    setToastMessage("Shift deleted");
    setToastOpen(true);
  };


return (
  <div>
    <Calendar
      localizer={localizer}
      events={shifts}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500, margin: '50px' }}
      selectable
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleAddEvent}
      // eventPropGetter={eventStyleGetter}
    />

    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Shift</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DatePicker
          selected={currentEvent?.start}
          onChange={(date) =>
            setCurrentEvent({ ...currentEvent, start: date })
          }
          showTimeSelect
          dateFormat="Pp"
        />
        <DatePicker
          selected={currentEvent?.end}
          onChange={(date) =>
            setCurrentEvent({ ...currentEvent, end: date })
          }
          showTimeSelect
          dateFormat="Pp"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteEvent}>
          Delete Shift
        </Button>
      </Modal.Footer>
    </Modal>

    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        bg="danger"
        onClose={() => setToastOpen(false)}
        show={isToastOpen}
        delay={3000}
        autohide
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  </div>
)

};

export default ShiftSchedule;