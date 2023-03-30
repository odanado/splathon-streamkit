import { Alert, AlertIcon } from "@chakra-ui/react";

export const WarningForBeta = () => {
  return (
    <Alert status="warning">
      <AlertIcon />
      開発中のサービスです。バグがあるかもしれません。
      <br />
      他人の userId
      を入力すると他人のデータを変更できてしまいます！ご注意ください！
    </Alert>
  );
};
