import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCalendarAlt,
  FaUsers,
  FaPalette,
  FaRocket,
  FaChartLine,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { Button, Card } from "@heroui/react";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthenticationContext } from "./contextProvider/AuthContext";

const Home = () => {
  const { isLogin } = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[600px] h-[600px] -top-32 -left-32 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-60"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[600px] h-[600px] -bottom-32 -right-32 bg-gradient-to-r from-blue-300 to-purple-300 dark:from-blue-700 dark:to-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-60"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-600 dark:to-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-50"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative isolate px-4 sm:px-6 pt-8">
        <div className="mx-auto max-w-5xl py-12 sm:py-20 lg:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="text-center"
          >
            {isLogin && (
              <motion.div
                variants={fadeInUp}
                className="mb-8 text-2xl sm:text-3xl font-medium text-foreground/80"
              >
                Welcome back,{" "}
                <span className="text-primary font-bold">{username}</span>! 👋
              </motion.div>
            )}

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient"
            >
              MakeMyPlan
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-xl sm:text-2xl leading-8 text-foreground/80"
            >
              Your Intelligent Study Companion for Structured Learning
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {!isLogin ? (
                <Button
                  size="lg"
                  color="secondary"
                  variant="shadow"
                  className="text-lg"
                  onPress={() => navigate("/signup")}
                >
                  Get Started <BsArrowRight className="inline-block ml-2" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  color="secondary"
                  variant="shadow"
                  className="text-lg"
                  onPress={() => navigate("/dashboard")}
                >
                  Dashboard <BsArrowRight className="inline-block ml-2" />
                </Button>
              )}
              {!isLogin ? (
                <Button
                  size="lg"
                  color="primary"
                  variant="bordered"
                  className="text-lg"
                  onPress={() => navigate("/login")}
                >
                  <FaRegUser className="mr-2" /> Sign In
                </Button>
              ) : (
                <Button
                  size="lg"
                  color="primary"
                  variant="bordered"
                  className="text-lg"
                  onPress={() => navigate("/leaderboard")}
                >
                  <FaRegUser className="mr-2" /> Leaderboard
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
        className="py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            className="mx-auto max-w-2xl lg:text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Why Choose MakeMyPlan?
            </h2>
            <p className="mt-6 text-lg leading-8 text-foreground/70">
              Experience a smarter way to plan and track your learning journey
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {[
                {
                  icon: FaRocket,
                  title: "Smart Scheduling",
                  description:
                    "AI-powered algorithms optimize your daily routine for maximum learning efficiency",
                },
                {
                  icon: FaUsers,
                  title: "Easy Collaboration",
                  description:
                    "Connect and share progress with fellow learners in your study journey",
                },
                {
                  icon: FaChartLine,
                  title: "Progress Analytics",
                  description:
                    "Track your growth with detailed insights and personalized recommendations",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="relative"
                >
                  <Card
                    className="p-6 h-full hover:scale-105 transition-transform duration-300"
                    isPressable
                  >
                    <dt className="text-xl font-semibold leading-7 flex items-center gap-3 mb-4">
                      <feature.icon className="text-3xl text-primary" />
                      {feature.title}
                    </dt>
                    <dd className="text-base leading-7 text-foreground/70">
                      {feature.description}
                    </dd>
                  </Card>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
