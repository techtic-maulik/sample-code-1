import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { DatePicker, Input, Select, Typography } from "antd";
import CustomButton from "../CustomButton";
import { newEventSchema } from "@/utils/formik/schema";
import { useFormik } from "formik";
import CustomImageUpload from "../CustomImageUpload";
import dayjs from "dayjs";
import { FaCalendarAlt } from "react-icons/fa";
import {
  addNewEventAsync,
  getEventCategoriesAsync,
  getMyAllEventAsync,
} from "@/utils/apis/commonapi";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";

const CreateNewEventModal = ({
  setIsModalOpen,
  isModalOpen,
  showToast,
  event = null,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const groups = useSelector((store) => store.user.groups);
  const eventsCategories = useSelector((store) => store.common.eventCategories);
  const isUpdate = event ? true : false;


  const newEventFormik = useFormik({
    initialValues: {
      eventName: "",
      category: "",
      date: "",
      details: "",
      group: "",
    },
    validationSchema: newEventSchema,
    onSubmit: (values) => {
      addNewEventAsync(
        {
          event_name: values.eventName,
          event_pic: image,
          category_id: values.category,
          event_date: values.date,
          event_details: values.details,
          group_id: values.group,
          edit_id: event ? event.id : null,
        },
        isUpdate
      ).then((res) => {
        if (res.status) {
          showToast("success", res.message);
          dispatch(getMyAllEventAsync());
          handleOk();
        } else {
          showToast("error", res.message);
        }
      });
    },
  });

  useEffect(() => {
    if (event) {
      newEventFormik.setFieldValue("eventName", event?.event_name);
      newEventFormik.setFieldValue("category", event?.category_id);
      newEventFormik.setFieldValue("date", event?.event_date);
      newEventFormik.setFieldValue("details", event?.event_details);
      newEventFormik.setFieldValue("group", event?.group_id);
      setImage(event?.event_pic);
    }
  }, [event, isModalOpen]);

  useEffect(() => {
    dispatch(getEventCategoriesAsync());
  }, [dispatch]);

  const handleOk = () => {
    newEventFormik.handleReset();
    setImage(null);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    newEventFormik.handleReset();
    setImage(null);
    setIsModalOpen(false);
  };



  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title={event ? "Update Event" : "Create New Event"}
    >
      <div className="flex flex-col gap-2 mt-6">
        {event ? (
          <img src={image} height="271px" style={{ borderRadius: "25px" }} />
        ) : (
          <CustomImageUpload
            image={image}
            setImage={setImage}
            maxFiles={1}
            create={true}
          />
        )}

        <div>
          <Input
            placeholder="Event Name"
            type="text"
            name="eventName"
            className="text-custom-md h-14"
            value={newEventFormik?.values?.eventName}
            disabled={event ? true : false}
            status={
              newEventFormik.errors.eventName &&
              newEventFormik.touched.eventName
                ? "error"
                : ""
            }
            onChange={newEventFormik.handleChange}
            onBlur={newEventFormik.handleBlur}
          />
          {newEventFormik.errors.eventName &&
            newEventFormik.touched.eventName && (
              <div>
                <Typography className="text-red-400">
                  {newEventFormik.errors.eventName}
                </Typography>
              </div>
            )}
        </div>
        <div>
          <div
            className={`flex h-14 border-[1px] rounded-lg border-solid  ${
              newEventFormik.errors.category && newEventFormik.touched.category
                ? "border-[#ff4d4f]"
                : "border-slate-300"
            }  hover:border-[#a6acff] transition-all ease-in-out`}
          >
            <Select
              size="large"
              bordered={false}
              style={{ width: "100%", height: "100%" }}
              disabled={event ? true : false}
              placeholder="Category"
              value={
                newEventFormik?.values?.category !== ""
                  ? newEventFormik?.values?.category.toString()
                  : null
              }
              onChange={newEventFormik.handleChange}
              onBlur={newEventFormik.handleBlur}
              onSelect={(value) =>
                newEventFormik.setFieldValue("category", value)
              }
              options={eventsCategories?.map((category) => {
                return {
                  label: category?.category,
                  value: category?.id?.toString(),
                };
              })}
            />
          </div>
          {newEventFormik.errors.category &&
            newEventFormik.touched.category && (
              <div>
                <Typography className="text-red-400">
                  {newEventFormik.errors.category}
                </Typography>
              </div>
            )}
        </div>

        {/* groups */}
        <div>
          <div
            className={`flex h-14 border-[1px] rounded-lg border-solid  ${
              newEventFormik.errors.group && newEventFormik.touched.group
                ? "border-[#ff4d4f]"
                : "border-slate-300"
            }  hover:border-[#a6acff] transition-all ease-in-out`}
          >
            <Select
              size="large"
              bordered={false}
              style={{ width: "100%", height: "100%" }}
              disabled={event ? true : false}
              placeholder="Group"
              value={
                newEventFormik?.values?.group !== ""
                  ? newEventFormik?.values?.group.toString()
                  : null
              }
              onChange={newEventFormik.handleChange}
              onBlur={newEventFormik.handleBlur}
              onSelect={(value) => newEventFormik.setFieldValue("group", value)}
              options={groups?.map((group) => {
                return {
                  label: group?.group_name,
                  value: group?.id?.toString(),
                };
              })}
            />
          </div>
          {newEventFormik.errors.group && newEventFormik.touched.group && (
            <div>
              <Typography className="text-red-400">
                {newEventFormik.errors.group}
              </Typography>
            </div>
          )}
        </div>

        <div>
          <div
            className={`flex h-14 border-[1px] rounded-lg border-solid  ${
              newEventFormik.errors.date && newEventFormik.touched.date
                ? "border-[#ff4d4f]"
                : "border-slate-300"
            }  hover:border-[#a6acff] transition-all ease-in-out`}
          >
            <DatePicker
              placeholder="Date"
              name="date"
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
              className="border-none w-full"
              suffixIcon={
                <FaCalendarAlt
                  size={15}
                  style={{ marginTop: "5px" }}
                  color="#797EF6"
                />
              }
              defaultValue={
                event && newEventFormik?.values?.date
                  ? dayjs(newEventFormik.values.date, "DD-MM-YYYY")
                  : null
              }
              onChange={(value) => {
                newEventFormik.setFieldValue(
                  "date",
                  value ? dayjs(value).format("DD-MM-YYYY") : ""
                );
              }}
              onBlur={newEventFormik.handleBlur}
            />
          </div>
          {newEventFormik.errors.date && newEventFormik.touched.date && (
            <div>
              <Typography className="text-red-400">
                {newEventFormik.errors.date}
              </Typography>
            </div>
          )}
        </div>

        <div className="icon_align">
          <Input.TextArea
            placeholder="Details"
            allowClear
            className=""
            name="details"
            value={newEventFormik?.values?.details}
            status={
              newEventFormik.errors.details && newEventFormik.touched.details
                ? "error"
                : ""
            }
            autoSize={{ minRows: 4.2, maxRows: 6 }}
            onChange={newEventFormik.handleChange}
            onBlur={newEventFormik.handleBlur}
          />
          {newEventFormik.errors.details && newEventFormik.touched.details && (
            <div>
              <Typography className="text-red-400">
                {newEventFormik.errors.date}
              </Typography>
            </div>
          )}
        </div>
        <CustomButton onClick={newEventFormik.submitForm}>
          {event ? "Update" : "Add"}
        </CustomButton>
      </div>
    </CustomModal>
  );
};

export default CreateNewEventModal;
