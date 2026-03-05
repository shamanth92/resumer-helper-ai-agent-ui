"use client"
import { Box, Typography, Card, Button, Chip } from "@mui/material"
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { JobDetailsDialog } from './jobDetailsDialog';
import { useState } from 'react';
import { TailorResume } from "./TailorResume";

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

const jobData: Job[] = [
    {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        jobType: 'Full-time',
        matchPercentage: 78.5,
        icon: '💼',
        description: "We're seeking a Senior Software Engineer to lead scalable web applications and mentor senior developers...",
        responsibilities: [
            'Lead product development',
            'Architect scalable solutions',
            'Mentor engineering team',
            'Collaborate with cross-functional teams'
        ],
        requirements: [
            '5+ years of software development experience',
            'Strong knowledge of React, Node.js, and TypeScript',
            'Experience with cloud platforms (AWS/GCP)',
            'Excellent communication skills'
        ]
    },
    {
        id: '2',
        title: 'Frontend Developer',
        company: 'InnovateX',
        location: 'Remote',
        jobType: 'Full-time',
        matchPercentage: 92.1,
        icon: '⚡',
        description: "Join our team to build cutting-edge user interfaces for our SaaS platform. Work remotely with a talented team...",
        responsibilities: [
            'Build responsive web applications',
            'Implement modern UI/UX designs',
            'Optimize application performance',
            'Write clean, maintainable code'
        ],
        requirements: [
            '3+ years of frontend development',
            'Expert in React and modern JavaScript',
            'Experience with CSS frameworks',
            'Strong attention to detail'
        ]
    },
    {
        id: '3',
        title: 'Staff Software Engineer',
        company: 'DataSys',
        location: 'San Francisco, CA',
        jobType: 'Full-time',
        matchPercentage: 56.1,
        icon: '🔷',
        description: "Lead technical initiatives and drive architectural decisions for our data platform. Work with large-scale systems...",
        responsibilities: [
            'Design system architecture',
            'Lead technical initiatives',
            'Code review and mentorship',
            'Define engineering best practices'
        ],
        requirements: [
            '8+ years of software engineering',
            'Experience with distributed systems',
            'Strong problem-solving skills',
            'Leadership experience'
        ]
    }
];

export const JobMatches = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [jobSelected, setJobSelected] = useState(false)

    const getMatchColor = (percentage: number) => {
        if (percentage >= 60) return { bg: '#dcfce7', text: '#16a34a' }; // green
        if (percentage >= 50) return { bg: '#fef9c3', text: '#ca8a04' }; // yellow
        return { bg: '#fed7aa', text: '#ea580c' }; // orange
    };

    const handleViewDetails = (job: Job) => {
        setSelectedJob(job);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const moveToTailorResume = () => {
        setJobSelected(true)
    }

    return (
        jobSelected ? <TailorResume /> : <Box className="flex items-center justify-center w-screen mt-10 mb-10">
            <Box className="w-[400px]">
                <Box className="mb-6">
                    <Typography variant="h5" fontWeight="bold">Top Job Matches</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Select a position to tailor your resume
                    </Typography>
                </Box>

                <Box className="flex flex-col gap-8">
                    {jobData.map((job) => (
                        <Card key={job.id} className="p-4 shadow-md">
                            <Box className="flex flex-col gap-3">
                                <Box className="flex items-start gap-3">
                                    <Box className="text-3xl">{job.icon}</Box>
                                    <Box className="flex-1">
                                        <Typography variant="h6" fontWeight="bold">
                                            {job.title}
                                        </Typography>
                                        <Box className="flex items-center gap-1 mt-1">
                                            <BusinessIcon fontSize="small" className="text-gray-600" />
                                            <Typography variant="body2" color="text.secondary">
                                                {job.company}
                                            </Typography>
                                        </Box>
                                        <Box className="flex items-center gap-1 mt-1">
                                            <LocationOnIcon fontSize="small" className="text-gray-600" />
                                            <Typography variant="body2" color="text.secondary">
                                                {job.location} • {job.jobType}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="flex items-center justify-between mt-3">
                                    <Chip
                                        label={`${job.matchPercentage}% Match`}
                                        size="medium"
                                        sx={{
                                            backgroundColor: getMatchColor(job.matchPercentage).bg,
                                            color: getMatchColor(job.matchPercentage).text,
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        onClick={() => handleViewDetails(job)}
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
                />
            )}
        </Box>
    );
};
