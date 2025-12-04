import { Box } from "./Box";
import { Text } from "./Text";
import styled from "@emotion/styled";

const LogoImageContainer = styled(Box)`
  width: 160px;
  height: 160px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  const titleColor = variant === "light" ? "white" : "primary";
  const sloganColor = variant === "light" ? "white" : "mutedForeground";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      className={className}
    >
      <LogoImageContainer>
        <LogoImage src="/logo.png" alt="Ombro de Cristo Logo" />
      </LogoImageContainer>
      <Box alignItems="center" marginTop="-s">
        <Text variant="header" color={titleColor} textAlign="center">
          Ombro de Cristo
        </Text>
        <Text
          variant="caption"
          fontSize="16px"
          color={sloganColor}
          textAlign="center"
          opacity={0.95}
          fontWeight={600}
          marginTop="xs"
        >
          Sua missão, fortalecida pela mentoria.
        </Text>
      </Box>
    </Box>
  );
}
