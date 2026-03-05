import { Box, Typography } from "@mui/material"
import AssistantIcon from '@mui/icons-material/Assistant';

export const Header = () => {
    return (
        <Box className="w-screen h-20 bg-white border-b-2 border-gray-200 flex items-center">
            <Box className="flex items-center gap-2 pl-4">
                <AssistantIcon fontSize="large" className="text-blue-600" />
                <Box className="flex items-center">
                    <Typography fontSize={24} fontWeight="bold">Resume</Typography>
                    <Typography className="text-blue-600" fontSize={24} fontWeight="bold">AI</Typography>
                </Box>
            </Box>

        </Box>
    )
}