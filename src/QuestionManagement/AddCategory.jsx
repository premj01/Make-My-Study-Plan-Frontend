import React, { useRef, useState } from "react";
import {
  Input,
  Button,
  Calendar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@heroui/react";
import {
  FaBook,
  FaCalendar,
  FaClock,
  FaCode,
  FaChartLine,
  FaRocket,
  FaGraduationCap,
} from "react-icons/fa";
import { parseDate } from "@internationalized/date";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hostname from "../utils/hostname";
import { LoaderComponent } from "../LoaderComponent";
import { motion } from "framer-motion";

const DIFFICULTY_LEVELS = [
  { key: "base", label: "Basic", description: "For beginners", icon: FaBook },
  {
    key: "intermediate",
    label: "Intermediate",
    description: "For experienced learners",
    icon: FaGraduationCap,
  },
  {
    key: "advance",
    label: "Advanced",
    description: "For experts",
    icon: FaRocket,
  },
];

const AddCategory = () => {
  const navigate = useNavigate();
  const langRef = useRef();
  const weeksRef = useRef();
  const timecanSpentDailyRef = useRef();
  const [level, setLevel] = useState(new Set(["base"]));
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showStartCalendar, setShowStartCalendar] = useState(false);

  const selectedLevel = React.useMemo(
    () => Array.from(level)[0] || "base",
    [level]
  );

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
      setisLoading(false);
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
        difficultyLevel: selectedLevel,
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

  const renderDifficultyIcon = (selectedKey) => {
    const selectedDifficulty = DIFFICULTY_LEVELS.find(
      (d) => d.key === selectedKey
    );
    if (selectedDifficulty) {
      const Icon = selectedDifficulty.icon;
      return <Icon className="text-primary" />;
    }
    return null;
  };

  return (
    <main className="dark text-foreground bg-background min-h-screen p-8">
      {isLoading && (
        <LoaderComponent message="Wait a moment, we are generating your study plan..." />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-2xl mx-auto bg-background/60 backdrop-blur-md shadow-2xl rounded-3xl border border-default-200">
          <CardHeader className="flex flex-col gap-2 px-8 pt-8">
            <h2 className="text-4xl font-bold flex items-center gap-3">
              <FaBook className="text-primary" />
              Create Study Plan
            </h2>
            <p className="text-default-500">
              Design your personalized learning journey
            </p>
          </CardHeader>

          <CardBody className="px-8 pb-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger rounded-xl"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <FaCode className="text-primary" />
                  Programming Language / Study Topic
                </label>
                <Input
                  ref={langRef}
                  placeholder="e.g., Python, JavaScript, Mathematics"
                  className="w-full"
                  required
                  size="lg"
                  variant="bordered"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <FaClock className="text-primary" />
                    Duration (Weeks)
                  </label>
                  <Input
                    ref={weeksRef}
                    type="number"
                    min="1"
                    max="52"
                    placeholder="1-52 weeks"
                    className="w-full"
                    required
                    size="lg"
                    variant="bordered"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          Weeks
                        </span>
                      </div>
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <FaClock className="text-primary" />
                    Daily Study Hours
                  </label>
                  <Input
                    ref={timecanSpentDailyRef}
                    type="number"
                    min="1"
                    max="24"
                    placeholder="1-24 hours"
                    className="w-full"
                    required
                    size="lg"
                    variant="bordered"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          Hours
                        </span>
                      </div>
                    }
                  />
                </div>
              </div>

              <Divider className="my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <FaChartLine className="text-primary" />
                    Difficulty Level
                  </label>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-start"
                        size="lg"
                        startContent={renderDifficultyIcon(selectedLevel)}
                      >
                        {DIFFICULTY_LEVELS.find((d) => d.key === selectedLevel)
                          ?.label || "Select Level"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Select difficulty level"
                      variant="flat"
                      selectionMode="single"
                      selectedKeys={level}
                      onSelectionChange={setLevel}
                    >
                      {DIFFICULTY_LEVELS.map((level) => (
                        <DropdownItem
                          key={level.key}
                          startContent={renderDifficultyIcon(level.key)}
                          description={level.description}
                        >
                          {level.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <FaCalendar className="text-primary" />
                    Start Date
                  </label>
                  <div className="relative">
                    <Button
                      onPress={() => setShowStartCalendar(!showStartCalendar)}
                      variant="bordered"
                      size="lg"
                      className="w-full justify-start"
                      startContent={<FaCalendar className="text-primary" />}
                    >
                      {new Date(startDate).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Button>
                    {showStartCalendar && (
                      <Card className="absolute z-10 mt-2">
                        <CardBody>
                          <Calendar
                            aria-label="Start Date"
                            value={parseDate(startDate)}
                            onChange={handleDateChange}
                          />
                        </CardBody>
                      </Card>
                    )}
                  </div>
                </div>
              </div>

              <motion.div
                className="pt-6"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  color="primary"
                  variant="shadow"
                  startContent={<FaRocket />}
                >
                  Create Study Plan
                </Button>
              </motion.div>
            </form>
          </CardBody>
        </Card>
      </motion.div>
    </main>
  );
};

export default AddCategory;
