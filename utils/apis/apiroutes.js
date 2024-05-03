export const host = process.env.API_BASE_URL;

// auth api's
export const loginApiRoute = `/api/login`;
export const signupApiRoute = `/api/signup`;
export const logoutApiRoute = `/api/logout`;
export const socialLoginApiRoute = `/api/social-login`;
export const appleLoginApiRoute = `/api/signup-apple`;
export const forgotPassword = "/api/forgot-password";

// dashboard api's
export const addGroup = "/api/add-group";
export const getCountryCodes = "/api/get-country-codes";
export const getFamilyRelations = "/api/get-family-relations";
export const getAllGroups = "/api/get-all-group";
export const getGroupById = "api/get-group/2";
export const deleteGroup = "/api/delete-group";
export const leaveGroup = "/api/leave-group";
export const addNewGroupMember = "/api/add-family-member";
export const getGroupMembers = "/api/get-groupmembers-list";
export const updateGroupDetails = "/api/update-group";
export const deleteGroupMember = "/api/delete-member";

// req
export const getRequests = "api/get-request-list";
export const acceptOrRejectInvitation = "api/accept-reject-request";

// category
export const getEventCategories = "api/get-event-categories";
export const addEvent = "api/add-family-event";

// events
export const getMyEvents = "api/my-event-list";
export const deleteMyEvent = "api/delete-event";
export const allEvents = "api/all-event-list";
// profile
export const updateProfile = "api/update-profile";

// change password
export const changePassword = "api/change-password";

// notification
export const getNotification = "api/notifications";
export const deleteNotification = "api/notification";
export const getNotificationWebDashboard = "api/notification-web";

//photos and videos
export const addMedia = "api/add-media";
export const getMedia = "api/get-media-list";
export const deleteMedia = "api/delete-media";

//message
export const sendMessageApi = "api/send-messages";

// account delete
export const deleteAccount = "api/account-delete";

// getInTouch

export const getInTouch = "api/contact-us";

// is on Notification

export const isOnNotification = "api/settings-notification";
export const getUserByID = "api/profile"

// event reminder
export const eventReminder = 'api/on-off-reminder'

// upcoming events
export const upcomingEvents = 'api/upcoming-event' 