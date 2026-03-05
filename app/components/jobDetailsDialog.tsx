"use client"
import { Dialog, DialogContent, DialogActions, Box, Typography, Button, IconButton, Tabs, Tab } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import { useState } from 'react';

interface JobDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    job: {
        title: string;
        company: string;
        location: string;
        icon: string;
        description: string;
        responsibilities: string[];
        requirements: string[];
    };
    userJobSelected: () => void
}

export const JobDetailsDialog = ({ open, onClose, job, userJobSelected }: JobDetailsDialogProps) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const tailorResume = () => {
        onClose()
        userJobSelected()
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
                        <Box className="text-3xl">{job.icon}</Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {job.title}
                            </Typography>
                            <Box className="flex items-center gap-2 mt-1">
                                <BusinessIcon fontSize="small" className="text-gray-600" />
                                <Typography variant="body2" color="text.secondary">
                                    {job.company}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    • {job.location}
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
                                {job.description}
                            </Typography>
                        </Box>
                    )}

                    {selectedTab === 1 && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                                Key Responsibilities
                            </Typography>
                            <Box component="ul" className="pl-5 space-y-2 mt-3" sx={{ listStyleType: 'disc' }}>
                                {job.responsibilities.map((item, index) => (
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
                                {job.requirements.map((item, index) => (
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
