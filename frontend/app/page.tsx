"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "../components/LoadingSpinner";
import ProgressBar from "../components/ProgressBar";
import ScoreDisplay from "../components/ScoreDisplay";
import Footer from "../components/Footer";
import { ApiService } from "./services/api";
import { Question } from "@/types/types";
import { FaJetFighterUp } from "react-icons/fa6";
import { TbMilitaryAward } from "react-icons/tb";
import { PiAirplaneTakeoffBold } from "react-icons/pi";
import { APP_NAME } from "@/data/constants";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(50);

  // Fetch questions and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [questionsData, categoriesData] = await Promise.all([
          ApiService.getQuestions(1, pageSize),
          ApiService.getCategories(),
        ]);
        setQuestions(questionsData.questions);
        setTotalQuestions(questionsData.total);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pageSize]);

  const startQuiz = () => {
    setGameStarted(true);
    setScore(0);
    setQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setSelectedOption(null);
    setShowExplanation(false);
    setShowScore(false);
    setIsRandomMode(false);
    setSelectedDifficulty(null);
    setCurrentPage(1);
  };

  const startRandomQuiz = async () => {
    setIsLoading(true);
    try {
      const randomQuestion = await ApiService.getRandomQuestion();
      if (randomQuestion) {
        setQuestions([randomQuestion]);
        setGameStarted(true);
        setScore(0);
        setTotalQuestions(1);
        setQuestionIndex(0);
        setCurrentQuestion(randomQuestion);
        setSelectedOption(null);
        setShowExplanation(false);
        setShowScore(false);
        setIsRandomMode(true);
        setSelectedDifficulty(null);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error starting random quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuizByCategory = async (categoryId: number) => {
    setIsLoading(true);
    try {
      const categoryData = await ApiService.getQuestionsByCategory(
        categoryId,
        1,
        pageSize
      );
      if (categoryData.questions.length > 0) {
        setQuestions(categoryData.questions);
        setTotalQuestions(categoryData.total);
        setSelectedCategory(categoryId);
        setGameStarted(true);
        setScore(0);
        setQuestionIndex(0);
        setCurrentQuestion(categoryData.questions[0]);
        setSelectedOption(null);
        setShowExplanation(false);
        setShowScore(false);
        setIsRandomMode(false);
        setSelectedDifficulty(null);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error starting category quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuizByDifficulty = async (difficulty: string) => {
    setIsLoading(true);
    try {
      const difficultyData = await ApiService.getQuestionsByDifficulty(
        difficulty,
        1,
        pageSize
      );
      if (difficultyData.questions.length > 0) {
        setQuestions(difficultyData.questions);
        setTotalQuestions(difficultyData.total);
        setSelectedDifficulty(difficulty);
        setGameStarted(true);
        setScore(0);
        setQuestionIndex(0);
        setCurrentQuestion(difficultyData.questions[0]);
        setSelectedOption(null);
        setShowExplanation(false);
        setShowScore(false);
        setIsRandomMode(false);
        setSelectedCategory(null);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error starting difficulty quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreQuestions = async () => {
    if (isRandomMode) return; // No pagination for random mode

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      let newQuestions: Question[] = [];

      if (selectedCategory) {
        const categoryData = await ApiService.getQuestionsByCategory(
          selectedCategory,
          nextPage,
          pageSize
        );
        newQuestions = categoryData.questions;
      } else if (selectedDifficulty) {
        const difficultyData = await ApiService.getQuestionsByDifficulty(
          selectedDifficulty,
          nextPage,
          pageSize
        );
        newQuestions = difficultyData.questions;
      } else {
        const allData = await ApiService.getQuestions(nextPage, pageSize);
        newQuestions = allData.questions;
      }

      if (newQuestions.length > 0) {
        setQuestions((prev) => [...prev, ...newQuestions]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (optionId: number) => {
    if (selectedOption !== null) return; // Prevent multiple selections

    setSelectedOption(optionId);
    const option = currentQuestion?.options[optionId]; // Use index directly instead of finding by id

    if (option?.correct) {
      setScore(prevScore => prevScore + 1); // Use functional update to ensure we have latest score
    }

    setTimeout(() => setShowExplanation(true), 1000);
  };

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      setShowScore(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "E":
        return "bg-green-500";
      case "M":
        return "bg-yellow-500";
      case "H":
        return "bg-red-500";
      default:
        return "bg-nasa-blue";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "E":
        return "Easy";
      case "M":
        return "Medium";
      case "H":
        return "Hard";
      default:
        return "Unknown";
    }
  };

  const renderHtmlContent = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-panel-bg border-b-2 border-nasa-blue shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-nasa-blue to-nasa-red rounded-full flex items-center justify-center nasa-glow">
                  <span className="text-white text-2xl font-bold font-display">
                    <FaJetFighterUp />
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white font-display">
                  {APP_NAME}
                </h1>
              </div>
              <div className="text-sm text-gray-400">Ready for Launch</div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-white mb-4 font-display inline-flex">
                Welcome to {APP_NAME}! &nbsp; &nbsp;
                {[
                  <FaJetFighterUp />,
                  <TbMilitaryAward />,
                  <PiAirplaneTakeoffBold />,
                ].map((icon, index) => (
                  <span key={index} className="mr-2">{icon} &nbsp; &nbsp;</span>
                ))}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Prepare for deployment! Test your knowledge about NASA missions,
                military aviation, and space exploration in our advanced
                training simulation!
              </p>
            </div>

            {/* Features 
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="panel-bg p-6 rounded-2xl shadow-lg border-2 border-nasa-blue hover-lift nasa-glow">
                <div className="text-4xl mb-4">M</div>
                <h3 className="text-xl font-bold text-white mb-2">Mission Training</h3>
                <p className="text-gray-300">Advanced simulation exercises for aviation and space operations</p>
              </div>
              <div className="panel-bg p-6 rounded-2xl shadow-lg border-2 border-military-green hover-lift nasa-glow">
                <div className="text-4xl mb-4">I</div>
                <h3 className="text-xl font-bold text-white mb-2">Intel Briefings</h3>
                <p className="text-gray-300">Classified information about aircraft, rockets, and space missions</p>
              </div>
              <div className="panel-bg p-6 rounded-2xl shadow-lg border-2 border-nasa-red hover-lift nasa-glow">
                <div className="text-4xl mb-4">P</div>
                <h3 className="text-xl font-bold text-white mb-2">Performance Metrics</h3>
                <p className="text-gray-300">Track your mission success rate and earn commendations</p>
              </div>
            </div>*/}

            {/* Category Selection */}
            {categories.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 font-display">
                  Select Mission Category
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => startQuizByCategory(category.id)}
                      className="panel-bg p-4 rounded-xl border-2 border-nasa-blue hover:border-nasa-red transition-all duration-200 hover-lift nasa-glow"
                    >
                      <div className="text-2xl mb-2">C</div>
                      <h4 className="text-lg font-bold text-white">
                        {category.title}
                      </h4>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Difficulty Selection */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 font-display">
                Select Mission Difficulty
              </h3>
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => startQuizByDifficulty("E")}
                  className="panel-bg p-4 rounded-xl border-2 border-green-500 hover:border-green-400 transition-all duration-200 hover-lift nasa-glow"
                >
                  {/* <div className="text-2xl mb-2">E</div> */}
                  <h4 className="text-lg font-bold text-white">Easy</h4>
                  <p className="text-sm text-gray-400">Basic Training</p>
                </button>
                <button
                  onClick={() => startQuizByDifficulty("M")}
                  className="panel-bg p-4 rounded-xl border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-200 hover-lift nasa-glow"
                >
                  {/* <div className="text-2xl mb-2">M</div> */}
                  <h4 className="text-lg font-bold text-white">Medium</h4>
                  <p className="text-sm text-gray-400">Advanced Training</p>
                </button>
                <button
                  onClick={() => startQuizByDifficulty("H")}
                  className="panel-bg p-4 rounded-xl border-2 border-red-500 hover:border-red-400 transition-all duration-200 hover-lift nasa-glow"
                >
                  {/* <div className="text-2xl mb-2">H</div> */}
                  <h4 className="text-lg font-bold text-white">Hard</h4>
                  <p className="text-sm text-gray-400">Elite Training</p>
                </button>
              </div>
            </div>

            {/* Quick Mission Options */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 font-display">
                Quick Mission Options
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <button
                  onClick={startRandomQuiz}
                  className="panel-bg p-4 rounded-xl border-2 border-accent hover:border-accent/80 transition-all duration-200 hover-lift nasa-glow flex-1"
                >
                  {/* <div className="text-2xl mb-2">R</div> */}
                  <h4 className="text-lg font-bold text-white">
                    Random Mission
                  </h4>
                  <p className="text-sm text-gray-400">Surprise Challenge</p>
                </button>
                <button
                  onClick={startQuiz}
                  className="panel-bg p-4 rounded-xl border-2 border-nasa-blue hover:border-nasa-red transition-all duration-200 hover-lift nasa-glow flex-1"
                >
                  {/* <div className="text-2xl mb-2">F</div> */}
                  <h4 className="text-lg font-bold text-white">Full Mission</h4>
                  <p className="text-sm text-gray-400">Complete Training</p>
                </button>
              </div>
            </div>

            {/* Start Button - Updated */}
            <button
              onClick={startQuiz}
              className="military-btn text-white text-2xl font-bold py-6 px-12 rounded-full shadow-lg hover-lift transform hover:scale-105 transition-all duration-200 font-display nasa-glow"
            >
              Launch Full Training Mission
            </button>

            {/* Instructions */}
            {/* <div className="mt-12 panel-bg p-6 rounded-2xl shadow-lg border-2 border-nasa-blue max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-nasa-blue mb-4">
                Mission Protocol:
              </h3>
              <ul className="text-left text-gray-300 space-y-2">
                <li>• Review mission objectives carefully</li>
                <li>• Select the correct response from available options</li>
                <li>• Study mission debriefing after each exercise</li>
                <li>• Achieve maximum mission success rate!</li>
              </ul>
            </div> */}
          </div>
        </main>
      </div>
    );
  }

  // Quiz Interface
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-panel-bg border-b-2 border-nasa-blue shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-nasa-blue to-nasa-red rounded-full flex items-center justify-center nasa-glow">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <h1 className="text-3xl font-bold text-white font-display">
                {APP_NAME}
              </h1>
              <span className="text-nasa-red font-bold text-sm">
                MISSION ACTIVE
              </span>
            </div>
            <div className="text-lg font-bold text-white">
              Mission Score: {score}/{totalQuestions}
            </div>
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentQuestion && (
          <div className="panel-bg rounded-2xl shadow-xl p-8 border-4 border-nasa-blue nasa-glow">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-400">
                  Mission Progress
                </span>
                <span className="text-sm font-medium text-nasa-blue">
                  {questionIndex + 1} of {questions.length} (Total:{" "}
                  {totalQuestions})
                </span>
              </div>
              <ProgressBar
                current={questionIndex + 1}
                total={questions.length}
              />

              {/* Pagination Info */}
              {!isRandomMode && totalQuestions > questions.length && (
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-400">
                    Showing page {currentPage} of{" "}
                    {Math.ceil(totalQuestions / pageSize)}
                  </span>
                </div>
              )}
            </div>

            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {/* <span className="text-2xl">M</span> */}
                <span className="text-lg text-gray-400">
                  Mission {questionIndex + 1} of {questions.length}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                {/* Active Mode Indicator */}
                <div className="text-xs text-gray-400">
                  {isRandomMode && (
                    <span className="bg-accent text-black px-2 py-1 rounded">
                      RANDOM
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="bg-nasa-blue text-white px-2 py-1 rounded">
                      CATEGORY
                    </span>
                  )}
                  {selectedDifficulty && (
                    <span className="bg-nasa-red text-white px-2 py-1 rounded">
                      {selectedDifficulty === "E"
                        ? "EASY"
                        : selectedDifficulty === "M"
                        ? "MEDIUM"
                        : "HARD"}
                    </span>
                  )}
                  {!isRandomMode &&
                    !selectedCategory &&
                    !selectedDifficulty && (
                      <span className="bg-military-green text-white px-2 py-1 rounded">
                        FULL
                      </span>
                    )}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getDifficultyColor(
                    currentQuestion.difficulty
                  )}`}
                >
                  {getDifficultyText(currentQuestion.difficulty)}
                </div>
              </div>
            </div>

            {/* Category */}
            {currentQuestion.category.length > 0 && (
              <div className="mb-4">
                <span className="bg-nasa-blue bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium border border-nasa-blue">
                  {currentQuestion.category[0].title}
                </span>
              </div>
            )}

            {/* Question Source */}
            {currentQuestion.question_source && (
              <div className="mb-4">
                <span className="text-sm text-gray-400 italic">
                  Source: {currentQuestion.question_source}
                </span>
              </div>
            )}

            {/* Question Text */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white leading-relaxed font-display">
                {renderHtmlContent(currentQuestion.question_text)}
              </h2>
            </div>

            {/* Question Images */}
            {currentQuestion.images.length > 0 && (
              <div className="mb-6">
                {currentQuestion.images.map((img, index) => (
                  <div key={index} className="mb-4">
                    <div className="bg-stealth-gray rounded-lg p-4 text-center border border-border-color">
                      <div className="relative">
                        <Image
                          src={img.image}
                          alt={img.caption}
                          width={400}
                          height={300}
                          className="rounded-lg mx-auto mb-2"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          onError={(e) => {
                            // Fallback if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const fallback =
                              target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "block";
                          }}
                        />
                        {/* Fallback text if image fails */}
                        <div
                          className="hidden text-gray-400 text-lg font-medium py-8"
                          style={{ display: "none" }}
                        >
                          Image: {img.caption}
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {renderHtmlContent(img.caption)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                  className={`w-full p-4 text-left rounded-xl border-4 transition-all duration-200 font-medium text-lg ${
                    selectedOption === index
                      ? option.correct
                        ? "border-success bg-success bg-opacity-20 text-black"
                        : "border-error bg-error bg-opacity-20 text-black"
                      : selectedOption !== null && option.correct
                      ? "border-success bg-success bg-opacity-20 text-black"
                      : "border-border-color bg-panel-bg hover:border-nasa-blue hover:bg-stealth-gray text-white"
                  } ${
                    selectedOption === null
                      ? "hover-lift cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        selectedOption === index
                          ? option.correct
                            ? "bg-success"
                            : "bg-error"
                          : "bg-stealth-gray"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div className="flex-1">
                      <span>{renderHtmlContent(option.option_text)}</span>
                      {/* Option Image if available */}
                      {option.image && (
                        <div className="mt-2">
                          <Image
                            src={option.image}
                            alt="Option image"
                            width={200}
                            height={150}
                            className="rounded-lg"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        </div>
                      )}
                    </div>
                    {selectedOption === index && (
                      <span className="ml-auto text-2xl">
                        {option.correct ? "Correct" : "Incorrect"}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-stealth-gray p-6 rounded-xl border-2 border-nasa-blue mb-6">
                <h3 className="text-xl font-bold text-nasa-blue mb-3 flex items-center">
                  {/* <span className="mr-2">Info</span>
                  Mission Debriefing */}
                  Explanation
                </h3>
                <div className="text-gray-300 leading-relaxed text-lg">
                  {renderHtmlContent(currentQuestion.explanation)}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setGameStarted(false)}
                className="px-6 py-3 bg-stealth-gray text-white rounded-lg hover:bg-border-color transition-colors font-medium border border-border-color"
              >
                Return to Base
              </button>

              {showExplanation && (
                <button
                  onClick={nextQuestion}
                  className="military-btn px-8 py-3 text-white rounded-lg hover-lift font-bold text-lg nasa-glow"
                >
                  {questionIndex < questions.length - 1
                    ? "Next Mission"
                    : "Mission Complete"}
                </button>
              )}
            </div>

            {/* Load More Questions Button */}
            {!isRandomMode && totalQuestions > questions.length && (
              <div className="mt-6 text-center">
                <button
                  onClick={loadMoreQuestions}
                  disabled={isLoading}
                  className="px-6 py-3 bg-nasa-blue text-white rounded-lg hover:bg-nasa-blue/80 transition-colors font-medium disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Load More Questions"}
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  {questions.length} of {totalQuestions} questions loaded
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Score Display Modal */}
      <ScoreDisplay score={score} total={totalQuestions} show={showScore} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
