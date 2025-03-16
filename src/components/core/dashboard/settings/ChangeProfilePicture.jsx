import { useSelector } from "react-redux";
import { FiUpload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import { toast } from "react-hot-toast";
function ChangeProfilePicture() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  function createFormData() {
    const formData = new FormData();
    formData.append("displayPicture", imageFile);
    return formData;
  }

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = createFormData();

      // check if imageFile is not empty
      if (!imageFile) {
        setLoading(false);
        return toast.error("Select any image to upload first");
      }
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      //console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <div className="flex items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <Button
                onClick={handleClick}
                className=" bg-richblack-700 text-richblack-50"
                disabled={loading}
                variant="normal"
              >
                Select
              </Button>
              <Button
                variant="yellow"
                className="flex items-center gap-1"
                onClick={handleFileUpload}
              >
                <p>{loading ? "Uploading..." : "Upload"}</p>
                {!loading && <FiUpload className=" text-richblack-900" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeProfilePicture;
