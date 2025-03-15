import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Button,
  Input,
  Progress,
  Divider,
  Chip,
} from "@heroui/react";
import {
  FaUser,
  FaEnvelope,
  FaMedal,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTrophy,
  FaBookOpen,
} from "react-icons/fa";
import { darkThemeContext } from "./contextProvider/DarkModeContext";
import axios from "axios";
import { LoaderComponent } from "./LoaderComponent";
import { motion } from "framer-motion";
import hostname from "./utils/hostname";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const { isDarkMode } = useContext(darkThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axios.post(`${hostname}/profile_data`, {
        email: localStorage.getItem("email"),
        SecCode: localStorage.getItem("authToken"),
      });
      setProfileData(response.data);
      setEditedName(response.data.userName);
    } catch (err) {
      setError("Failed to fetch profile data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${hostname}/update_profile`, {
        email: localStorage.getItem("email"),
        SecCode: localStorage.getItem("authToken"),
        userName: editedName,
        TotalStudyPlans: profileData.TotalStudyPlans,
      });
      setProfileData(response.data);
      localStorage.setItem("username", response.data.userName);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoaderComponent message="Loading profile..." />;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!profileData)
    return <div className="text-center">No profile data found</div>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full backdrop-blur-md bg-background/60 border border-default-200 shadow-2xl rounded-3xl overflow-hidden">
          {/* Profile Header */}
          <CardHeader className="relative h-48 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="absolute -bottom-16 left-8">
              <Avatar
                isBordered
                color="secondary"
                src={`https://api.dicebear.com/9.x/initials/svg?seed=${profileData.userName}`}
                className="w-32 h-32 text-large"
              />
            </div>
          </CardHeader>

          <CardBody className="pt-20 pb-8 px-8">
            {/* Basic Info Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  {isEditing ? (
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Enter your name"
                      className="max-w-xs"
                      endContent={
                        <Button
                          isIconOnly
                          color="success"
                          variant="light"
                          onPress={handleUpdateProfile}
                        >
                          <FaSave className="text-xl" />
                        </Button>
                      }
                    />
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold">
                        {profileData.userName}
                      </h1>
                      <Button
                        isIconOnly
                        color="primary"
                        variant="light"
                        onPress={() => setIsEditing(true)}
                      >
                        <FaEdit className="text-xl" />
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-default-500 flex items-center gap-2 mt-2">
                  <FaEnvelope /> {profileData.email}
                </p>
              </div>

              <div className="flex gap-4">
                <Chip
                  startContent={<FaTrophy className="text-warning" />}
                  variant="flat"
                  color="warning"
                >
                  Rank #{profileData.userRank + 1}
                </Chip>
                <Chip
                  startContent={<FaBookOpen className="text-success" />}
                  variant="flat"
                  color="success"
                >
                  {profileData.TotalStudyPlans} Study Plans
                </Chip>
              </div>
            </div>

            <Divider className="my-8" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-default-100/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <FaMedal className="text-2xl text-primary" />
                  <h3 className="text-xl font-semibold">Points</h3>
                </div>
                <Progress
                  value={profileData.userpoints / profileData.TotalStudyPlans}
                  maxValue={100}
                  color="primary"
                  showValueLabel
                  className="mb-2"
                />
                <p className="text-small text-default-500">
                  {profileData.userpoints} points earned of{" "}
                  {profileData.TotalStudyPlans * 100}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-default-100/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <FaCalendarAlt className="text-2xl text-success" />
                  <h3 className="text-xl font-semibold">Member Since</h3>
                </div>
                <p className="text-default-500">
                  {formatDate(profileData.createdAt)}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-2xl bg-default-100/50 backdrop-blur-sm cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <FaBookOpen className="text-2xl text-warning" />
                  <h3 className="text-xl font-semibold">Study Plans</h3>
                </div>
                <div className="flex items-center gap-4">
                  <Progress
                    value={profileData.TotalStudyPlans}
                    maxValue={10}
                    color="warning"
                    showValueLabel
                    className="mb-2"
                  />
                  <span className="text-small text-default-500">of ♾️</span>
                </div>
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
