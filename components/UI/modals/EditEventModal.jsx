import { getEventCategoriesAsync } from "@/utils/apis/commonapi";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Input, Typography, Select, DatePicker } = require("antd");
const { default: CustomImageUpload } = require("../CustomImageUpload");
const { default: CustomModal } = require("../CustomModal");
const { FaRegCalendarAlt } = require("react-icons/fa");
const { default: CustomButton } = require("../CustomButton");
import { newEventSchema } from "@/utils/formik/schema";

const EditEventModal = ({
  setIsModalOpen,
  isModalOpen,
  event,
  showToast,
  initialValues,
}) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventCategoriesAsync());
  }, [dispatch]);

  const eventsCategories = useSelector((store) => store.common.eventCategories);

  const newEventFormik = useFormik({
    initialValues,
    validationSchema: newEventSchema,
    onSubmit: (values) => {
     
      // addNewEventAsync({
      //   event_name: values.eventName,
      //   event_pic: image,
      //   category_id: values.category,
      //   event_date: values.date,
      //   event_details: values.details,
      // }).then((res) => {
      //   if (res.status) {
      //     showToast("success", res.message);
      //   } else {
      //     showToast("error", res.message);
      //   }
      // });
    },
  });



  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    newEventFormik.handleReset();
    setImage("");
    setIsModalOpen(false);
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Edit Event"
    >
      <div className="flex flex-col gap-5 mt-6">
        <CustomImageUpload image={image} setImage={setImage} maxFiles={1} />
        <div>
          <Input
            placeholder="Event Name"
            type="text"
            name="eventName"
            className="text-custom-md h-14"
            value={newEventFormik?.values?.eventName}
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
              style={{ width: "100%", paddingTop: "9px" }}
              placeholder="Category"
              value={newEventFormik?.values?.category}
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
        <div>
          <div
            className={`flex h-14 border-[1px] rounded-lg border-solid  ${
              newEventFormik.errors.date && newEventFormik.touched.date
                ? "border-[#ff4d4f]"
                : "border-slate-300"
            }  hover:border-[#a6acff] transition-all ease-in-out`}
          >
            <DatePicker
              name="date"
              className="border-none w-full"
              // value={newEventFormik.values.date}
              suffixIcon={<FaRegCalendarAlt size={15} color="#797EF6" />}
              onChange={(value) => {
                newEventFormik.setFieldValue(
                  "date",
                  dayjs(value).format("DD-MM-YY")
                );
                newEventFormik.handleChange(dayjs(value).format("DD-MM-YY"));
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

        <div>
          <Input.TextArea
            placeholder="Details"
            allowClear
            name="details"
            className=""
            // value={newEventFormik.values.details}
            status={
              newEventFormik.errors.details && newEventFormik.touched.details
                ? "error"
                : ""
            }
            autoSize={{ minRows: 2, maxRows: 6 }}
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
        <CustomButton onClick={newEventFormik.submitForm}>Add</CustomButton>
      </div>
    </CustomModal>
  );
};

export default EditEventModal;
