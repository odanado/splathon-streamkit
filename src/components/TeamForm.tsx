import { useState } from "react";
import { Box, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import type { Team } from "../schema/team";

type Props = {
  side: string;
  team: Team;
  onChange(team: Team): void | Promise<void>;
};
export const TeamForm = ({ side, team, onChange }: Props) => {
  const [name, setName] = useState(team.name);
  const [score, setScore] = useState(team.score);

  const handleNameChange = (event: any) => {
    setName(event.target.value);

    onChange({
      name: event.target.value,
      score: Number(score),
    });
  };

  const handleScoreChange = (event: any) => {
    setScore(event.target.value);

    onChange({
      name,
      score: Number(event.target.value),
    });
  };
  return (
    <Card>
      <CardHeader>
        <Box>{side}</Box>
      </CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel htmlFor="name">チーム名:</FormLabel>
          <Input
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="チーム名を入力してください"
            mb={3}
          />

          <FormLabel htmlFor="score">Score:</FormLabel>
          <Select
            id="score"
            value={score}
            onChange={handleScoreChange}
            placeholder="スコアを選んでください"
            mb={3}
          >
            {[...Array(5)].map((_, i) => {
              return (
                <option value={i} key={i}>
                  {i}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </CardBody>
    </Card>
  );
};
