import React, { useState, useContext } from "react";
import { Form, InputOtp, Button, Card } from "@heroui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "./contextProvider/AuthContext";
import hostname from "./utils/hostname";
import { LoaderComponent } from "./LoaderComponent";

const BACKEND_URL = hostname;

const OTPValidationPage = () => {
  const { isLogin, setisLogin } = useContext(AuthenticationContext);

  const [error, setError] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const otpValue = formData.get("otp");
    setOtp(otpValue);

    const secCode = localStorage.getItem("tempSecCode");
    if (!secCode) {
      setError("Session expired. Please register again.");
      localStorage.clear();
      navigate("/signup");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register/otp`, {
        otp: otpValue,
        SecCode: secCode,
      });

      // Store the new SecCode and remove the temporary one
      localStorage.removeItem("tempSecCode");
      if (response.data.SecCode) {
        localStorage.setItem("authToken", response.data.SecCode);

        setisLogin(true);
        navigate("/add_category");
      }
    } catch (error) {
      setisLogin(false);
      console.error("OTP verification failed:", error);
      setError(
        error.response?.data?.message ||
          "OTP verification failed. Please try again."
      );
      alert("SignUp failed please try again");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-gradient-to-br from-background/50 to-background">
      {isLoading && <LoaderComponent />}
      <Card className="w-full max-w-md p-8 space-y-8 backdrop-blur-md bg-background/60 border border-default-200 shadow-2xl rounded-3xl">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Verify OTP
          </h2>
          <p className="text-sm text-default-500">
            Enter the OTP sent to your email
          </p>
        </div>

        <Form className="space-y-8 w-full" onSubmit={handleSubmit}>
          <div className="space-y-5 w-full">
            <InputOtp
              isRequired
              aria-label="OTP input field"
              length={6}
              name="otp"
              placeholder="Enter code"
              classNames={{
                base: "flex flex-row justify-center gap-2 w-full",
                input: [
                  "h-14",
                  "w-14",
                  "text-center",
                  "text-xl",
                  "bg-default-100/50",
                  "rounded-lg",
                  "border-2",
                  "border-default-200",
                  "hover:border-blue-500",
                  "focus:border-blue-500",
                  "outline-none",
                  "transition-colors",
                ],
                inputWrapper: "w-auto",
                group: "flex flex-row items-center justify-center gap-2",
              }}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700"
            size="lg"
            radius="xl"
          >
            Verify OTP
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default OTPValidationPage;
