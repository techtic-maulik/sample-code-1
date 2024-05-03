import { customAxios } from "@/helpers/interceptor";
import {
  acceptOrRejectInvitation,
  addEvent,
  addNewGroupMember,
  changePassword,
  deleteGroup,
  deleteMyEvent,
  deleteNotification,
  getAllGroups,
  getCategories,
  getCountryCodes,
  getEventCategories,
  getFamilyRelations,
  getGroupMembers,
  getMyEvents,
  getNotification,
  getRequests,
  updateGroupDetails,
  updateProfile,
  addMedia,
  getMedia,
  deleteMedia,
  deleteGroupMember,
  getNotificationWebDashboard,
  sendMessageApi,
  getInTouch,
  allEvents,
  eventReminder,
  leaveGroup,
  upcomingEvents,
} from "./apiroutes";
import { commonAction } from "@/store/slices/commonSlice";
import { userAction } from "@/store/slices/userSlice";
import { useSelector } from "react-redux";

export const getCountryCodesAsync = () => {
  return async (dispatch) => {
    try {
      const response = await customAxios.get(getCountryCodes);
      
      dispatch(commonAction.setCountryCodes(response.data.data));
      return { status: true, message: "success." };
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

export const getEventCategoriesAsync = () => {
  return async (dispatch) => {
    try {
      const response = await customAxios.get(getEventCategories);

      dispatch(commonAction.setEventCategories(response.data.data));
      return { status: true, message: "success." };
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

export const getFamilyRelationsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await customAxios.get(getFamilyRelations);
      dispatch(commonAction.setRelations(response.data.data));
      return { status: true, message: "success." };
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

export const getAllGroupsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await customAxios.get(getAllGroups);

      dispatch(userAction.setGroups(response.data.data));
      return { status: true, message: "success.", group: response.data.data };
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

export const getGroupMembersAsync = async (groupId) => {
  try {
    const response = await customAxios.get(`${getGroupMembers}/${groupId}`);

    return { status: true, message: "success.", data: response.data.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// export const getGroupDetails = (groupId) => {
//   return async (dispatch) => {
//     try {
//       const response = await customAxios.get(`${getGroupById}/${groupId}`);
//       console.log("response : ", response);
//       dispatch(userAction.setGroups(response.data.data));
//       return { status: true, message: "success." };
//     } catch (error) {
//       return { status: false, message: error.message };
//     }
//   };
// };

export const deleteGroupAsync = async (groupId, type) => {
  try {
    const apiName = type === "delete" ? deleteGroup : leaveGroup;
    const response = await customAxios.delete(`${apiName}/${groupId}`);

    return { status: true, message: response.data.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const addNewGroupMemberAsync = async (data) => {
  try {
    const response = await customAxios.post(addNewGroupMember, {
      email: data.email,
      name: data.name,
      country_code: data.countryCode,
      phone: data.mobile,
      relation: Number(data.relation),
      group_id: data.groupId,
    });

    return { status: true, message: `Invitation sent to ${data.name}` };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const updateGroupAsync = async (data) => {
  try {
    const formData = new FormData();
    formData.append("group_photo", data.group_photo);
    formData.append("id", data.groupId);
    const response = await customAxios.post(updateGroupDetails, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      status: true,
      message: "Group picture updated.",
      response: response.data.data.group_photo,
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// member invitation request api
export const getInvitationAsync = async () => {
  try {
    const response = await customAxios.get(getRequests);
    return { status: true, message: "success.", data: response.data.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const acceptOrRejectInvitationAsync = async (data) => {
  try {
    const response = await customAxios.post(acceptOrRejectInvitation, {
      request_id: data.request_id,
      is_accept: data.is_accept,
      group_id: data.group_id,
    });
    return { status: true, message: response.data.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const deleteGroupMemberAsync = async (memberId) => {
  try {
    const response = await customAxios.delete(
      `${deleteGroupMember}/${memberId}`
    );
    return { status: true, message: response.data.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// add new event
export const addNewEventAsync = async (data, isUpdate) => {
  try {
    const formData = new FormData();
    formData.append("event_name", data.event_name);
    formData.append("event_pic", data.event_pic);
    formData.append("category_id", Number(data.category_id));
    formData.append("event_date", data.event_date);
    formData.append("event_details", data.event_details);
    formData.append("group_id", Number(data.group_id));
    if (data.edit_id) {
      formData.append("edit_id", Number(data.edit_id));
    }

    const response = await customAxios.post(addEvent, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: true,
      message: isUpdate ? "Event Updated." : "Event added.",
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getMyEventAsync = (groupID) => {
  return async (dispatch) => {
    try {
      const response = await customAxios.get(`${getMyEvents}/${groupID}`);
      dispatch(commonAction.setEvents(response.data.data));
      return { status: true, message: "Success" };
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

export const deleteMyEventAsync = async (eventId) => {
  try {
    const response = await customAxios.delete(`${deleteMyEvent}/${eventId}`);
    return { status: true, message: "Event deleted" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const updateProfileAsync = (data) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("profile_pic", data.profile_pic);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("country_code", data.country_code);
      formData.append("image_removed", data.image_removed);
      // formData.append("updatePic",)

      const response = await customAxios.post(updateProfile, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(userAction.setUser(response.data.data));
      return { status: true, message: "Profile  updated successfully." };
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

export const changePasswordAsync = async (data) => {
  try {
    const response = await customAxios.post(changePassword, {
      old_password: data.old_password,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    });
    return { status: true, message: "Password updated successfully" };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// notification
export const getNotificationsAsync = async () => {
  try {
    const response = await customAxios.get(getNotification);
    return { status: true, message: "", data: response.data.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const deleteNotificationsAsync = async (notificationId) => {
  try {
    const response = await customAxios.delete(
      `${deleteNotification}/${notificationId}`
    );

    return { status: true, message: response.data.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getNotificationsWebDashboardAsync = async () => {
  try {
    const response = await customAxios.get(getNotificationWebDashboard);
    return { status: true, message: "", data: response.data.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// media apis
export const addMediaAsync = async (data) => {
  try {
    const formData = new FormData();
    formData.append("media_type", data.media_type);
    formData.append("media_file", data.media_file);
    formData.append("v_thumbnail", data.v_thumbnail);
    formData.append("group_id", data.group_id);

    const response = await customAxios.post(addMedia, formData);
    return { status: true, message: "Media uploaded." };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getMediaAsync = async (groupId) => {
  try {
    const response = await customAxios.get(`${getMedia}/${groupId}`);
    return { status: true, message: "", data: response.data.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const deleteMediaAsync = async (mediaId, mediaType) => {
  try {
    const response = await customAxios.post(deleteMedia, {
      media_id: mediaId,
      media_type: mediaType,
    });

    return { status: true, message: response.data.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const sendMessage = async (data) => {
  try {
    const response = await customAxios.post(`${sendMessageApi}/${data.id}`, {
      body: data.message,
    });
    return { status: true, message: "", data: response.data.data };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// get in touch!

export const getInTouchAsync = async (data) => {
  try {
    const formData = {
      fullName: data.fullName,
      email: data.email,
    };
    const response = await customAxios.post(getInTouch, formData);
    return {
      status: true,
      message: "Your Form has been submitted successfully.",
      data: response.data.data,
    };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

// export const getMyAllEventAsync = () => {
//   return async (dispatch) => {
//     try {
//       const response = await customAxios.get(allEvents);
//       dispatch(commonAction.setAllEventsList(response?.data?.data));
//       return {
//         status: true,
//         message: "Your Form has been submitted successfully.",
//         data: response.data.data,
//       };
//     } catch (error) {
//       return { status: false, message: error.message };
//     }
//   };
// };

export const getMyAllEventAsync = () => {
  return async (dispatch) => {
    try {
      const response = await customAxios.get(upcomingEvents);
      dispatch(commonAction.setAllEventsList(response?.data?.data));
      return {
        status: true,
        message: "Your Form has been submitted successfully.",
        data: response.data.data,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  };
};

// event reminder
export const eventReminderAsync = async (id, reminder) => {
  try {
    const response = await customAxios.post(eventReminder, {
      event_id: id,
      reminder: reminder,
    });
    return { status: true, message: response.data.message };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
