"use client"
import { Box, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { Watch } from "react-loader-spinner"
import { SuccessAnimation } from "./successAnimation"

export const TailorResume = () => {
    // const [showSpinner, setShowSpinner] = useState(true)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setShowSpinner(false)
    //     }, 8000)
    // }, [])

    return (
        <>
            {/* {showSpinner ? (
                // <Box className="flex flex-col items-center gap-2 justify-center" sx={{ height: 'calc(100vh - 80px)' }}>
                //     <Watch
                //         visible={true}
                //         height="80"
                //         width="80"
                //         radius="48"
                //         color="#2563EB"
                //         ariaLabel="watch-loading"
                //         wrapperStyle={{}}
                //         wrapperClass=""
                //     />
                //     <Typography variant="body2" color="text.secondary">
                //         Tailoring your resume...
                //     </Typography>
                // </Box>
            ) : ( */}
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
                                    Gaps Identified
                                </Typography>
                                <Box className="border border-gray-300 rounded-lg p-4 bg-gray-50" sx={{ minHeight: '400px' }}>
                                    <Box component="ul" className="pl-5 space-y-2" sx={{ listStyleType: 'disc' }}>
                                        <li>
                                            <Typography variant="body2" color="text.secondary">
                                                Missing cloud platform experience (AWS/GCP)
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="body2" color="text.secondary">
                                                No mention of scalable architecture design
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="body2" color="text.secondary">
                                                Limited leadership and mentoring examples
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography variant="body2" color="text.secondary">
                                                Missing cross-functional collaboration details
                                            </Typography>
                                        </li>
                                    </Box>
                                </Box>
                            </Box>

                            {/* New Resume Card */}
                            {/* <Box className="flex-1">
                                <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                                    Optimized Resume
                                </Typography>
                                <Box className="border border-gray-300 rounded-lg p-4 bg-white" sx={{ minHeight: '400px' }}>
                                    <Typography variant="body2" className="mb-3">
                                        <strong>Senior Software Engineer</strong>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="mb-2">
                                        • Led product development for scalable web applications serving 1M+ users
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="mb-2">
                                        • Architected cloud-native solutions on AWS using microservices
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="mb-2">
                                        • Mentored team of 5 engineers on best practices and code reviews
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="mb-2">
                                        • Collaborated with cross-functional teams to deliver features
                                    </Typography>
                                </Box>
                            </Box> */}
                        </Box>

                        <Box className="flex justify-center">
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
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