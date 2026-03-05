"use client"
import { Box, Typography, Card, TextField, Button, Select, MenuItem, ToggleButton, ToggleButtonGroup, CircularProgress } from "@mui/material"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

export const JobSelection = ({ setJobMatches }: { setJobMatches: (value: boolean) => void }) => {
    const [jobType, setJobType] = useState<string[]>([]);
    const [showProgress, setShowProgress] = useState(false);

    const handleJobTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newJobType: string[],
    ) => {
        setJobType(newJobType);
    };

    const findMatchingJobs = () => {
        setShowProgress(true)

        setTimeout(() => {
            setJobMatches(true)
            setShowProgress(false)

        }, 5000);
    }

    return (
        <Box className="flex items-center justify-center w-screen mt-10">
            <Card className="w-[400px] p-8 shadow-lg">
                <Box className="flex flex-col gap-6">
                    <Box className="flex flex-col gap-1">
                        <Typography variant="h5" fontWeight="bold">Tailor Your Resume</Typography>
                        <Typography variant="body2" color="text.secondary">Get personalized job matches</Typography>
                    </Box>

                    <Box className="flex flex-col gap-4">
                        <Box className="flex flex-col gap-2">
                            <Typography variant="body2" fontWeight="600">Paste Resume</Typography>
                            <TextField
                                multiline
                                rows={8}
                                placeholder="Drag & drop PDF or paste text"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box className="flex flex-col gap-2">
                            <Typography variant="body2" fontWeight="600">Job Title</Typography>
                            <TextField
                                placeholder="e.g. Senior Software Engineer"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box className="flex flex-col gap-2">
                            <Typography variant="body2" fontWeight="600">Location</Typography>
                            <TextField
                                placeholder="e.g. San Francisco, CA"
                                variant="outlined"
                                fullWidth
                            />
                        </Box>

                        <Box className="flex flex-col gap-2">
                            <Typography variant="body2" fontWeight="600">Job Type</Typography>
                            <ToggleButtonGroup
                                value={jobType}
                                onChange={handleJobTypeChange}
                                aria-label="job type"
                                fullWidth
                            >
                                <ToggleButton
                                    value="full-time"
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: '#2563EB',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1d4ed8',
                                            }
                                        }
                                    }}
                                >
                                    Full-time
                                </ToggleButton>
                                <ToggleButton
                                    value="remote"
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: '#2563EB',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1d4ed8',
                                            }
                                        }
                                    }}
                                >
                                    Remote
                                </ToggleButton>
                                <ToggleButton
                                    value="contract"
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: '#2563EB',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#1d4ed8',
                                            }
                                        }
                                    }}
                                >
                                    Internship
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Box>

                    {!showProgress && <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            backgroundColor: '#2563EB',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1e40af'
                            }
                        }}
                        fullWidth
                        onClick={findMatchingJobs}
                    >
                        Find Matching Jobs
                    </Button>}
                    {showProgress && <CircularProgress />}
                </Box>
            </Card>
        </Box>
    )
}