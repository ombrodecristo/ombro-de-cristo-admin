import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import styled from "@emotion/styled";
import { FiChevronDown } from "react-icons/fi";

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectTrigger = styled.button<{ hasIcon: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 100%;
  border-radius: ${props => props.theme.borderRadii.m}px;
  border: 1.5px solid ${props => props.theme.colors.inputBorder};
  background-color: ${props => props.theme.colors.inputBackground};
  padding: 0 ${props => props.theme.spacing.m}px;
  padding-left: ${props =>
    props.hasIcon
      ? `${props.theme.spacing.xl + props.theme.spacing.s}px`
      : `${props.theme.spacing.m}px`};
  font-size: ${props => props.theme.textVariants.body.fontSize}px;
  color: ${props => props.theme.colors.inputForeground};
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.mutedBackground};
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Placeholder = styled.span`
  color: ${props => props.theme.colors.mutedForeground};
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadii.m}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: ${props => props.theme.spacing.sm}px
    ${props => props.theme.spacing.m}px;
  cursor: pointer;
  color: ${props =>
    props.isSelected
      ? props.theme.colors.primary
      : props.theme.colors.mainForeground};
  background-color: ${props =>
    props.isSelected ? props.theme.colors.mutedBackground : "transparent"};

  &:hover {
    background-color: ${props => props.theme.colors.mutedBackground};
  }
`;

const IconContainer = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.m}px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  & > svg {
    color: ${props => props.theme.colors.mutedForeground};
  }
`;

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export function Select({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  icon,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <SelectWrapper ref={wrapperRef}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <SelectTrigger
        type="button"
        hasIcon={!!icon}
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>
          {selectedOption ? (
            selectedOption.label
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
        </span>
        <FiChevronDown />
      </SelectTrigger>
      {isOpen && (
        <Dropdown>
          {options.map(option => (
            <DropdownItem
              key={option.value}
              isSelected={value === option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SelectWrapper>
  );
}
