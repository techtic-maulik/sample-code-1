import { userAction } from "@/store/slices/userSlice";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileByID } from "../../utils/apis/auth";
import CustomCard from "../UI/CustomCard";
import toast from "../UI/toast";
import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";

function UpdateProfilePic({
  children,
  setProfilePicUpdatedToggle,
  profilePicUpdatedToggle,
  dispatch,
  setUpdatedImage,
}) {
  const { contextHolder, showToast } = toast();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (file.type.split("/")[0] !== "image") {
        showToast("error", "Invalid file type. Please select an image.");
        return;
      }
      if (file.size > 5 * 1024 * 1024 && file.type.startsWith("image/")) {
        showToast(
          "error",
          "Profile pictures and photos should be less than 5 MB."
        );
        return;
      }
      const reader = new FileReader();
      reader.onabort = () => console.log("failed to open file");
      reader.onerror = () => console.log("failed to open file");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setUpdatedImage(file);
        // api call here ...............................
        // dispatch(
        //   updateProfileAsync({
        //     profile_pic: file,
        //     updatePic: true,
        //   })
        // );
        setProfilePicUpdatedToggle(
          (profilePicUpdatedToggle) => !profilePicUpdatedToggle
        );
      };
      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      {contextHolder}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </div>
    </>
  );
}

const UserProfile = ({}) => {
  const [changePassword, setChangePassword] = useState(false);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserProfileByID(user?.id).then((res) => {
      if (res.status) {
        dispatch(userAction.setUser(res.message));
        localStorage.setItem("family-table", JSON.stringify(res.message));
      } else {
        showToast("error", res.message);
      }
    });
  }, []);
  return (
    <CustomCard>
      <div className="h-[500px] px-4 md:px-0">
        {changePassword ? (
          <UpdatePassword setChangePassword={setChangePassword} />
        ) : (
          <UpdateProfile
            UpdateProfilePic={UpdateProfilePic}
            profilePic={user.profile_pic}
            setChangePassword={setChangePassword}
            initialValues={{
              name: user.name,
              email: user.email,
              mobile: user.phone,
              countryCode: user.country_code !== "" ? user.country_code : "+91",
            }}
          />
        )}
      </div>
    </CustomCard>
  );
};

export default UserProfile;
