// LevelPage.jsx
import { useParams } from "react-router-dom";
import InterviewPage from "./InterviewPage";
import AptitudePage from "./AptitudePage";
import CodingQuestionPage from "./CodingQuestionPage";

export default function LevelPage() {
  const { cardId } = useParams();

  if (cardId === "interview") return <InterviewPage />;
  if (cardId === "aptitude") return <AptitudePage />;
  if (cardId === "coding") return <CodingQuestionPage />;

  return (
    <div className="text-center p-10 text-red-500 text-xl">
      ❗ Invalid Category
    </div>
  );
}
