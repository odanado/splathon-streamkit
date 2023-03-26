import { useState } from "react";
import { Input, Card, CardBody, CardHeader, Box, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const Index = () => {
  const [userId, setUserId] = useState("");

  const isInvalid = userId.length > 0 && !/[a-zA-Z][a-zA-Z0-9_-]+/.test(userId);
  const url = `/console/${userId}`;

  const pointerEvents = isInvalid ? "none" : "auto";

  return (
    <Box>
      <Card>
        <CardHeader>ユーザーIDを入力してください</CardHeader>
        <CardBody>
          <Input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="ユーザーID"
            isInvalid={isInvalid}
          />
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
