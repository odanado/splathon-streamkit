import { Container } from "@chakra-ui/react";

export const AppContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <Container maxW="container.xl" padding="1rem">
      {children}
    </Container>
  );
};
