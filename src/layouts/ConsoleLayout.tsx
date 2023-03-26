import { Outlet, useParams } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { AppContainer } from "../components/AppContainer";
import { Box } from "@chakra-ui/react";

export const ConsoleLayout = () => {
  const { userId } = useParams();

  return (
    <Box>
      <Navbar userId={userId} />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </Box>
  );
};
