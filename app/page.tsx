"use client";
import { Header } from "./components/header";
import { JobMatchesData, JobSelection } from "./components/jobSelection";
import { JobMatches } from "./components/jobMatches";
import { useState } from "react";

export default function Home() {
  const [showJobMatches, setShowJobMatches] = useState(false);
  const [rankedJobs, setRankedJobs] = useState<any[]>([])
  const [threadId, setThreadId] = useState("")

  const allowJobSelection = (data: JobMatchesData) => {
    setShowJobMatches(data.isAvailable);
    setRankedJobs(data.rankedJobs)
    setThreadId(data.threadId)
  }

  return (
    <div>
      <Header />
      {!showJobMatches && <JobSelection setJobMatches={allowJobSelection} />}
      {showJobMatches && <JobMatches rankedJobs={rankedJobs} threadId={threadId}/>}
    </div>
  );
}
