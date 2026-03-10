"use client";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Watch } from "react-loader-spinner";
import { LOADING_STATES } from "../util/loadingStates";

interface JobSelectionForm {
  resume: string;
  jobTitle: string;
  location: string;
  jobType: string[];
}

export interface JobMatchesData {
  threadId: string;
  isAvailable: boolean;
  rankedJobs: any[];
}

export const JobSelection = ({
  setJobMatches,
}: {
  setJobMatches: (value: JobMatchesData) => void;
}) => {
  const [showProgress, setShowProgress] = useState(false);
  const [agentLoadingStatus, setAgentLoadingStatus] = useState("Loading...");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JobSelectionForm>({
    defaultValues: {
      resume: "",
      jobTitle: "",
      location: "",
      jobType: [],
    },
  });

  const onSubmit = async (data: JobSelectionForm) => {
    console.log("Form data:", data);
    setShowProgress(true);

    try {
      const requestBody = {
        resumeText: data.resume,
        job: data.jobTitle,
        jobType: data.jobType[0],
        jobLocation: data.location,
      };

      const response = await fetch("/ai-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to process request");
      }

      const result = await response.json();
      console.log("Agent response:", result);
      if (result?.threadId) {
        const pollAgentStatus = async () => {
          const getAgentStatus = await fetch(
            `/ai-agent?threadId=${result.threadId}`,
          );
          const agentStatus = await getAgentStatus.json();
          console.log("Agent status:", agentStatus);
          setAgentLoadingStatus(agentStatus?.status || "Loading...");

          if (agentStatus?.status === "waiting_for_input") {
            setJobMatches({
              threadId: result.threadId,
              isAvailable: true,
              rankedJobs: agentStatus.data?.rankedJobs,
            });
            setShowProgress(false);
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

      // setJobMatches(true);
      // setShowProgress(false);
    } catch (error) {
      console.error("Error calling agent:", error);
      setShowProgress(false);
    }
  };

  return (
    <Box className="flex items-center justify-center w-screen mt-10">
      <Card className="w-[400px] p-8 shadow-lg">
        <Box className="flex flex-col gap-6">
          <Box className="flex flex-col gap-1">
            <Typography variant="h5" fontWeight="bold">
              Tailor Your Resume
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Get personalized job matches
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Box className="flex flex-col gap-2">
              <Typography variant="body2" fontWeight="600">
                Paste Resume
              </Typography>
              <Controller
                name="resume"
                control={control}
                rules={{ required: "Resume is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    rows={8}
                    placeholder="Drag & drop PDF or paste text"
                    variant="outlined"
                    fullWidth
                    error={!!errors.resume}
                    helperText={errors.resume?.message}
                  />
                )}
              />
            </Box>

            <Box className="flex flex-col gap-2">
              <Typography variant="body2" fontWeight="600">
                Job Title
              </Typography>
              <Controller
                name="jobTitle"
                control={control}
                rules={{ required: "Job title is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="e.g. Senior Software Engineer"
                    variant="outlined"
                    fullWidth
                    error={!!errors.jobTitle}
                    helperText={errors.jobTitle?.message}
                  />
                )}
              />
            </Box>

            <Box className="flex flex-col gap-2">
              <Typography variant="body2" fontWeight="600">
                Location
              </Typography>
              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="e.g. San Francisco, CA"
                    variant="outlined"
                    fullWidth
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                )}
              />
            </Box>

            <Box className="flex flex-col gap-2">
              <Typography variant="body2" fontWeight="600">
                Job Type
              </Typography>
              <Controller
                name="jobType"
                control={control}
                render={({ field }) => (
                  <ToggleButtonGroup
                    {...field}
                    onChange={(_, value) => field.onChange(value)}
                    aria-label="job type"
                    fullWidth
                  >
                    <ToggleButton
                      value="full-time"
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#2563EB",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#1d4ed8",
                          },
                        },
                      }}
                    >
                      Full-time
                    </ToggleButton>
                    <ToggleButton
                      value="remote"
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#2563EB",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#1d4ed8",
                          },
                        },
                      }}
                    >
                      Remote
                    </ToggleButton>
                    <ToggleButton
                      value="contract"
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#2563EB",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#1d4ed8",
                          },
                        },
                      }}
                    >
                      Contract
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Box>

            {!showProgress && (
              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#2563EB",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#1e40af",
                  },
                }}
                fullWidth
              >
                Find Matching Jobs
              </Button>
            )}
            {showProgress && (
              <Box className="flex  gap-3 justify-center items-center h-full">
                <Watch
                  visible={true}
                  height="60"
                  width="60"
                  radius="40"
                  color="#2563EB"
                  ariaLabel="watch-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                <Typography variant="body2" color="text.secondary">
                  {
                    LOADING_STATES[
                      agentLoadingStatus as keyof typeof LOADING_STATES
                    ]
                  }
                  ...
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
