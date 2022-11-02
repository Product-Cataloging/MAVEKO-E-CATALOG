import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

const NotificationItem = (props) => {
  const [notification, setNotification] = useState({
    delivery_date: "",
    id: null,
    message: "",
    sender: "",
    title: "",
  });

  useEffect(() => {
    setNotification(props.notification);
  }, [props.notification]);

  return (
    <>
      <Accordion
        expanded={props.expanded}
        style={{
          border: "1px solid #dde",
          borderRadius: "3px",
          marginBottom: "15px",
          color: "#556",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div>
            <div>
              <strong>{notification.title}</strong>
            </div>
            <small style={{ color: "gray", fontSize: "11px" }}>
              <strong>{notification.sender}</strong>,{" "}
              {notification.delivery_date}
            </small>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <p>{notification.message}</p>
          <hr style={{ color: "red" }} />
          <Button
            variant="contained"
            size="small"
            onClick={() => props.onClose(notification)}
          >
            close
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NotificationItem;
