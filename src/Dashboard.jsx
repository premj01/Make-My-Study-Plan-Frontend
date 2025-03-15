import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  Progress,
  Chip,
  Divider,
  Button,
  Toast,
  addToast,
} from "@heroui/react";
import {
  FaBook,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaChartLine,
  FaPlus,
  FaRocket,
} from "react-icons/fa";
import { LoaderComponent } from "./LoaderComponent";
import { AuthenticationContext } from "./contextProvider/AuthContext";
import { Alert } from "@heroui/react";
import hostname from "./utils/hostname";

const Dashboard = () => {
  const [topicList, setTopicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLogin, setisLogin } = useContext(AuthenticationContext);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      addToast({
        title: "Sign In ",
        description: "Please sign in to continue",
        color: "warning",
        timeout: 800,
        shouldShowTimeoutProgress: true,
      });
    } else {
      setisLogin(true);
      setLoading(true);
      const fetchDashboardContent = async () => {
        try {
          const response = await axios.post(`${hostname}/dash-board-content`, {
            email: localStorage.getItem("email"),
            SecCode: localStorage.getItem("authToken"),
          });
          console.log(
            "API Response - Topic List:",
            response.data.topicListContent
          );
          setTopicList(response.data.topicListContent);
        } catch (error) {
          console.error("Error fetching dashboard content:", error);
          if (!error.response?.data?.status) {
            // addToast({
            //   title: "Login Required",
            //   description: "Please sign in to continue",
            //   color: "warning",
            // });
            // localStorage.clear();
            // navigate("/login");
          }
        } finally {
          setLoading(false);
        }
      };
      fetchDashboardContent();
    }
  }, []);

  const handleTopicClick = (topicId) => {
    localStorage.setItem("uuid", topicId);
    navigate("/my-study-plan");
  };

  const getDifficultyColor = (difficulty) => {
    const normalizedDifficulty = (difficulty || "").toLowerCase().trim();
    switch (normalizedDifficulty) {
      case "base":
      case "basic":
      case "beginner":
        return "success";
      case "intermediate":
      case "medium":
        return "warning";
      case "advance":
      case "advanced":
      case "expert":
        return "danger";
      default:
        console.log("Unknown difficulty:", difficulty);
        return "primary";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <LoaderComponent />;
  }

  if (!isLogin) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* <h1 className="text-3xl font-bold">My Learning Journey</h1> */}

        <div className="w-full flex items-center flex-col gap-10 my-3">
          <Alert color="warning" title="Please sign in to continue" />
          {/* <p className="text-lg">Please sign in to continue</p> */}
          <Button
            aria-label="Sign in to access dashboard"
            color="danger"
            variant="flat"
            onPress={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-5xl">Hey </span>
          <span className="text-success text-5xl">
            {localStorage.getItem("username").trim()}
          </span>
          <span className="text-2xl"> , your Learning Journey</span>
        </h1>
        <Chip color="primary" variant="flat">
          {topicList.length} Active Courses
        </Chip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicList.map((topic) => (
          <Card
            key={topic.id}
            isPressable
            onPress={() => handleTopicClick(topic.id)}
            className="hover:scale-105 transition-transform duration-200"
          >
            <CardBody className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold capitalize mb-2">
                      {topic.topicName}
                    </h2>
                    <Chip
                      color={getDifficultyColor(topic.topicDifficulty)}
                      variant="flat"
                      size="sm"
                    >
                      {topic.topicDifficulty}
                    </Chip>
                  </div>
                  <span role="img" aria-label="Continue to study plan">
                    <FaArrowRight className="text-primary text-xl" />
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Progress</span>
                    <span>{topic.topicProgress}%</span>
                  </div>
                  <Progress
                    value={topic.topicProgress}
                    color={getDifficultyColor(topic.topicDifficulty)}
                    className="h-2"
                  />
                </div>

                <Divider />

                <div className="grid grid-cols-2 gap-4 text-sm text-default-500">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-default-400" />
                    <span>{topic.topicDuration} weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-default-400" />
                    <span>Due {formatDate(topic.topicEndDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-default-400" />
                    <span className="capitalize">{topic.topicDifficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBook className="text-default-400" />
                    <span>Updated {formatDate(topic.lastUpdated)}</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        {/* Add Topic Card */}
        <Link to="/add_category" className="block">
          <Card className="border-2 border-dashed border-primary-400 hover:border-primary hover:bg-primary-50/10 hover:scale-105 transition-all duration-200">
            <CardBody className="flex flex-col items-center justify-center p-6 h-full min-h-[300px]">
              <div className="relative mb-4">
                <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md"></div>
                <div className="h-16 w-16 text-2xl relative flex items-center justify-center bg-primary text-white rounded-full">
                  <FaPlus />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Start New Journey
              </h3>
              <p className="text-center text-default-500 mb-4">
                Create a new learning path
              </p>
              <div className="flex items-center gap-2 text-primary">
                <FaRocket className="animate-bounce" />
                <span>Let's begin!</span>
              </div>
            </CardBody>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
