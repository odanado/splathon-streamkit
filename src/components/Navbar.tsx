import { Box, Flex, Spacer } from "@chakra-ui/react";

type Props = {
  userId?: string;
};

export const Navbar = ({ userId }: Props) => {
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
          Splathon Streamkit (β)
        </Box>
      </Flex>

      <Spacer />

      {userId && <Box>ようこそ、{userId}さん</Box>}
    </Flex>
  );
};
