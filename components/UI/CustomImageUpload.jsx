import React, { useState, useCallback, useRef } from "react";
import { RiImageAddLine } from "react-icons/ri";
import CustomIcon from "./CustomIcon";
import { Typography } from "antd";
import Image from "next/image";
import toast from "../UI/toast";
import { useDropzone } from "react-dropzone";

export default function CustomImageUpload({
  image,
  setImage,
  maxFiles,
  videoThumbnail,
  setVideoThumbnail,
  create,
  description,
}) {
  const [uploadedImage, setUploadedImage] = useState(image || "");
  const [uploadedVideoThumbnail, setUploadedVideoThumbnail] = useState(
    videoThumbnail || ""
  );
  const [error, setError] = useState("");
  const [thumbnailErr, setThumbnailErr] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log("onDrop", file);
      if (!file) return;

      if (create && file.type.split("/")[0] !== "image") {
        setError("Invalid file type. Please select an image.");
        return;
      }

      if (file.type.startsWith("image/") && file.size > 5 * 1024 * 1024) {
        setError("Profile pictures and photos should be less than 5 MB.");
        setUploadedImage("");
        return;
      }
      if (file.type.startsWith("video/") && file.size > 50 * 1024 * 1024) {
        setError("Videos should be less than 50 MB.");
        setUploadedImage("");
        return;
      }
      setError("");
      setUploadedImage("");
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        setImage(file);
        setUploadedImage(binaryStr);
      };
      reader.readAsDataURL(file);
    },
    [create, setImage]
  );

  const onDropThumbnail = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.type.split("/")[0] !== "image") {
        setThumbnailErr("Invalid file type.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setThumbnailErr("File Size should be less than 5 MB.");
        return;
      }
      setThumbnailErr("");
      setUploadedVideoThumbnail("");
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result;
        setVideoThumbnail(file);
        setUploadedVideoThumbnail(binaryStr);
      };
      reader.readAsDataURL(file);
    },
    [setVideoThumbnail]
  );

  const handleEditThumbnail = () => {
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.click();
    }
  };

  const thumbnailInputRef = useRef(null);

  const {
    acceptedFiles: acceptedFiles1,
    getRootProps: getRootProps1,
    getInputProps: getInputProps1,
  } = useDropzone({
    onDrop,
    maxFiles,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "video/*": [],
      "video/webm": [],
      "video/quicktime": [],
      "video/mpeg": [],
      "video/x-matroska": [],
    },
  });

  const {
    acceptedFiles: acceptedFiles2,
    getRootProps: getRootProps2,
    getInputProps: getInputProps2,
  } = useDropzone({
    onDrop: onDropThumbnail,
    maxFiles,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <>
      {/* Upload Image/Video */}
      <div
        {...getRootProps1()}
        className="border-[1px] border-[#d9d9d9] border-solid rounded-[8px] px-2 flex flex-col justify-center items-center"
      >
        <div className="relative md:w-[560px] h-[114px] mobile-view-img">
          {/* Edit button for uploaded image */}
          {uploadedImage !== "" && (
            <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-slate-900/50 hover:cursor-pointer z-10 opacity-0 hover:opacity-100 transition-all duration-200">
              <input {...getInputProps1()} />
              <CustomIcon onClick={() => {}} style="bg-slate-50/20 mx-auto">
                <RiImageAddLine size={24} color="#FFFFFF" />
              </CustomIcon>
              <Typography className="text-white mt-3 font-light">
                Edit File
              </Typography>
            </div>
          )}
          {/* Render uploaded image or placeholder */}
          {uploadedImage !== "" ? (
            image?.type?.includes("video") ? (
              <video src={uploadedImage} width="100%" height="100%"></video>
            ) : (
              <Image
                src={uploadedImage}
                fill
                alt="loading"
                className="fileUpload createEvent rounded-[8px] "
              />
            )
          ) : (
            <>
              <div className="flex flex-col justify-center items-center m-auto w-[300px] h-[112px]">
                <input {...getInputProps1()} />
                <CustomIcon onClick={() => {}} style="bg-[#DCDDFF] mx-auto">
                  <RiImageAddLine size={25} color="#797EF6" />
                </CustomIcon>
                <Typography className="text-[#7A7A7A] text-lg mt-2 text-center">
                  {description || "Upload Picture"}
                </Typography>
              </div>
            </>
          )}
        </div>
      </div>
      <p style={{ color: "#f87171" }}>{error}</p>
      {/* Upload Video Thumbnail */}
      {create !== true &&
        uploadedImage !== "" &&
        image?.type?.includes("video") && (
          <>
            <div
              {...getRootProps2()}
              className="border-none md:border-[1px] border-[#d9d9d9] md:border-solid rounded-[8px] px-2 flex flex-col justify-center md:items-center"
            >
              <div className="relative md:w-[560px] h-[242px]">
                {/* Edit button for uploaded video thumbnail */}
                {uploadedVideoThumbnail !== "" && (
                  <div
                    onClick={handleEditThumbnail}
                    className="md:absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-slate-900/50 hover:cursor-pointer z-10 opacity-0 hover:opacity-100 transition-all duration-200"
                  >
                    <input
                      {...getInputProps2()}
                      ref={thumbnailInputRef}
                      style={{ display: "none" }}
                    />
                    <CustomIcon style="bg-slate-50/20 mx-auto">
                      <RiImageAddLine size={24} color="#FFFFFF" />
                    </CustomIcon>
                    <Typography className="text-white mt-3 font-light">
                      Edit Video Thumbnail Image
                    </Typography>
                  </div>
                )}
                {/* Render uploaded video thumbnail or placeholder */}
                {uploadedVideoThumbnail !== "" ? (
                  <Image
                    src={uploadedVideoThumbnail}
                    fill
                    alt="loading"
                    className="rounded-[8px]"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center m-auto w-[300px] h-[200px]">
                    <input {...getInputProps2()} />
                    <CustomIcon onClick={() => {}} style="bg-[#DCDDFF] mx-auto">
                      <RiImageAddLine size={25} color="#797EF6" />
                    </CustomIcon>
                    <Typography className="text-[#7A7A7A] text-lg mt-2 text-center">
                      Upload Video Thumbnail Image
                    </Typography>
                  </div>
                )}
              </div>
            </div>
            <p style={{ color: "red", margin: "auto" }}>{thumbnailErr}</p>
          </>
        )}
    </>
  );
}
