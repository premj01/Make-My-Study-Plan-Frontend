import React, { useState, useEffect, useContext } from "react";
import {
  RadioGroup,
  Radio,
  Button,
  Card,
  CardBody,
  CardHeader,
  Progress,
  Spinner,
} from "@heroui/react";
import {
  FaQuestionCircle,
  FaCheckCircle,
  FaClock,
  FaBrain,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hostname from "../utils/hostname";
import StudyPlanContext from "../contextProvider/StudyPlanContext";
import { LoaderComponent } from "../LoaderComponent";

export const AskQuestion = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { studyPlan, setStudyPlan, studyPlanId, setStudyPlanId } =
    useContext(StudyPlanContext);

  useEffect(() => {
    setIsLoading(true);
    const storedQuestions = localStorage.getItem("questions");
    const storedUuid = localStorage.getItem("uuid");
    const storedEmail = localStorage.getItem("email");

    if (!storedQuestions || !storedUuid || !storedEmail) {
      navigate("/dashboard");
      return;
    }
    setIsLoading(false);
    try {
      setIsLoading(true);
      const parsedQuestions = JSON.parse(storedQuestions);
      setQuestions(parsedQuestions);
      setSelectedAnswers(new Array(parsedQuestions.length).fill(""));
      setIsLoading(false);
    } catch (error) {
      setError("Failed to parse questions");
      setIsLoading(false);
    }
  }, [navigate]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const authToken = localStorage.getItem("authToken");
      const email = localStorage.getItem("email");
      const uuid = localStorage.getItem("uuid");

      if (!authToken || !email || !uuid) {
        setError("Missing required information");
        return;
      }

      const formattedAnswers = questions.map((q, index) => ({
        Question: q.Question,
        answer: selectedAnswers[index],
      }));

      const response = await axios.post(
        `${hostname}/get-study-plan`,
        {
          SecCode: authToken,
          email: email,
          uuid: uuid,
          answers: formattedAnswers,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store study plan in context
      setStudyPlan(response.data.studyPlan);
      setStudyPlanId(response.data.id);
      localStorage.setItem("studyPlanId", response.data.id);
      localStorage.setItem(
        "studyPlan",
        JSON.stringify(response.data.studyPlan)
      );

      // Clear localStorage
      localStorage.removeItem("questions");
      localStorage.removeItem("uuid");
      localStorage.removeItem("lang");
      localStorage.removeItem("level");

      // Navigate to study plans
      navigate("/my-study-plan");
    } catch (error) {
      setError("Failed to submit answers");
      console.error("Error submitting answers:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoaderComponent message="Loading Questions..." />;
  }

  if (error) {
    return (
      <main className="dark text-foreground bg-background min-h-screen p-8">
        <div className="text-center text-danger">{error}</div>
      </main>
    );
  }

  return (
    <main className="dark text-foreground bg-background min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaBrain className="text-primary" />
            Skill Verification
          </h1>
          <p className="text-default-500 mt-2">
            Answer the following questions to verify your skill level
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-default-500">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-default-500">
              {Math.round(
                ((currentQuestionIndex + 1) / questions.length) * 100
              )}
              %
            </span>
          </div>
          <Progress
            value={((currentQuestionIndex + 1) / questions.length) * 100}
            color="primary"
            className="w-full"
          />
        </div>

        {/* Question Card */}
        {questions.length > 0 && (
          <Card className="mb-8">
            <CardHeader className="flex gap-3">
              <FaQuestionCircle className="text-primary text-xl" />
              <div className="flex flex-col">
                <p className="text-md">Question {currentQuestionIndex + 1}</p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mb-6">
                <h2 className="text-xl mb-4">
                  {questions[currentQuestionIndex].Question}
                </h2>
                <RadioGroup
                  value={selectedAnswers[currentQuestionIndex]}
                  onValueChange={handleAnswerSelect}
                  className="gap-4"
                >
                  {questions[currentQuestionIndex].options.map(
                    (option, index) => (
                      <Radio key={index} value={option}>
                        {option}
                      </Radio>
                    )
                  )}
                </RadioGroup>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  color="default"
                  variant="flat"
                  disabled={currentQuestionIndex === 0}
                  onPress={() => setCurrentQuestionIndex((prev) => prev - 1)}
                >
                  Previous
                </Button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    color="primary"
                    onPress={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    disabled={!selectedAnswers[currentQuestionIndex]}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onPress={handleSubmit}
                    disabled={
                      selectedAnswers.some((answer) => !answer) || submitting
                    }
                    startContent={<FaCheckCircle />}
                  >
                    {submitting ? "Submitting..." : "Submit All Answers"}
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Question Navigation */}
        <div className="flex gap-2 justify-center">
          {questions.map((_, index) => (
            <Button
              key={index}
              size="sm"
              color={
                currentQuestionIndex === index
                  ? "primary"
                  : selectedAnswers[index]
                  ? "success"
                  : "default"
              }
              variant={currentQuestionIndex === index ? "solid" : "flat"}
              onPress={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
      {submitting && <LoaderComponent message="Generating Study Plan..." />}
    </main>
  );
};
