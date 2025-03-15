import React, { useRef, useState } from "react";
import { Input, Button, Calendar } from "@heroui/react";
import { FaBook, FaCalendar, FaClock, FaCode } from "react-icons/fa";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hostname from "../utils/hostname";
import { LoaderComponent } from "../LoaderComponent";

const AddCategory = () => {
  const navigate = useNavigate();
  const langRef = useRef();
  const weeksRef = useRef();
  const timecanSpentDailyRef = useRef();
  const [level, setLevel] = useState("base");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);

  const handleDateChange = (date) => {
    setStartDate(new Date(date).toISOString().split("T")[0]);
    setShowStartCalendar(false);
    setError("");
  };

  const validateForm = () => {
    const lang = langRef.current.value.trim();
    const weeks = parseInt(weeksRef.current.value);
    const timecanSpentDaily = parseInt(timecanSpentDailyRef.current.value);

    if (!lang) {
      setError("Topic is required");
      return false;
    }

    if (!weeks || weeks < 1 || weeks > 52) {
      setError("Weeks must be between 1 and 52");
      return false;
    }

    if (!timecanSpentDaily || timecanSpentDaily < 1 || timecanSpentDaily > 24) {
      setError("Daily hours must be between 1 and 24");
      return false;
    }

    const startDateObj = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDateObj < today) {
      setError("Start date must be in the future");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      const email = localStorage.getItem("email");

      if (!authToken || !email) {
        setError("Authentication information missing. Please login again.");
        return;
      }

      const requestData = {
        email: email,
        language: langRef.current.value.trim(),
        duration: parseInt(weeksRef.current.value),
        difficultyLevel: level,
        startDate: startDate,
        timecanSpentDaily: parseInt(timecanSpentDailyRef.current.value),
        SecCode: authToken,
      };

      const response = await axios.post(
        `${hostname}/get-preferences`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isQeustionGenerated) {
        localStorage.setItem(
          "questions",
          JSON.stringify(response.data.questionObj)
        );
        localStorage.setItem("uuid", response.data.uuid);
        localStorage.setItem("lang", requestData.language);
        localStorage.setItem("level", requestData.difficultyLevel);
        navigate("/ask_questions");
      } else {
        // Try one more time
        const retryResponse = await axios.post(
          `${hostname}/get-preferences`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (retryResponse.data.isQeustionGenerated) {
          localStorage.setItem(
            "questions",
            JSON.stringify(retryResponse.data.questionObj)
          );
          localStorage.setItem("uuid", retryResponse.data.uuid);
          localStorage.setItem("lang", requestData.language);
          localStorage.setItem("level", requestData.difficultyLevel);
          navigate("/ask_questions");
        } else {
          localStorage.clear();
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error creating study plan:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create study plan. Please try again."
      );
    } finally {
      setisLoading(false);
    }
  };

  return (
    <main className="dark text-foreground bg-background min-h-screen p-8">
      {isLoading && (
        <LoaderComponent message="Wait a moment, we are generating your study plan..." />
      )}
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg p-8 border border-border">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaBook className="text-primary text-2xl" />
          Create Study Plan
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <FaCode className="text-primary" />
              Programming Language / Any Study Topic
            </label>
            <Input
              ref={langRef}
              placeholder="Topic Name"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <FaClock className="text-primary" />
              Duration (Weeks)
            </label>
            <Input
              ref={weeksRef}
              type="number"
              min="1"
              max="52"
              placeholder="Number of weeks (1-52)"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <FaClock className="text-primary" />
              Time Available Daily (Hours)
            </label>
            <Input
              ref={timecanSpentDailyRef}
              type="number"
              min="1"
              max="24"
              placeholder="Hours per day (1-24)"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium">
              <FaCode className="text-primary" />
              Difficulty Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["base", "intermediate", "advance"].map((levelOption) => (
                <button
                  key={levelOption}
                  type="button"
                  onPress={() => setLevel(levelOption)}
                  className={`p-3 rounded-lg border transition-all duration-200 capitalize text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                    level === levelOption
                      ? "bg-primary border-primary-focus text-primary-foreground"
                      : "bg-card border-border hover:border-primary"
                  }`}
                >
                  {levelOption}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <FaCalendar className="text-primary" />
              Start Date
            </label>
            <div className="relative">
              <Button
                onPress={() => setShowStartCalendar(!showStartCalendar)}
                type="button"
                className={`w-full justify-start text-left ${
                  showStartCalendar ? "border-primary" : ""
                }`}
              >
                {new Date(startDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Button>
              {showStartCalendar && (
                <div className="absolute z-10 mt-2 bg-popover border border-border shadow-xl rounded-lg">
                  <Calendar
                    aria-label="Start Date"
                    value={parseDate(startDate)}
                    onChange={handleDateChange}
                  />
                </div>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 rounded-lg font-medium shadow-lg transition-all duration-200"
          >
            Create Study Plan
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AddCategory;
