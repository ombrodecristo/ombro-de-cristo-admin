import styled from "@emotion/styled";
import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";

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
  width: 26px;
  height: 26px;
  color: ${props =>
    props.checked
      ? props.theme.colors.primary
      : props.theme.colors.mutedForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  flex-shrink: 0;
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
        {checked ? <IoCheckbox size={26} /> : <IoCheckboxOutline size={26} />}
      </CustomCheckbox>
      {label && <span>{label}</span>}
    </CheckboxContainer>
  );
}
