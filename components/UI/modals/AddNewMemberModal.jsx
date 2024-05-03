import React, { useEffect, useState } from "react";
import CustomModal from "../CustomModal";
import { Input, Select, Typography } from "antd";
import CustomButton from "../CustomButton";
import { useFormik } from "formik";
import { newMemberSchema } from "@/utils/formik/schema";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewGroupMemberAsync,
  getCountryCodesAsync,
  getFamilyRelationsAsync,
} from "@/utils/apis/commonapi";

const AddNewMemberModal = ({
  setIsModalOpen,
  isModalOpen,
  groupId,
  showToast,
}) => {
  const dispatch = useDispatch();
  const relations = useSelector((store) => store.common.relations);

  // country_codes
  const codes = useSelector((store) => store.common.countryCodes);
  const dial_codes = codes?.map((code) => code.dial_code);
  const countryCodes = dial_codes.filter(
    (code, index) => dial_codes.indexOf(code) === index
  );
  useEffect(() => {
    dispatch(getCountryCodesAsync());
    dispatch(getFamilyRelationsAsync());
  }, [isModalOpen, dispatch]);

  const addNewMemberFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      countryCode: "+91",
      relation: "",
    },
    validationSchema: newMemberSchema,
    onSubmit: (values) => {
      addNewGroupMemberAsync({ ...values, groupId }).then((res) => {
        if (res.status) {
          showToast("success", res.message);
          handleOk();
        } else {
          showToast("error", res.message);
        }
      });
    },
  });


  const handleOk = () => {
    addNewMemberFormik.resetForm();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    addNewMemberFormik.handleReset();
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <CustomModal
      isModalOpen={isModalOpen}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Add New Member"
    >
      <div className="flex flex-col gap-5 mt-6">
        <div className="flex flex-col gap-5">
          <div>
            <Input
              placeholder="Member Name"
              type="text"
              name="name"
              className="text-custom-md h-14"
              status={
                addNewMemberFormik.errors.name &&
                addNewMemberFormik.touched.name
                  ? "error"
                  : ""
              }
              onChange={addNewMemberFormik.handleChange}
              onBlur={addNewMemberFormik.handleBlur}
            />
            {addNewMemberFormik.errors.name &&
              addNewMemberFormik.touched.name && (
                <div>
                  <Typography className="text-red-400">
                    {addNewMemberFormik.errors.name}
                  </Typography>
                </div>
              )}
          </div>
          <div>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              className="text-custom-md h-14"
              status={
                addNewMemberFormik.errors.email &&
                addNewMemberFormik.touched.email
                  ? "error"
                  : ""
              }
              onChange={addNewMemberFormik.handleChange}
              onBlur={addNewMemberFormik.handleBlur}
            />
            {addNewMemberFormik.errors.email &&
              addNewMemberFormik.touched.email && (
                <div>
                  <Typography className="text-red-400">
                    {addNewMemberFormik.errors.email}
                  </Typography>
                </div>
              )}
          </div>
          <div>
            <div className="flex h-14 border-[1px] rounded-lg border-solid border-slate-300 hover:border-[#a6acff] transition-all ease-in-out">
              <Select
                options={countryCodes?.map((code) => {
                  return { label: code, value: code };
                })}
                virtual={false}
                style={{ width: "100px" }}
                value={addNewMemberFormik?.values?.countryCode}
                className="flex items-center mobile-code h-14"
                bordered={false}
                onChange={addNewMemberFormik.handleChange}
                onSelect={(value) =>
                  addNewMemberFormik.setFieldValue("countryCode", value)
                }
              />
              <Input
                placeholder="Mobile"
                type="text"
                name="mobile"
                onChange={addNewMemberFormik.handleChange}
                // onChange={(e) => setMobile(e.target.value)}
                className="text-custom-md border-transparent ring-transparent focus:border-transparent hover:border-transparent"
              />
            </div>
            {/* {addNewMemberFormik.errors.mobile &&
              addNewMemberFormik.touched.mobile && (
                <div>
                  <Typography className="text-red-400">
                    {addNewMemberFormik.errors.mobile}
                  </Typography>
                </div>
              )} */}
          </div>
          <div className="flex h-14 border-[1px] rounded-lg border-solid border-slate-300 hover:border-[#a6acff] transition-all ease-in-out">
            <Select
              size="large"
              bordered={false}
              style={{ width: "100%", height: "100%" }}
              placeholder="Relation"
              onChange={addNewMemberFormik.handleChange}
              onSelect={(value) =>
                addNewMemberFormik.setFieldValue("relation", value)
              }
              options={relations?.map((r) => {
                return { label: r?.name, value: r?.id?.toString() };
              })}
            />
          </div>
          {addNewMemberFormik.errors.relation &&
            addNewMemberFormik.touched.relation && (
              <div>
                <Typography className="text-red-400">
                  {addNewMemberFormik.errors.relation}
                </Typography>
              </div>
            )}
        </div>

        <CustomButton onClick={addNewMemberFormik.submitForm}>Add</CustomButton>
      </div>
    </CustomModal>
  );
};

export default AddNewMemberModal;
