import { useState } from "react";
import {
  Input,
  Card,
  CardBody,
  CardHeader,
  Box,
  Link,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useMatch } from "../hooks/use-match";
import { useFirestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Match } from "../schema/match";

export const Index = () => {
  const [userId, setUserId] = useState("");
  const firestore = useFirestore();

  const isInvalid =
    userId.length > 0 && !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(userId);
  const url = `/console/${userId}`;

  const { match } = useMatch(userId);
  const isExistUser = match !== undefined;
  const isError = isInvalid || isExistUser;

  const errorMessage = isInvalid
    ? "ユーザーIDは半角英字で始まりそれ移行は半角英数字と_と-を含めることができます"
    : isExistUser
    ? "ユーザーが存在します"
    : "";

  const helperText =
    !isError && userId.length === 0
      ? "ユーザーIDを入力してください"
      : "作成可能です";

  const pointerEvents = isInvalid || !isExistUser ? "none" : "auto";

  // TODO: write 系をどこかにまとめる
  const handleClick = async () => {
    const ref = doc(firestore, "users", userId);

    const defaultMatch: Match = {
      id: "0-0",
      alpha: {
        name: "Alpha",
        score: 0,
      },
      bravo: {
        name: "Bravo",
        score: 0,
      },
    };
    await setDoc(ref, { match: defaultMatch });
  };

  return (
    <Box>
      <Card>
        <CardHeader>ユーザー作成</CardHeader>
        <CardBody>
          <FormControl isInvalid={isError}>
            <Input
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="ユーザーID"
              isInvalid={isInvalid}
            />
            {isError ? (
              <FormErrorMessage>{errorMessage}</FormErrorMessage>
            ) : (
              <FormHelperText>{helperText}</FormHelperText>
            )}
            <Button
              colorScheme="blue"
              onClick={handleClick}
              mt={2}
              isDisabled={isError}
            >
              ユーザーを登録
            </Button>
          </FormControl>
          <Box mt={4}>
            <Link href={url} isExternal pointerEvents={pointerEvents}>
              コンソールへ移動 <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};
