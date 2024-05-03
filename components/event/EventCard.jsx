import React, { useEffect, useState } from "react";
import CreateNewEventModal from "../UI/modals/CreateNewEventModal";
import CustomCard from "../UI/CustomCard";
import CustomIcon from "../UI/CustomIcon";
import { BiDotsVerticalRounded, BiPlus } from "react-icons/bi";
import { Button, Divider, Empty, Select, Typography } from "antd";
import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import ViewEventDetailModal from "../UI/modals/ViewEventDetailModal";
import CancelEventModal from "../UI/modals/CancelEventModal";
import { useDispatch, useSelector } from "react-redux";
import { eventReminderAsync, getMyEventAsync } from "@/utils/apis/commonapi";
import toast from "../UI/toast";

const EventCard = () => {
  const [on, setOn] = useState(false);
  const [isNewEventOpen, setIsNewEventModalOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventModalOpen] = useState(false);
  const [isEventDetailOpen, setIsEventDetailModalOpen] = useState(false);
  const [isCancelEventOpen, setIsCancelEventModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [event, setEvent] = useState(null);

  const { contextHolder, showToast } = toast();

  // from redux store
  const groups = useSelector((store) => store.user.groups);
  const events = useSelector((store) => store.common.events);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedGroupId) {
      dispatch(getMyEventAsync(selectedGroupId));
    }
  }, [
    selectedGroupId,
    isNewEventOpen,
    isEditEventOpen,
    isCancelEventOpen,
    isEventDetailOpen,
    dispatch,
  ]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    setSelectedGroupId(groups[0]?.id);
  }, []);

  const handleReminder = (eventId, reminder) => async () => {
    let reminderVal = reminder ? 0 : 1;
    eventReminderAsync(eventId, reminderVal).then((res) => {
      if (res.status) {
        showToast("success", res.message);
        dispatch(getMyEventAsync(selectedGroupId));
      } else {
        showToast("error", res.message);
      }
    });
  };

  function truncateText(text, maxLength) {
    if (text.split(" ").length > maxLength) {
      return text.split(" ").slice(0, maxLength).join(" ") + "...";
    }
    return text;
  }



  return (
    <>
      {contextHolder}
      <CreateNewEventModal
        isModalOpen={isNewEventOpen}
        setIsModalOpen={setIsNewEventModalOpen}
        showToast={showToast}
      />
      {/* here CreateNewEventModal modal used for update event */}
      <CreateNewEventModal
        isModalOpen={isEditEventOpen}
        setIsModalOpen={setIsEditEventModalOpen}
        event={event}
        showToast={showToast}
      />

      <ViewEventDetailModal
        isModalOpen={isEventDetailOpen}
        setIsModalOpen={setIsEventDetailModalOpen}
        event={event}
        showToast={showToast}
      />
      <CancelEventModal
        isModalOpen={isCancelEventOpen}
        setIsModalOpen={setIsCancelEventModalOpen}
        eventId={event?.id}
        showToast={showToast}
        closeParent={() => {}}
      />
      <CustomCard>
        <div
          className="pr-2  overflow-x-hidden overflow-y-auto scroll-hidden"
          style={{ height: "calc(100vh - 250px)" }}
        >
          {/* header */}
          <div className="flex justify-between items-center py-3 px-3 md:px-0">
            {/* <div className="text-[29px]">Family Events</div> */}
            <div>
              <Select
                style={{ width: 180 }}
                bordered={true}
                placeholder="Select group"
                defaultActiveFirstOption={false}
                defaultValue={groups[0]?.id.toString()}
                size="large"
                onChange={handleChange}
                onSelect={(value) => setSelectedGroupId(value)}
                options={groups.map((group) => {
                  return {
                    label: group?.group_name,
                    value: group?.id?.toString(),
                  };
                })}
              />
            </div>
            <CustomIcon
              class="w-50 h-50"
              onClick={() => setIsNewEventModalOpen(true)}
              style="bg-[#797EF6]"
            >
              <BiPlus size="30" color="#FFFFFF" />
            </CustomIcon>
          </div>

          {/* context */}
          <div className="flex flex-col gap-3 px-3 md:px-0">
            {(events.length === 0 || groups.length <= 0) && (
              <div className="text-center m-auto">
                <img src="/img/dashboard/noevent.png" />
                <Typography className="text-3xl	font-normal	leading-10	text-[#323232]	mt-7 font-avantGarde-md">
                  No Events
                </Typography>
                <Typography className="text-base font-normal	leading-7	text-[#323232]	mt-2.5 font-avantGarde-bk">
                  Remind every one your plans. Create new event and let everyone
                  notify with the event.
                </Typography>
                <Button
                  className="w-176 font-avantGarde-md hover:!bg-[#818cf8] hover:!text-white rounded-full text-base font-normal	leading-7 h-[40px] text-white text-center	px-7 mt-7 bg-[#797EF6]"
                  onClick={() => setIsNewEventModalOpen(true)}
                >
                  {" "}
                  Create Event
                </Button>
              </div>
            )}

            {groups.length > 0 &&
              events &&
              events.map((event, index) => {
                return (
                  <>
                    <div
                      key={event?.id}
                      className="flex flex-col lg:flex-row gap-x-10 h-full overflow-y-auto scroll-hidden"
                    >
                      {/* content-left */}
                      <div className="relative w-full lg:w-[445px] h-[224px] ">
                        <Image
                          src={event?.event_pic}
                          alt="image"
                          fill
                          className="rounded-[24px] "
                        />
                      </div>

                      {/* content-right */}
                      <div className="flex-1 flex flex-col ">
                        {/* nav */}
                        <div className="flex items-center justify-between mt-3">
                          <Typography className="font-avantGarde-md text-[#797EF6] text-[14px] text-[400] uppercase">
                            {event?.category}
                          </Typography>
                          <div className="flex items-center gap-x-7 hover:cursor-pointer">
                            {/* on off switch */}
                            <div
                              className="flex cursor-pointer"
                              onClick={handleReminder(
                                event?.id,
                                event?.is_reminder
                              )}
                            >
                              {event?.is_reminder ? (
                                <IoIosNotifications size={20} color="#797EF6" />
                              ) : (
                                <IoIosNotificationsOutline
                                  size={20}
                                  color="#7A7A7A"
                                />
                              )}
                              {/* <IoIosNotificationsOutline
                              size="25"
                              color={`${on ? "#797EF6" : "#7A7A7A"}`}
                            /> */}
                              <Typography
                                className={`${
                                  event?.is_reminder
                                    ? "text-primary"
                                    : "text-[#7A7A7A]"
                                }`}
                              >
                                {event?.is_reminder ? "On" : "Off"}
                              </Typography>
                            </div>

                            {/* menu */}
                            <Select
                              bordered={false}
                              dropdownMatchSelectWidth={false}
                              showArrow={true}
                              onChange={() => {}}
                              value={null}
                              disabled={
                                isNewEventOpen ||
                                isEditEventOpen ||
                                isEventDetailOpen ||
                                isCancelEventOpen
                              }
                              suffixIcon={
                                <CustomIcon
                                  onClick={() => {}}
                                  style="bg-[#EEEEEE]"
                                >
                                  <BiDotsVerticalRounded size={25} />
                                </CustomIcon>
                              }
                              placement="bottomRight"
                              dropdownRender={() => (
                                <div className="w-[172px] flex flex-col p-4 rounded-[20px]">
                                  <Typography
                                    className="text-base text-[#323232] hover:cursor-pointer"
                                    onClick={() => {
                                      setEvent(event);
                                      setIsEventDetailModalOpen(true);
                                    }}
                                  >
                                    View Event Details
                                  </Typography>
                                </div>
                              )}
                            />
                          </div>
                        </div>

                        {/* event details */}
                        <div className="flex flex-col gap-2">
                          <Typography className="text-[#323232] font-avantGarde-md text-[18px] ">
                            {event.event_name}
                          </Typography>
                          <Typography className="text-[#7A7A7A] font-avantGarde-md text-[14px]">
                            {event.event_date}
                          </Typography>
                          <Typography className="mt-[15px] font-avantGarde-bk text-[#7A7A7A] text-[16px] descreption-more">
                            {event.event_details}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    {events?.length !== index + 1 && (
                      <div className="w-full h-px opacity-40 bg-[#7A7A7A] block my-3"></div>
                    )}
                  </>
                );
              })}
          </div>
        </div>
      </CustomCard>
    </>
  );
};

export default EventCard;
