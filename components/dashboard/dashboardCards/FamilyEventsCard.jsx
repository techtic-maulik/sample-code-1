import CustomCard from "../../UI/CustomCard";
import CustomIcon from "../../UI/CustomIcon";
import { BiPlus } from "react-icons/bi";
import { Empty, List, Typography } from "antd";
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewEventModal from "@/components/UI/modals/CreateNewEventModal";
import toast from "@/components/UI/toast";
import {
  eventReminderAsync,
  getMyAllEventAsync,
  getMyEventAsync,
} from "@/utils/apis/commonapi";

const events = [];

const FamilyEventsCard = () => {
  const dispatch = useDispatch();
  const events = useSelector((store) => store.common.allEventsList);
  const groups = useSelector((store) => store.user.groups);
  const user = useSelector((store) => store.user.user).id;

  const [on, setOn] = useState(false);
  const [isNewEventOpen, setIsNewEventModalOpen] = useState(false);
  const { contextHolder, showToast } = toast();

  useEffect(() => {
    dispatch(getMyAllEventAsync());
  }, []);

  const getGroupName = (groupId) => {
    const group = groups.find((group) => group.id === groupId);
    return group ? group.group_name : "";
  };
  // dispatch(getMyAllEventAsync());
  const handleReminder = (eventId, reminder) => async () => {
    let reminderVal = reminder ? 0 : 1;
    eventReminderAsync(eventId, reminderVal).then((res) => {
      if (res.status) {
        showToast("success", res.message);
        dispatch(getMyAllEventAsync());
      } else {
        showToast("error", res.message);
      }
    });
  };
  // const today = new Date();

  // const filteredEvents = [events].filter((event) => {
  //   const eventDate = new Date(event?.event_date);
  //   return eventDate >= today;
  // });

  return (
    <>
      <CreateNewEventModal
        isModalOpen={isNewEventOpen}
        setIsModalOpen={setIsNewEventModalOpen}
        showToast={showToast}
        dispatch={dispatch}
      />
      {/* {events && ( */}
      <CustomCard>
        {/* header */}
        <div className="flex justify-between items-center pb-3 px-3 md:px-0">
          <div className="text-[24px] font-avantGarde-md">Family Events</div>
          <CustomIcon
            class="w-10 h-10"
            onClick={() => setIsNewEventModalOpen(true)}
            style="bg-[#797EF6]"
          >
            <BiPlus size="30" color="#FFFFFF" />
          </CustomIcon>
        </div>
        {contextHolder}
        {/* content */}
        <div className="h-[30vh] overflow-y-auto scroll-hidden px-3 md:px-0">
          <List
            itemLayout="horizontal"
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-[15px] text-black">
                      No upcoming Events
                    </span>
                  }
                />
              ),
            }}
            dataSource={[events]}
            renderItem={(item, index) => {
              return !item ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span className="text-[15px] text-black">
                      No upcoming Events
                    </span>
                  }
                />
              ) : (
                <div
                  className="h-full overflow-y-auto scroll-hidden pr-2"
                  key={index}
                >
                  <div className="rounded-[20px]">
                    {/* <Image
                        src={item?.event_pic ?? "/img/dashboard/Mask.png"}
                        alt="image"
                        width={424}
                        height={224}
                        className="rounded-[24px] "
                      /> */}
                    <Image
                      className="mediaPointer media-card rounded-[24px]"
                      src={item?.event_pic ?? "/img/dashboard/Mask.png"}
                      alt="Photo"
                      width={330}
                      height={250}
                      // onClick={() => {
                      //   setMediaDetail(item);
                      //   setIsViewMedia(true);
                      // }}
                    />
                  </div>
                  {/* nav */}
                  <div className="flex items-center justify-between mt-3">
                    <Typography className="font-avantGarde-md text-primary font-semibold">
                      {getGroupName(item?.group_id)}
                    </Typography>
                    <div
                      className="flex cursor-pointer"
                      onClick={handleReminder(item?.id, item?.is_reminder)}
                    >
                      {item?.is_reminder ? (
                        <IoIosNotifications size={20} color="#797EF6" />
                      ) : (
                        <IoIosNotificationsOutline size={20} color="#7A7A7A" />
                      )}

                      <Typography
                        className={`${
                          item?.is_reminder ? "text-primary" : "text-[#7A7A7A]"
                        }`}
                      >
                        {item?.is_reminder ? "On" : "Off"}
                      </Typography>
                    </div>
                  </div>
                  {/* event details */}
                  <div className="flex flex-col gap-2 mt-3">
                    <Typography className="text-[#323232] text-[18px] font-avantGarde-md">
                      {item?.event_name}
                    </Typography>
                    <Typography className="text-[#7A7A7A] text-[12px] font-avantGarde-md">
                      {item?.event_date}
                    </Typography>
                    <Typography className="text-[#7A7A7A] text-[14px] font-avantGarde-bk mt-3">
                      {item?.event_details}
                    </Typography>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </CustomCard>
      {/* )} */}
    </>
  );
};

export default FamilyEventsCard;
