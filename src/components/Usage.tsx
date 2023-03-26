import {
  Card,
  CardHeader,
  CardBody,
  Box,
  OrderedList,
  ListItem,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

type Props = {
  userId: string;
};
export const Usage = ({ userId }: Props) => {
  const origin = window.location.origin;
  const url = `${origin}/overlay/${userId}`;
  return (
    <Card>
      <CardHeader>
        <Box>使い方</Box>
      </CardHeader>
      <CardBody>
        <OrderedList>
          <ListItem>{`${url} をクリップボードにコピー`}</ListItem>
          <ListItem>
            コピーした URL を横1920px、縦1080pxのブラウザソースとして OBS に登録
          </ListItem>
          <ListItem>この画面で名前やスコアを変更する</ListItem>
        </OrderedList>
      </CardBody>
    </Card>
  );
};
