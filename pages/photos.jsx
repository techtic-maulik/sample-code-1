import withAuth from "../auth/withAuth";
import React from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import MediaContainer from "@/components/media/MediaContainer";
import { useSelector } from "react-redux";

const PhotosPage = () => {
  const groups = useSelector((store) => store.user.groups);

  return (
    <>
      <DashboardLayout
        emptyImage="/img/dashboard/nomemory.png"
        title="No Memories"
        description="photos"
        buttonText="Upload Media"
        >
        {groups?.length !== 0 && <MediaContainer />}
      </DashboardLayout>
    </>
  );
};

export default withAuth(PhotosPage);
