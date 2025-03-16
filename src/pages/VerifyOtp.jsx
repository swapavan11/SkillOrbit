import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { PropagateLoader } from "react-spinners";
function VerifyOtp() {
  const { loading } = useSelector((state) => state.auth);
  const { signUpData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!signUpData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleVerifyAndSignup(event) {
    event.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signUpData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate,
      ),
    );
  }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="text-richblack-5">
          <PropagateLoader color="#afb2bf" />
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Verify Email
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="aspect-square w-[48px] rounded-[0.5rem] border-0 bg-richblack-800 text-center text-richblack-5 focus:border-0 focus:outline-2 focus:outline-yellow-50 lg:w-[60px]"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 px-[12px] py-[12px] font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/signup">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center gap-x-2 text-blue-100"
              onClick={() => dispatch(sendOtp(signUpData.email, navigate))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyOtp;
