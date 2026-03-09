"use client"
import { Box, Typography, Card, Button, Chip } from "@mui/material"
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { JobDetailsDialog } from './jobDetailsDialog';
import { useState } from 'react';
import { TailorResume } from "./TailorResume";
import { Watch } from "react-loader-spinner";
import { LOADING_STATES } from "../util/loadingStates";

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    jobType: string;
    matchPercentage: number;
    icon: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
}

export const JobMatches = ({ rankedJobs, threadId }: { rankedJobs: any[], threadId: string }) => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [jobSelected, setJobSelected] = useState(false)
    const [selectedJobIndex, setSelectedJobIndex] = useState<number>(0)
    const [showSpinner, setShowSpinner] = useState(true)
    const [agentLoadingStatus, setAgentLoadingStatus] = useState<string>('')
    const [agentData, setAgentData] = useState<any>(null)


    const getMatchColor = (percentage: number) => {
        console.log('percentage: ', percentage, typeof percentage)
        if (percentage >= 50) return { bg: '#dcfce7', text: '#16a34a' }; // green
        if (percentage >= 40) return { bg: '#fef9c3', text: '#ca8a04' }; // yellow
        return { bg: '#fed7aa', text: '#ea580c' }; // orange
    };

    const handleViewDetails = (job: Job, index: number) => {
        setSelectedJob(job);
        setSelectedJobIndex(index + 1);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const moveToTailorResume = async (threadId: string) => {
        setJobSelected(true)
        setShowSpinner(true)
        if (threadId) {
            const pollAgentStatus = async () => {
                const getAgentStatus = await fetch(`/ai-agent?threadId=${threadId}`);
                const agentStatus = await getAgentStatus.json();
                console.log('Agent status:', agentStatus);
                setAgentLoadingStatus(agentStatus?.status || '');

                if (agentStatus?.status === 'completed') {
                    setShowSpinner(false);
                    setAgentData(agentStatus.data);
                    return true;
                }
                return false;
            };

            const intervalId = setInterval(async () => {
                const isDone = await pollAgentStatus();
                if (isDone) {
                    clearInterval(intervalId);
                }
            }, 3000);

            await pollAgentStatus();
        }
    }

    return (
        jobSelected ? (showSpinner ? <Box className="flex flex-col items-center gap-2 justify-center" sx={{ height: 'calc(100vh - 80px)' }}>
                    <Watch
                        visible={true}
                        height="80"
                        width="80"
                        radius="48"
                        color="#2563EB"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    <Typography variant="body2" color="text.secondary">
                       {LOADING_STATES[agentLoadingStatus as keyof typeof LOADING_STATES]}...
                    </Typography>
                </Box> : <TailorResume agentData={agentData} />) : <Box className="flex items-center justify-center w-screen mt-10 mb-10">
            <Box className="w-[400px]">
                <Box className="mb-6">
                    <Typography variant="h5" fontWeight="bold">Top Job Matches</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Select a position to tailor your resume
                    </Typography>
                </Box>

                <Box className="flex flex-col gap-8">
                    {rankedJobs.map((job: any, i: number) => (
                        <Card key={job.job_id} className="p-4 shadow-md">
                            <Box className="flex flex-col gap-3">
                                <Box className="flex items-start gap-3">
                                    <Box className="w-12 h-12 flex items-center justify-center">
                                        <img
                                            src={job.employer_logo}
                                            alt={job.employer_name}
                                            className="w-full h-full object-contain"
                                        />
                                    </Box>
                                    <Box className="flex-1">
                                        <Typography variant="h6" fontWeight="bold">
                                            {job.job_title}
                                        </Typography>
                                        <Box className="flex items-center gap-1 mt-1">
                                            <BusinessIcon fontSize="small" className="text-gray-600" />
                                            <Typography variant="body2" color="text.secondary">
                                                {job.employer_name}
                                            </Typography>
                                        </Box>
                                        <Box className="flex items-center gap-1 mt-1">
                                            <LocationOnIcon fontSize="small" className="text-gray-600" />
                                            <Typography variant="body2" color="text.secondary">
                                                {job.job_location} • {job.job_employment_types[0]}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex items-center justify-between mt-3">
                                    <Chip
                                        label={`${(job.similarity * 100).toFixed(0)}% Match`}
                                        size="medium"
                                        sx={{
                                            backgroundColor: getMatchColor(job.similarity * 100).bg,
                                            color: getMatchColor(job.similarity * 100).text,
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => handleViewDetails(job, i)}
                                        sx={{
                                            backgroundColor: '#2563EB',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: '#1e40af'
                                            }
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Box>

            {selectedJob && (
                <JobDetailsDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    job={selectedJob}
                    userJobSelected={moveToTailorResume}
                    threadId={threadId}
                    selectedJobIndex={selectedJobIndex}
                />
            )}
        </Box>
        );
};
