import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Progress,
  Chip,
  Button,
  Spinner,
  addToast,
} from "@heroui/react";
import { FaTrophy, FaMedal, FaCrown, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { darkThemeContext } from "./contextProvider/DarkModeContext";
import { LoaderComponent } from "./LoaderComponent";
import hostname from "./utils/hostname";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useContext(darkThemeContext);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.post(`${hostname}/leader-board`, {
        email: localStorage.getItem("email"),
        SecCode: localStorage.getItem("authToken"),
      });
      setLeaderboardData(response.data);
      if (response.data.msg) {
        addToast({
          title: "Success",
          description: response.data.msg,
          color: "success",
          timeout: 1000,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch leaderboard");
      addToast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch leaderboard",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <FaCrown className="text-2xl text-warning" />;
      case 2:
        return <FaMedal className="text-2xl text-default-400" />;
      case 3:
        return <FaMedal className="text-2xl text-amber-600" />;
      default:
        return <FaChartLine className="text-xl text-primary" />;
    }
  };

  const getCardStyle = (rank, isCurrentUser) => {
    let baseStyle = "transform transition-all duration-300 hover:scale-102";
    if (isCurrentUser) {
      baseStyle += " bg-primary-50/10 border-2 border-primary";
    } else if (rank === 1) {
      baseStyle += " bg-warning-50/10";
    } else if (rank === 2) {
      baseStyle += " bg-default-50/10";
    } else if (rank === 3) {
      baseStyle += " bg-amber-50/10";
    }
    return baseStyle;
  };

  if (loading) {
    return <LoaderComponent message="Loading leaderboard..." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-danger text-xl">{error}</p>
        <div className="flex gap-4">
          <Button
            color="primary"
            variant="bordered"
            onPress={fetchLeaderboardData}
          >
            Retry
          </Button>
          <Link to="/login">
            <Button color="success" variant="bordered">
              Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-background/60 backdrop-blur-md border-default-200">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-6">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <FaTrophy className="text-warning" />
                Leaderboard
              </h1>
              <p className="text-default-500 mt-2">
                Top performers in your learning journey
              </p>
            </div>
            {leaderboardData && (
              <Chip
                color="primary"
                variant="flat"
                className="text-lg"
                startContent={<FaChartLine />}
              >
                Your Rank: #{leaderboardData.userRank}
              </Chip>
            )}
          </CardHeader>

          <CardBody className="gap-4">
            {leaderboardData?.leaderboard.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={getCardStyle(
                    user.rank,
                    user.rank === leaderboardData.userRank
                  )}
                >
                  <CardBody>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(user.rank)}
                      </div>
                      <Avatar
                        isBordered
                        color={user.rank <= 3 ? "warning" : "default"}
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.userName}`}
                        className="w-14 h-14"
                      />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">
                            {user.userName}
                          </h3>
                          {user.rank === leaderboardData.userRank && (
                            <Chip color="primary" size="sm">
                              You
                            </Chip>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <Progress
                            value={(user.userpoints / 150) * 100}
                            color={user.rank <= 3 ? "warning" : "primary"}
                            className="max-w-md"
                            aria-label="Points"
                          />
                          <span className="text-default-500 min-w-[80px]">
                            {user.userpoints} points
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-default-500">
                        #{user.rank}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default LeaderBoard;
