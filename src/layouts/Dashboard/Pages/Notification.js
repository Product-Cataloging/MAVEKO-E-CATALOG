import NotificationItem from "../../../components/Notification/NotificationItem";
import React, { useEffect } from "react";
import { Toolbar } from "primereact/toolbar";

const Notification = (props) => {

  useEffect(() => {
    props.getUrl([{ label: "Notifications", url: "/notifications" }]);
  }, []);

  const noNotifications = (
    <span style={{ color: "gray", fontWeight: "bolder", padding: "20px" }}>
      You have no new notifications
    </span>
  );
  return (
    <div>
      {props.notifications.length > 0 ? (
        props.notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={props.onReadNotification}
          />
        ))
      ) : (
        <Toolbar
          style={{ display: "flex", justifyContent: "center" }}
          left={noNotifications}
        />
      )}
    </div>
  );
};

export default Notification;
