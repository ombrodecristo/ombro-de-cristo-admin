import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const pulse = keyframes`
  50% {
    opacity: 0.6;
  }
`;

const SkeletonPrimitive = styled.div`
  background-color: ${props => props.theme.colors.mutedBackground};
  border-radius: ${props => props.theme.borderRadii.s}px;
  animation: ${pulse} 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

interface SkeletonProps {
  height?: string;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({
  height = "20px",
  width = "100%",
  className,
  style,
}: SkeletonProps) {
  return (
    <SkeletonPrimitive
      style={{ height, width, ...style }}
      className={className}
    />
  );
}
