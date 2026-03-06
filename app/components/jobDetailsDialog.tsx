"use client"
import { Dialog, DialogContent, DialogActions, Box, Typography, Button, IconButton, Tabs, Tab } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import { useState } from 'react';

interface JobDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    job: any;
    userJobSelected: (threadId: string) => void;
    threadId: string;
    selectedJobIndex: number;
}

export const JobDetailsDialog = ({ open, onClose, job, userJobSelected, threadId, selectedJobIndex }: JobDetailsDialogProps) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const tailorResume = async () => {
        onClose()
        try {
            const requestBody = {
                selectedJobIndex: selectedJobIndex,
                threadId: threadId
            };

            const response = await fetch('/ai-agent-select-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Failed to process request');
            }

            const result = await response.json();
            console.log('Agent response:', result);
            userJobSelected(threadId)

        } catch (error) {
            console.error('Error calling agent:', error);

        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    maxHeight: '80vh'
                }
            }}
        >
            <Box className="p-6">
                <Box className="flex items-start justify-between mb-4">
                    <Box className="flex items-start gap-3">
                        <Box className="text-3xl"><img
                            src={job.employer_logo}
                            alt={job.employer_name}
                            className="w-full h-full object-contain"
                        /></Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {job.job_title}
                            </Typography>
                            <Box className="flex items-center gap-2 mt-1">
                                <BusinessIcon fontSize="small" className="text-gray-600" />
                                <Typography variant="body2" color="text.secondary">
                                    {job.employer_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    • {job.job_location}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        mb: 3
                    }}
                >
                    <Tab label="Job Description" sx={{ textTransform: 'none' }} />
                    <Tab label="Responsibilities" sx={{ textTransform: 'none' }} />
                    <Tab label="Qualifications" sx={{ textTransform: 'none' }} />
                </Tabs>

                <DialogContent sx={{ p: 0, maxHeight: '400px', overflowY: 'auto' }}>
                    {selectedTab === 0 && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" className="mb-2">
                                About the Role
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {job.job_description}
                            </Typography>
                        </Box>
                    )}

                    {selectedTab === 1 && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                                Key Responsibilities
                            </Typography>
                            <Box component="ul" className="pl-5 space-y-2 mt-3" sx={{ listStyleType: 'disc' }}>
                                {job.job_highlights?.Responsibilities.map((item, index) => (
                                    <li key={index}>
                                        <Typography variant="body2" color="text.secondary">
                                            {item}
                                        </Typography>
                                    </li>
                                ))}
                            </Box>
                        </Box>
                    )}

                    {selectedTab === 2 && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                                Qualifications
                            </Typography>
                            <Box component="ul" className="pl-5 space-y-2 mt-3" sx={{ listStyleType: 'disc' }}>
                                {job.job_highlights?.Qualifications?.map((item, index) => (
                                    <li key={index}>
                                        <Typography variant="body2" color="text.secondary">
                                            {item}
                                        </Typography>
                                    </li>
                                ))}
                            </Box>
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{ p: 0, mt: 4 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{ textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#2563EB',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#1e40af'
                            }
                        }}
                        onClick={tailorResume}
                    >
                        Choose This Job
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
