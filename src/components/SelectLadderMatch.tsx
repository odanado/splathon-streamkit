import type { LadderMatch } from "../schema/ladder-match";

import { Box, FormControl, FormLabel, Button, Select } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  ladderMatches: LadderMatch[];
  onChange(ladderMatch: LadderMatch): void | Promise<void>;
};

export const SelectLadderMatch = ({
  ladderMatches: _ladderMatches,
  onChange,
}: Props) => {
  const ladderMatches = Array.from(_ladderMatches).sort((a, b) => {
    const aRound = Number(a.id.split("-")[0]);
    const bRound = Number(b.id.split("-")[0]);
    if (aRound != bRound) {
      return aRound - bRound;
    }
    const aIdInRound = Number(a.id.split("-")[1]);
    const bIdInRound = Number(b.id.split("-")[1]);
    return aIdInRound - bIdInRound;
  });
  const ids = ladderMatches.map((ladderMatch) => ladderMatch.id);
  const rounds = Array.from(new Set(ids.map((id) => id.split("-")[0])));

  const [round, setRound] = useState(rounds[0]);
  const idsInRounds = ids.filter((id) => id.startsWith(round));

  const targetLadderMatches = ladderMatches.filter((ladderMatch) =>
    idsInRounds.includes(ladderMatch.id)
  );

  const [idInRound, setIdInRound] = useState(idsInRounds[0]);

  return (
    <Card>
      <CardHeader>
        <Box>マッチを選択</Box>
      </CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel htmlFor="round">ラウンド</FormLabel>
          <Select
            id="round"
            placeholder="ラウンドを選んでください"
            mb={3}
            value={round}
            onChange={(e) => setRound(e.target.value)}
          >
            {rounds.map((round) => {
              return (
                <option value={round} key={round}>
                  {round}
                </option>
              );
            })}
          </Select>
          <FormLabel htmlFor="idInRound">ID</FormLabel>
          <Select
            id="idInRound"
            placeholder="IDを選んでください"
            mb={3}
            value={idInRound}
            onChange={(e) => setIdInRound(e.target.value)}
          >
            {idsInRounds.map((id, i) => {
              return (
                <option value={id} key={id}>
                  {`${id} ${targetLadderMatches[i].alpha} vs ${targetLadderMatches[i].bravo}`}
                </option>
              );
            })}
          </Select>
          <Button
            colorScheme="blue"
            onClick={() => {
              const ladderMatch = ladderMatches.find(
                (ladderMatch) => ladderMatch.id === idInRound
              );
              if (ladderMatch) {
                onChange(ladderMatch);
              }
            }}
          >
            チーム名を読み込む
          </Button>
        </FormControl>
      </CardBody>
    </Card>
  );
};
