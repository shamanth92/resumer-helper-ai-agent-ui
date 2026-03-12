# Resume Helper AI

An intelligent resume tailoring application that uses AI agents to analyze your resume, search for matching jobs, and automatically optimize your resume for specific job postings.

## Features

- **Resume Analysis**: Upload your resume and get AI-powered analysis
- **Job Search**: Automatically search for relevant jobs based on your profile
- **Gap Analysis**: Identify missing skills and keywords to improve your resume
- **Resume Tailoring**: Generate optimized resumes tailored to specific job postings
- **Real-time Status Updates**: Track the AI agent's progress through various stages
- **Job Matching**: Get ranked job matches with similarity scores
- **Download Optimized Resume**: Download your tailored resume as a DOCX

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **UI Components**: Material-UI (MUI), Tailwind CSS
- **Form Management**: React Hook Form
- **Animations**: react-loader-spinner
- **Backend**: Next.js API Routes
- **AI Agent**: TypeScript backend (separate service)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- TypeScript backend service running on `http://localhost:5000`

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-helper-ui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── components/
│   ├── header.tsx              # Application header
│   ├── jobSelection.tsx        # Job search form with React Hook Form
│   ├── jobMatches.tsx          # Display ranked job matches
│   ├── jobDetailsDialog.tsx    # Job details modal
│   ├── TailorResume.tsx        # Resume tailoring results
│   └── successAnimation.tsx    # Success animation component
├── ai-agent/
│   └── route.ts                # AI agent API endpoints (GET/POST)
├── ai-agent-select-job/
│   └── route.ts                # Job selection API endpoint
├── util/
│   └── loadingStates.ts        # Loading state constants
└── page.tsx                    # Main application page

```

## API Endpoints

### POST `/ai-agent`
Start the AI agent to analyze resume and search for jobs.

**Request Body:**
```json
{
  "resumeText": "string",
  "job": "string",
  "jobType": "string",
  "jobLocation": "string"
}
```

**Response:**
```json
{
  "threadId": "string",
  "rankedJobs": []
}
```

### GET `/ai-agent?threadId={threadId}`
Poll the agent status to check progress.

**Response:**
```json
{
  "status": "running | parsing_resume | searching_jobs | gap_analysis | ranking_jobs | tailoring_resume | waiting_for_input | completed | failed",
  "data": {
    "rankedJobs": [],
    "gapAnalysis": {
      "matchingSkills": [],
      "missingSkills": [],
      "keywordsToAdd": [],
      "experienceAlignment": "string"
    },
    "outputPath": "string (S3 signed URL)"
  }
}
```

### POST `/ai-agent-select-job`
Select a job and trigger resume tailoring.

**Request Body:**
```json
{
  "threadId": "string",
  "selectedJobIndex": "number"
}
```

## Agent Status Flow

1. **running** - Agent started
2. **parsing_resume** - Parsing the uploaded resume
3. **searching_jobs** - Searching for matching jobs
4. **gap_analysis** - Performing gap analysis
5. **ranking_jobs** - Ranking jobs by relevance
6. **waiting_for_input** - Waiting for user to select a job
7. **tailoring_resume** - Tailoring resume for selected job
8. **completed** - Process completed successfully
9. **failed** - Process failed

## Key Features Implementation

### Polling Mechanism
The application uses a polling mechanism to check the AI agent's status every 3 seconds:
- Initial polling starts after the POST request to `/ai-agent`
- Continues until status reaches `waiting_for_input`
- Resumes after job selection until status reaches `completed`

### Gap Analysis Display
The gap analysis shows:
- **Matching Skills**: Skills that align with the job
- **Missing Skills**: Skills you need to add
- **Keywords to Add**: ATS-friendly keywords
- **Experience Alignment**: How your experience matches

### Resume Download
The tailored resume is downloaded using a signed S3 URL provided by the backend.

## Environment Variables

Add the environment variable for the backend API URL - AGENT_URL=https://resume-helper-agent.onrender.com

## Build

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## Deploy on Vercel

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables if needed
4. Deploy

