import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { PropagateLoader } from "react-spinners";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  function handleOnChange(e) {
    setEmail(e.target.value);
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center text-richblack-5">
        <PropagateLoader color="#afb2bf" />
      </div>
    );
  }

  return (
    <div className="w-9/11 mx-auto flex min-h-[calc(100vh-3.5rem)]  items-center justify-center text-richblack-5">
      {/* Wrapper div */}
      <div className="w-[30%] space-y-5">
        <h1 className="text-3xl font-semibold">
          {!emailSent ? "Reset your password" : "Check email"}
        </h1>
        <p className="text-[1rem] text-richblack-200">
          {!emailSent
            ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
            : `We have sent the reset email to ${email}`}
        </p>
        <form onSubmit={handleOnSubmit} className="space-y-5">
          {!emailSent && (
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Email Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
          )}
          <Button type="submit" variant="yellow" className="w-full">
            {!emailSent ? "Reset Password" : "Resend Email"}
          </Button>
          {/* Back to login */}
          <p className="flex items-center  gap-2">
            <ArrowLeft size={16} />
            <Link to="/login">Back to login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
