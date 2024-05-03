import React, { useEffect, useState } from "react";
import CustomCard from "../UI/CustomCard";
import CustomIcon from "../UI/CustomIcon";
import { BiPlus } from "react-icons/bi";
import { Button, Col, Empty, Row, Select, Typography } from "antd";
import Image from "next/image";
import AddMediaModal from "../UI/modals/AddMediaModal";
import ViewMediaModal from "../UI/modals/ViewMediaModal";
import { useSelector } from "react-redux";
import toast from "../UI/toast";
import { getMediaAsync } from "@/utils/apis/commonapi";
import { AiOutlineVideoCamera, AiOutlineCamera } from "react-icons/ai";
import RoundLoader from "../UI/modals/RoundLoader";
const MediaCard = () => {
  const groups = useSelector((store) => store.user.groups);
  const [isAddMediaModalOpen, setIsAddMediaModalOpen] = useState(false);
  const [media, setMedia] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(
    groups.length === 0 ? 0 : groups[0].id.toString()
  );

  const [isViewMedia, setIsViewMedia] = useState(false);
  const [mediaDetail, setMediaDetail] = useState(null);
  const { contextHolder, showToast } = toast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMediaAsync(selectedGroupId).then((res) => {
      if (res.status) {
        setMedia(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [selectedGroupId, isAddMediaModalOpen, isViewMedia]);

  return (
    <CustomCard>
      {/* add media modal */}
      {contextHolder}
      <AddMediaModal
        isModalOpen={isAddMediaModalOpen}
        setIsModalOpen={setIsAddMediaModalOpen}
        groupId={selectedGroupId}
        showToast={showToast}
      />
      <ViewMediaModal
        isModalOpen={isViewMedia}
        setIsModalOpen={setIsViewMedia}
        mediaDetail={mediaDetail}
        showToast={showToast}
      />
      {/* header */}
      {loading && <RoundLoader />}
      <div className="px-3 md:px-0">
        {!loading && groups.length > 0 && (
          <div className="flex justify-between items-center py-3">
            <Typography className="font-AvantGarde title-responsive text-[24px] font-normal leading-[28.77px]">
              Photos and Videos
            </Typography>
            <div className="flex justify-between items-center gap-3 py-3">
              <div>
                <Select
                  style={{ width: 150 }}
                  bordered={true}
                  placeholder="Select group"
                  defaultActiveFirstOption={false}
                  defaultValue={groups[0].id.toString()}
                  size="large"
                  onChange={() => {}}
                  onSelect={(value) => setSelectedGroupId(value)}
                  options={groups.map((group) => {
                    return {
                      label: group?.group_name,
                      value: group?.id?.toString(),
                    };
                  })}
                />
              </div>
              <CustomIcon
                class="md:w-50 md:h-50"
                onClick={() => setIsAddMediaModalOpen(true)}
                style="bg-[#797EF6]"
              >
                <BiPlus size="30" color="#FFFFFF" />
              </CustomIcon>
            </div>
          </div>
        )}

        {/* context */}

        {/* <div className="flex justify-center flex-wrap gap-2 h-[500px] overflow-y-auto scroll-hidden"> */}
        {!loading && media.length <= 0 && (
          <div className="text-center m-auto">
            <img src="/img/dashboard/nomemory.png" />
            <Typography className="text-3xl	font-normal	leading-10	text-[#323232]	mt-7 font-avantGarde-md">
              No Memories
            </Typography>
            <Typography className="flex justify-center text-center text-base font-normal	leading-7	text-[#323232]	mt-2.5 font-avantGarde-bk">
              You don`t have anything to show. You can add photos and videos of
              your families here.
            </Typography>
            <Button
              className="w-176 font-avantGarde-md hover:!bg-[#818cf8] hover:!text-white rounded-full text-base font-normal	leading-7 h-[40px] text-white text-center	px-7 mt-7 bg-[#797EF6]"
              onClick={() => setIsAddMediaModalOpen(true)}
            >
              {" "}
              Upload Media
            </Button>
          </div>
        )}
        {media.length !== 0 && (
          <Row
            gutter={16}
            className="overflow-x-hidden overflow-y-auto scroll-hidden"
            style={{ height: "calc(100vh - 300px)" }}
          >
            {media.map((item) => {
              return item?.media_type === 1 ? (
                <Col className="gutter-row" sm={24} xs={24} lg={8}>
                  <div className="image-icon">
                    <Image
                      className="mediaPointer media-card"
                      key={item.id}
                      src={item?.media_file}
                      alt="Photo"
                      width={330}
                      height={250}
                      onClick={() => {
                        setMediaDetail(item);
                        setIsViewMedia(true);
                      }}
                    />
                    <div className="icon">
                      <CustomIcon style="bg-[#CFCFCF] md:mr-[50px]">
                        <AiOutlineCamera
                          className="w-4 h-4"
                          size={23}
                          color="#979797"
                        />
                      </CustomIcon>
                    </div>
                  </div>
                </Col>
              ) : (
                <Col className="gutter-row" sm={24} xs={24} lg={8}>
                  <div className="image-icon">
                    <video
                      className="mediaPointer media-card"
                      key={item.id}
                      width="330px"
                      height="250px"
                      poster={`${item?.v_thumbnail}` + "#t=0.5"}
                      onClick={() => {
                        setMediaDetail(item);
                        setIsViewMedia(true);
                      }}
                    >
                      <source src={item?.media_file} />
                    </video>
                    <div className="icon">
                      <CustomIcon style="bg-[#CFCFCF] md:mr-[50px]">
                        <AiOutlineVideoCamera
                          className="w-4 h-4"
                          size={23}
                          color="#979797"
                        />
                      </CustomIcon>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </CustomCard>
  );
};

export default MediaCard;

const MediaItem = ({ item }) => {
  return (
    <>
      {/* <Image width={200} src={item?.media_file} fill alt="loading" /> */}
      {item?.media_type === 1 ? (
        <Image
          src={item?.media_file}
          alt="Photo"
          width={250}
          height={200}
          onClick={() => {
            //setEvent(event);
            setIsViewMedia(true);
          }}
        />
      ) : (
        <video
          width="250px"
          height="200px"
          poster={item?.v_thumbnail}
          onClick={() => {
            //setEvent(event);
            setIsViewMedia(true);
          }}
        >
          <source src={item?.media_file} />
        </video>
      )}
    </>
  );
};
