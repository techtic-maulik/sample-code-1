import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import CustomCard from "../components/UI/CustomCard";
import withAuth from "../auth/withAuth";
import { getNotificationsAsync } from "@/utils/apis/commonapi";
import { Col, Row } from "antd";
import NotificationContainer from "@/components/notification/NotificationContainer";

const NotificationsPage = () => {
  const [notification, setNotification] = useState([]);
  const [fetchNotification, setFetchNotification] = useState(false);

  useEffect(() => {
    getNotificationsAsync().then((res) => {
      if (res.status) {
        setNotification(res.data);
        setFetchNotification(false);
      }
    });
  }, [fetchNotification]);

  return (
    <>
      <DashboardLayout
        emptyImage="/img/dashboard/sorry.png"
        title="You don’t have any notifications"
        description="You can see all the notifications here."
      >
        {notification?.length !== 0 && (
          <Row className="w-full">
            <Col span={24}>
              <CustomCard>
                <div className="h-[550px] overflow-scroll scroll-hidden">
                  <NotificationContainer
                    setFetchNotification={setFetchNotification}
                  />
                </div>
              </CustomCard>
            </Col>
          </Row>
        )}
      </DashboardLayout>
    </>
  );
};

export default withAuth(NotificationsPage);
