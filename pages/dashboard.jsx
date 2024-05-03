import withAuth from "../auth/withAuth";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardContainer from "../components/dashboard/DashboardContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupsAsync, getInvitationAsync } from "@/utils/apis/commonapi";
import toast from "../components/UI/toast";
import CreateGroupModal from "../components/UI/modals/CreateGroupModal";
import { commonAction } from "../store/slices/commonSlice";
import RoundLoader from "../components/UI/modals/RoundLoader";
import useChat from "@/utils/useChat";

const DashboardPage = () => {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isInvite, setIsInvite] = useState();
  const [loading, setLoading] = useState(true);
  const { contextHolder, showToast } = toast();
  const dispatch = useDispatch();
  const groups = useSelector((store) => store.user.groups);

  useEffect(() => {
    dispatch(getAllGroupsAsync());
  }, [isGroupModalOpen, dispatch]);

  useEffect(() => {
    getInvitationAsync().then((res) => {
      if (res.status) {
        setIsInvite(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);


  return (
    <>
      {contextHolder}
      <CreateGroupModal
        isModalOpen={isGroupModalOpen}
        setIsModalOpen={setIsGroupModalOpen}
        showToast={showToast}
      />

      <DashboardLayout
        emptyImage="/img/dashboard/sorry.png"
        title="You’re alone here!"
        description="You need to add members and create groups to get started. You can create different events and message your family members. "
        buttonText="Create Group"
        setIsGroupModalOpen={setIsGroupModalOpen}
      >
        {loading ? (
          <div style={{ margin: "auto" }}>
            <RoundLoader />
          </div>
        ) : (
          (groups?.length > 0 || isInvite?.length > 0) && <DashboardContainer />
        )}
      </DashboardLayout>
    </>
  );
};

export default withAuth(DashboardPage);
