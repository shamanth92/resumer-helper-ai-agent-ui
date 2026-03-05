"use client";
import { Header } from "./components/header";
import { JobSelection } from "./components/jobSelection";
import { JobMatches } from "./components/jobMatches";
import { useState } from "react";

export default function Home() {
  const [showJobMatches, setShowJobMatches] = useState(false)

  const allowJobSelection = (data: boolean) => {
    setShowJobMatches(data)
  }

  return (
    <div>
      <Header />
      {!showJobMatches && <JobSelection setJobMatches={allowJobSelection} />}
      {showJobMatches && <JobMatches />}
    </div>
  );
}
