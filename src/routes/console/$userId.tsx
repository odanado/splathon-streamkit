import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Input,
  Flex,
  Spacer,
  Link,
  Box,
  Container,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useFirestore } from "../../firebase";
import { useMatch } from "../../hooks/use-match";
import { matchSchema, type Match } from "../../schema/match";
import { TeamForm } from "../../components/TeamForm";
import { Team } from "../../schema/team";
import { Usage } from "../../components/Usage";

const Navbar = ({ userId }: { userId: string }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Box ml={3} fontSize="lg" fontWeight="bold">
          Splathon Stremkit
        </Box>
      </Flex>

      <Spacer />

      <Box>ようこそ、{userId}さん</Box>
    </Flex>
  );
};

const AppContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <Container maxW="container.xl" padding="1rem">
      {children}
    </Container>
  );
};

export const Console = () => {
  const { userId } = useParams();
  if (!userId) {
    throw new Error("userId is required");
  }
  const firestore = useFirestore();

  const { isLoading, match } = useMatch(userId ?? "");

  // TODO: suspense にする
  if (isLoading || !match) {
    return <div>loading...</div>;
  }

  const onChangeTeam = async (side: "alpha" | "bravo", team: Team) => {
    const ref = doc(firestore, "users", userId ?? "");

    const newMatch = {
      ...match,
      [side]: {
        ...team,
      },
    };

    matchSchema.parse(newMatch);

    // TODO: mutation にする
    await setDoc(ref, { match: newMatch });
  };

  return (
    <Box>
      <Navbar userId={userId} />
      <AppContainer>
        <Box mt={2}>
          <Alert status="warning">
            <AlertIcon />
            開発中のサービスです。バグがあるかもしれません。 他人の userId
            を入力すると他人のデータを変更できてしまいます！ご注意ください！
          </Alert>
        </Box>
        <Box mt={2}>
          <Usage userId={userId} />
        </Box>
        <Box mt={2}>
          <TeamForm
            side="アルファチーム"
            team={match.alpha}
            onChange={(team) => onChangeTeam("alpha", team)}
          />
        </Box>
        <Box mt={2}>
          <TeamForm
            side="ブラボーチーム"
            team={match.bravo}
            onChange={(team) => onChangeTeam("bravo", team)}
          />
        </Box>
      </AppContainer>
    </Box>
  );
};
