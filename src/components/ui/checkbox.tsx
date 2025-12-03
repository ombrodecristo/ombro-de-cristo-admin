import styled from "@emotion/styled";
import { FiCheck } from "react-icons/fi";

const CheckboxContainer = styled.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: ${props => props.theme.spacing.s}px;
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CustomCheckbox = styled.div<{ checked: boolean; disabled?: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: ${props => props.theme.borderRadii.s}px;
  border: 1.5px solid
    ${props =>
      props.checked ? props.theme.colors.primary : props.theme.colors.border};
  background-color: ${props =>
    props.checked
      ? props.theme.colors.primary
      : props.theme.colors.inputBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  svg {
    color: white;
    visibility: ${props => (props.checked ? "visible" : "hidden")};
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
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <CheckboxContainer onClick={handleClick}>
      <CheckboxInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => {}}
        disabled={disabled}
      />
      <CustomCheckbox checked={checked} disabled={disabled}>
        <FiCheck size={18} />
      </CustomCheckbox>
      {label && <label htmlFor={id}>{label}</label>}
    </CheckboxContainer>
  );
}
