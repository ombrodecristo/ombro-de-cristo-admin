import styled from "@emotion/styled";
import { FiCheck } from "react-icons/fi";

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: ${props => props.theme.spacing.s}px;
  user-select: none;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CustomCheckbox = styled.div<{ checked: boolean; disabled?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: ${props => props.theme.borderRadii.s}px;
  border: 1.5px solid
    ${props =>
      props.checked
        ? props.theme.colors.primary
        : props.theme.colors.mutedForeground};
  background-color: ${props =>
    props.checked
      ? props.theme.colors.primary
      : props.theme.colors.transparent};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  flex-shrink: 0;

  svg {
    color: white;
    visibility: ${props => (props.checked ? "visible" : "hidden")};
    stroke-width: 3px;
  }
`;

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export function Checkbox({
  id,
  checked,
  onChange,
  disabled,
  label,
}: CheckboxProps) {
  return (
    <CheckboxContainer htmlFor={id}>
      <CheckboxInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        disabled={disabled}
      />
      <CustomCheckbox checked={checked} disabled={disabled}>
        <FiCheck size={18} />
      </CustomCheckbox>
      {label && <span>{label}</span>}
    </CheckboxContainer>
  );
}
