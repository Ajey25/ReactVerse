import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";

import LessonHeading from "../components/lesson/LessonHeading";
import LessonContent from "../components/lesson/LessonContent";
import LessonImages from "../components/lesson/LessonImages";
import LessonCodeBlock from "../components/lesson/LessonCodeBlock";
import LessonQuiz from "../components/lesson/LessonQuiz";
import LessonNavigation from "../components/lesson/LessonNavigation";

import toast from "react-hot-toast";
import Commet from "react-loading-indicators/Commet";

export default function Learn() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { refreshProgress } = useProgress();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [lesson, setLesson] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  // QUIZ STATE
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [slideDir, setSlideDir] = useState("right");

  /* ----------------------------- FETCH MODULES ----------------------------- */
  useEffect(() => {
    fetch(`${BASE_URL}/api/lessons/modules-with-lessons`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setModules(d.data);

          if (!lessonId && d.data.length > 0) {
            const firstLesson = d.data[0].lessons[0].lessonId;
            navigate(`/lesson/${firstLesson}`, { replace: true });
          }
        }
      })
      .catch(console.error);
  }, [lessonId]);

  /* ------------------------------ FETCH LESSON ------------------------------ */
  useEffect(() => {
    if (!lessonId) return;

    setLoading(true);
    setLesson(null);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);

    fetch(`${BASE_URL}/api/lessons/lesson/${lessonId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setLesson(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lessonId]);

  /* --------------------------- PREV / NEXT LOGIC --------------------------- */
  const getAdjacent = () => {
    const flat = [];
    modules.forEach((m) => m.lessons.forEach((l) => flat.push(l)));

    const idx = flat.findIndex((l) => l.lessonId === lessonId);

    return {
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx < flat.length - 1 ? flat[idx + 1] : null,
    };
  };

  const { prev, next } = getAdjacent();

  /* ------------------------- MARK LESSON COMPLETE -------------------------- */
  async function markLessonComplete() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id || !lesson) return;

    const res = await fetch(`${BASE_URL}/api/progress/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        moduleId: lesson.lesson.moduleId,
        lessonId,
      }),
    });

    const data = await res.json();

    if (data.success && data.message === "Already completed") {
      toast.success("Already done. Legend behavior 😌");
    } else if (data.success) {
      toast.success("Lesson marked complete 🎉");
    } else {
      toast.error("Something went wrong ❌");
    }

    refreshProgress();
  }

  /* ------------------------------ LOADING UI ------------------------------ */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Commet color="#3b82f6" size="medium" />
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Commet color="#3b82f6" size="medium" />
      </div>
    );
  }

  /* ------------------------------- MAIN UI ------------------------------- */
  return (
    <div className="w-full flex justify-center">
      {/* 🔒 Width contract */}
      <div
        className="
        w-full
        max-w-auto
        sm:max-w-5xl
        px-4 sm:px-6
        py-4 sm:py-8
      "
      >
        <div className="space-y-6 sm:space-y-10">
          <LessonHeading
            moduleOrder={lesson.moduleOrder}
            lessonNumber={lesson.lesson.lessonNumber}
            title={lesson.lesson.title}
            subtopic={lesson.lesson.subtopic}
          />

          <LessonContent content={lesson.lesson.content} />

          {lesson.lesson.images?.length > 0 && (
            <LessonImages images={lesson.lesson.images} />
          )}

          {lesson.lesson.codeBlocks?.length > 0 && (
            <LessonCodeBlock codeBlocks={lesson.lesson.codeBlocks} />
          )}

          {lesson.lesson.quiz?.length > 0 && (
            <LessonQuiz
              quiz={lesson.lesson.quiz}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              answers={answers}
              setAnswers={setAnswers}
              slideDir={slideDir}
              setSlideDir={setSlideDir}
              showResults={showResults}
              setShowResults={setShowResults}
            />
          )}

          <LessonNavigation
            prev={prev}
            next={next}
            navigatePrev={() => prev && navigate(`/lesson/${prev.lessonId}`)}
            navigateNext={() => {
              markLessonComplete();
              next && navigate(`/lesson/${next.lessonId}`);
            }}
            onComplete={() => {
              markLessonComplete();
              toast.success("All lessons completed 🏆");
            }}
          />
        </div>
      </div>
    </div>
  );
}
