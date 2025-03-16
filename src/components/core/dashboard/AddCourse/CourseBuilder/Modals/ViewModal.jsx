import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Upload from "../../Upload";

function ViewModal({ viewData, open = false, setOpen }) {
  // setting up form
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  // Update the fields if form is in view or edit mode
  useEffect(() => {
    setValue("lectureTitle", viewData?.title);
    setValue("lectureDesc", viewData?.description);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* TRIGGER BUTTON */}

      <DialogContent className="my-10  w-11/12 max-w-[700px]  rounded-lg border border-richblack-400 bg-richblack-800 ">
        <ScrollArea className=" mr-3 max-h-[70vh]">
          <div>
            {/* Heading */}
            <DialogHeader>
              {/* HEADING */}
              <DialogTitle className="text-left text-xl text-richblack-5">
                Viewing Lecture
              </DialogTitle>
            </DialogHeader>
            {/* Modal Form */}
            <form className="space-y-8 px-8 py-10">
              {/* Lecture Video Upload */}
              <Upload
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={viewData?.videoURL}
              />
              {/* Lecture Title */}
              <div className="flex flex-col space-y-2">
                <label
                  className="text-sm text-richblack-5"
                  htmlFor="lectureTitle"
                >
                  Lecture Title
                </label>
                <input
                  disabled
                  id="lectureTitle"
                  placeholder="Enter Lecture Title"
                  {...register("lectureTitle", { required: true })}
                  className="form-style w-full"
                />
                {errors.lectureTitle && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Lecture title is required
                  </span>
                )}
              </div>
              {/* Lecture Description */}
              <div className="flex flex-col space-y-2">
                <label
                  className="text-sm text-richblack-5"
                  htmlFor="lectureDesc"
                >
                  Lecture Description
                </label>
                <textarea
                  disabled
                  id="lectureDesc"
                  placeholder="Enter Lecture Description"
                  {...register("lectureDesc", { required: true })}
                  className="form-style resize-x-none min-h-[130px] w-full"
                />
                {errors.lectureDesc && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Lecture Description is required
                  </span>
                )}
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                    type="button"
                    variant="yellow"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ViewModal;
