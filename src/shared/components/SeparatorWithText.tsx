import { Box } from "./Box";
import { Text } from "./Text";

type Props = {
  text: string;
};

export function SeparatorWithText({ text }: Props) {
  return (
    <Box display="flex" alignItems="center" gap="s">
      <Box flex={1} height="1.5px" backgroundColor="border" />
      <Text variant="caption" color="mutedForeground">
        {text}
      </Text>
      <Box flex={1} height="1.5px" backgroundColor="border" />
    </Box>
  );
}
