import NotificationItem from "../../../components/Notification/NotificationItem";
import {
  unread_notifications_path,
  notifications_path,
} from "../../../environment";
import { edit, get } from "../../../services/AdminServices";
import React, { Component, useEffect, useState } from "react";
import { Toolbar } from "primereact/toolbar";

const Notification = (props) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    props.getUrl({ label: "Notifications", url: "/notifications" });
    get(unread_notifications_path).then((response) => {
      setNotifications(response.data);
    });
  }, []);

  const onCloseNotification = (notification) => {
    edit(notification.id, {...notification, status: 'Read'}, notifications_path).then((response) => {
        setNotifications(notifications.filter((n) => n.id != response.data.id))
    })
  }

  const noNotifications = (
    <span style={{ color: "gray", fontWeight: "bolder", padding: "20px" }}>
      You have no new notifications
    </span>
  );
  return (
    <div>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} onClose={onCloseNotification} />
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
