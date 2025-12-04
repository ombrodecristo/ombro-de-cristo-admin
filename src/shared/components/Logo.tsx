import { Box } from "./Box";
import { Text } from "./Text";
import styled from "@emotion/styled";

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  showSlogan?: boolean;
  direction?: "column" | "row";
  size?: number;
}

export function Logo({
  variant = "dark",
  className,
  showSlogan = true,
  direction = "column",
  size = 160,
}: LogoProps) {
  const titleColor = variant === "light" ? "white" : "primary";
  const sloganColor = variant === "light" ? "white" : "mutedForeground";

  const isRow = direction === "row";

  return (
    <Box
      display="flex"
      flexDirection={direction}
      alignItems="center"
      gap={isRow ? "s" : "none"}
      className={className}
    >
      <Box width={size} height={size} flexShrink={0}>
        <LogoImage src="/logo.png" alt="Ombro de Cristo Logo" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems={isRow ? "flex-start" : "center"}
        marginTop={isRow ? "0" : "-s"}
      >
        <Text
          variant={isRow ? "subHeader" : "header"}
          color={titleColor}
          textAlign={isRow ? "left" : "center"}
          fontSize={isRow ? "20px" : undefined}
        >
          Ombro de Cristo
        </Text>
        {showSlogan && (
          <Text
            variant="caption"
            fontSize="16px"
            color={sloganColor}
            textAlign={isRow ? "left" : "center"}
            opacity={0.95}
            fontWeight={600}
            marginTop="xs"
          >
            Sua missão, fortalecida pela mentoria.
          </Text>
        )}
      </Box>
    </Box>
  );
}
