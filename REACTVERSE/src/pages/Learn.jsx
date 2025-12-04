import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";
import LessonHeading from "../components/lesson/LessonHeading";
import LessonContent from "../components/lesson/LessonContent";
import LessonImages from "../components/lesson/LessonImages";
import LessonCodeBlock from "../components/lesson/LessonCodeBlock";
import LessonQuiz from "../components/lesson/LessonQuiz";
import LessonNavigation from "../components/lesson/LessonNavigation";

export default function Learn() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshProgress } = useProgress();

  // QUIZ STATE
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [slideDir, setSlideDir] = useState("right");

  // FETCH MODULES + LESSONS
  useEffect(() => {
    fetch("http://localhost:5000/api/lessons/modules-with-lessons")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setModules(d.data);

          if (!lessonId && d.data.length > 0) {
            const first = d.data[0].lessons[0].lessonId;
            navigate(`/lesson/${first}`, { replace: true });
          }
        }
      })
      .catch(console.error);
  }, [lessonId]);

  // FETCH LESSON
  useEffect(() => {
    if (!lessonId) return;

    setLoading(true);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);

    fetch(`http://localhost:5000/api/lessons/lesson/${lessonId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setLesson(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [lessonId]);

  // FLATTEN ALL LESSONS FOR PREV/NEXT
  const getAdjacent = () => {
    let flat = [];
    modules.forEach((m) => m.lessons.forEach((l) => flat.push(l)));

    const idx = flat.findIndex((l) => l.lessonId === lessonId);

    return {
      prev: idx > 0 ? flat[idx - 1] : null,
      next: idx < flat.length - 1 ? flat[idx + 1] : null,
    };
  };

  const { prev, next } = getAdjacent();

  async function markLessonComplete() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?._id) return;

    await fetch("http://localhost:5000/api/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        moduleId: lesson.lesson.moduleId, // <-- you have this in lesson object
        lessonId: lessonId,
      }),
    });
    refreshProgress();
  }

  const loadingUI = (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin h-16 w-16 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
    </div>
  );

  if (loading) return loadingUI;

  if (!lesson)
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-gray-400">Lesson Not Found</h1>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <LessonHeading
        moduleOrder={lesson.moduleOrder}
        lessonNumber={lesson.lesson.lessonNumber}
        title={lesson.lesson.title}
        subtopic={lesson.lesson.subtopic}
      />

      <LessonContent content={lesson.lesson.content} />

      <LessonImages images={lesson.lesson.images} />

      <LessonCodeBlock codeBlocks={lesson.lesson.codeBlocks} />

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

      <LessonNavigation
        prev={prev}
        next={next}
        navigateNext={() => {
          markLessonComplete();
          navigate(`/lesson/${next.lessonId}`);
        }}
        navigatePrev={() => navigate(`/lesson/${prev.lessonId}`)}
        onComplete={() => {
          markLessonComplete();
          alert("Congratulations on completing all the lesson!");
        }}
      />
    </div>
  );
}
