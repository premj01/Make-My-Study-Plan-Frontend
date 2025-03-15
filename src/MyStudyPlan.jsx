import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Checkbox,
  Chip,
  Progress,
  Divider,
  Link,
} from "@heroui/react";
import { FaBook, FaCheckCircle, FaClock } from "react-icons/fa";
import { addToast } from "@heroui/react";
import hostname from "./utils/hostname";

const MyStudyPlan = () => {
  const [studyPlanData, setStudyPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudyPlan = async () => {
      try {
        const uuid = localStorage.getItem("uuid");
        const email = localStorage.getItem("email");
        const SecCode = localStorage.getItem("authToken");

        const response = await axios.post(`${hostname}/fetch-my-study-plan`, {
          uuid,
          email,
          SecCode,
        });
        // console.log(response.data);

        setStudyPlanData(response.data);
      } catch (error) {
        if (!error.response.data.status) {
          addToast({
            title: "Please refresh the page",
            description: "Something went wrong plaese refresh this page",
            color: "warning",
          });
          // localStorage.clear();
          console.error(
            "Error fetching study plan :" + error.response.data.message
          );
          navigate("/dashboard");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudyPlan();
  }, []);

  const handleSubTopicCheck = async (topicId, subTopicId, isChecked) => {
    try {
      // Update local state
      setStudyPlanData((prev) => ({
        ...prev,
        studyPlan: prev.studyPlan.map((topic) => {
          if (topic.topicid === topicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map((subTopic) => {
                if (subTopic.subTopicId === subTopicId) {
                  return {
                    ...subTopic,
                    isCompleted: isChecked,
                    completedAt: isChecked ? new Date().toISOString() : null,
                  };
                }
                return subTopic;
              }),
            };
          }
          return topic;
        }),
      }));

      // Make API call to update status
      const response = await axios.post(`${hostname}/update-record`, {
        uuid: localStorage.getItem("uuid"),
        email: localStorage.getItem("email"),
        topicid: topicId,
        subTopicId: subTopicId,
        isCompleted: isChecked,
        completedAt: new Date().toISOString(),
        SecCode: localStorage.getItem("authToken"),
      });
    } catch (error) {
      console.error("Error updating subtopic status:", error);
    }
  };

  const handleTopicClick = (subTopic) => {
    localStorage.setItem(
      "explainTopic",
      JSON.stringify({
        title: subTopic.subTopicname,
        description: subTopic.subTopicPointsWiseDescription,
        _id: subTopic._id,
      })
    );
   // navigate("/explain-topic");
  };

  const isTopicCompleted = (topic) => {
    return topic.subTopics.every((subTopic) => subTopic.isCompleted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!studyPlanData) {
    return (
      <div className="flex justify-center items-center h-screen">
        No study plan found
      </div>
    );
  }

  const calculateOverallProgress = () => {
    return (studyPlanData.currentPoints / studyPlanData.totalPoints) * 100;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardBody>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                My {studyPlanData.language.toUpperCase()} Roadmap
              </h1>
              <div className="flex gap-2 items-center">
                <Chip color="primary" variant="flat">
                  {studyPlanData.language}
                </Chip>
                <Chip color="secondary" variant="flat">
                  {studyPlanData.difficultyLevel}
                </Chip>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaClock className="text-default-500" />
                <span>{studyPlanData.timecanSpentDaily} hours/day</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBook className="text-default-500" />
                <span>{studyPlanData.duration} weeks</span>
              </div>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(calculateOverallProgress())}%</span>
            </div>
            <Progress
              value={calculateOverallProgress()}
              color="primary"
              className="w-full"
            />
            <div className="flex justify-between text-sm">
              <span>
                Points: {studyPlanData.currentPoints}/
                {studyPlanData.totalPoints}
              </span>
              <span>
                Start Date:{" "}
                {new Date(studyPlanData.startDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      <Accordion variant="bordered" className="gap-4">
        {studyPlanData.studyPlan.map((topic) => (
          <AccordionItem
            key={topic._id}
            aria-label={topic.topic}
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Checkbox
                    isSelected={isTopicCompleted(topic)}
                    isDisabled
                    className="mr-2"
                    color="success"
                    classNames={{
                      base: isTopicCompleted(topic) ? "text-success" : "",
                    }}
                  />
                  <span>{topic.topic}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Chip color="warning" variant="flat" size="sm">
                    {topic.difficulty}
                  </Chip>
                  <Chip color="primary" variant="flat" size="sm">
                    {topic.earnedPoints}/{topic.pointsToEarn} points
                  </Chip>
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              {topic.subTopics.map((subTopic) => (
                <Card key={subTopic._id} className="w-full">
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          color="success"
                          isSelected={subTopic.isCompleted}
                          onValueChange={(checked) =>
                            handleSubTopicCheck(
                              topic.topicid,
                              subTopic.subTopicId,
                              checked
                            )
                          }
                          className="mr-2"
                          classNames={{
                            base: "text-success",
                          }}
                        />
                        <div>
                          <div
                            
                            className="font-medium text-md hover:text-success text-success cursor-pointer"
                          >
                            {subTopic.subTopicname}
                          </div>
                          <p className="text-sm text-default-500">
                            {subTopic.subTopicPointsWiseDescription}
                          </p>
                          {subTopic.completedAt && (
                            <p className="text-xs text-danger-600 mt-1 font-thin">
                              Expected to complete:{" "}
                              {new Date(
                                subTopic.completedAt
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Chip color="success" variant="flat" size="sm">
                          {subTopic.points} points
                        </Chip>
                        {subTopic.completedAt && (
                          <FaCheckCircle className="text-success" />
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MyStudyPlan;
