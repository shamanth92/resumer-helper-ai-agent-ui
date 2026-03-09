"use client"
import { Box, Typography, Button } from "@mui/material"
import { SuccessAnimation } from "./successAnimation"

export const TailorResume = ({ agentData }: { agentData: any }) => {
    const handleDownloadResume = async () => {
        if (agentData?.outputPath) {
            try {
                const link = document.createElement('a');
                link.href = agentData.outputPath;
                link.download = 'tailored-resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error downloading resume:', error);
            }
        }
    };

    return (
        <>
            <Box className="flex items-center justify-center w-screen mt-10 mb-10">
                <Box className="w-[800px]">
                    <Box className="mb-6 flex flex-col gap-2 items-center">
                        <SuccessAnimation />
                        <Typography variant="h5" fontWeight="bold">Resume Tailored Successfully!</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Review the improvements and download your optimized resume
                        </Typography>
                    </Box>

                    <Box className="flex gap-4 mb-6">
                        {/* Gaps Card */}
                        <Box className="flex-1">
                            <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                                Gap Analysis
                            </Typography>
                            <Box className="border border-gray-300 rounded-lg p-4 bg-gray-50" sx={{ minHeight: '400px' }}>
                                {agentData?.gapAnalysis?.matchingSkills && agentData.gapAnalysis.matchingSkills.length > 0 && (
                                    <Box className="mb-4">
                                        <Typography variant="body2" fontWeight="600" className="mb-2">
                                            Matching Skills
                                        </Typography>
                                        <Box component="ul" className="pl-5 space-y-1" sx={{ listStyleType: 'disc' }}>
                                            {agentData.gapAnalysis.matchingSkills.map((skill: string, index: number) => (
                                                <li key={index}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {skill}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {agentData?.gapAnalysis?.missingSkills && agentData.gapAnalysis.missingSkills.length > 0 && (
                                    <Box className="mb-4">
                                        <Typography variant="body2" fontWeight="600" className="mb-2">
                                            Missing Skills
                                        </Typography>
                                        <Box component="ul" className="pl-5 space-y-1" sx={{ listStyleType: 'disc' }}>
                                            {agentData.gapAnalysis.missingSkills.map((skill: string, index: number) => (
                                                <li key={index}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {skill}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {agentData?.gapAnalysis?.keywordsToAdd && agentData.gapAnalysis.keywordsToAdd.length > 0 && (
                                    <Box className="mb-4">
                                        <Typography variant="body2" fontWeight="600" className="mb-2">
                                            Keywords to Add
                                        </Typography>
                                        <Box component="ul" className="pl-5 space-y-1" sx={{ listStyleType: 'disc' }}>
                                            {agentData.gapAnalysis.keywordsToAdd.map((keyword: string, index: number) => (
                                                <li key={index}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {keyword}
                                                    </Typography>
                                                </li>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {agentData?.gapAnalysis?.experienceAlignment && (
                                    <Box>
                                        <Typography variant="body2" fontWeight="600" className="mb-2">
                                            Experience Alignment
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {agentData.gapAnalysis.experienceAlignment}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                    </Box>

                    <Box className="flex justify-center">
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleDownloadResume}
                            sx={{
                                backgroundColor: '#2563EB',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#1e40af'
                                }
                            }}
                        >
                            Download New Resume
                        </Button>
                    </Box>
                </Box>
            </Box>
            {/* )} */}
        </>
    )
}