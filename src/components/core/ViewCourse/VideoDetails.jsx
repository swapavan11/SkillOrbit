import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import "video-react/dist/video-react.css";
import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { viewCourseActions } from "../../../slices/viewCourseSlice";

const VideoDetails = () => {
  const { courseId, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subsectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        //console.log("courseSectionData", courseSectionData);
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId,
        );
        //console.log("filteredData", filteredData);
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subsectionId,
        );
        //console.log("filteredVideoData", filteredVideoData);
        setVideoData(filteredVideoData?.[0]);
        //console.log("THIS IS VIDEO DATA:: ", filteredVideoData[0]);
        setPreviewSource(courseEntireData.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subsectionId);

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true;
    } else {
      return false;
    }
  };

  // go to the next video
  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subsectionId);

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`,
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`,
      );
    }
  };

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length;

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subsectionId);

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  // go to the previous video
  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subsectionId);

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`,
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`,
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(token, {
      courseId: courseId,
      subsectionId: subsectionId,
    });
    if (res) {
      dispatch(viewCourseActions.updateCompletedLectures(subsectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          fluid={true}
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoURL}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subsectionId) && (
                <Button
                  variant="yellow"
                  disabled={loading}
                  onClick={() => handleLectureCompletion()}
                  className="mx-auto max-w-max px-4 text-xl"
                >
                  {!loading ? "Mark As Completed" : "Loading..."}
                </Button>
              )}
              <Button
                disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef?.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                variant="yellow"
                className="mx-auto mt-2 max-w-max px-4 text-xl"
              >
                Rewatch
              </Button>
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <Button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    variant="normal"
                  >
                    Prev
                  </Button>
                )}
                {!isLastVideo() && (
                  <Button
                    disabled={loading}
                    onClick={goToNextVideo}
                    variant="normal"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pb-6 pt-2">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
