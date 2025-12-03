import { useState } from "react";
import styled from "@emotion/styled";
import { Checkbox, Modal } from "@/shared/components";
import { LegalContent } from "@/pages/TermsAndPolicy/LegalContent";

const AgreementContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s}px;
`;

const AgreementLabel = styled.label`
  font-size: ${props => props.theme.textVariants.caption.fontSize}px;
  color: ${props => props.theme.colors.mutedForeground};
  line-height: 1.4;
`;

const LinkButton = styled.button`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;

  &:disabled {
    text-decoration: none;
    cursor: not-allowed;
    color: ${props => props.theme.colors.mutedForeground};
  }
`;

const ModalContentWrapper = styled.div`
  max-width: 800px;
  width: 90vw;
  height: 80vh;
  overflow-y: auto;
  position: relative;
  background: ${props => props.theme.colors.cardBackground};
  padding: ${props => props.theme.spacing.l}px;
  border-radius: ${props => props.theme.borderRadii.l}px;
`;

type LegalAgreementProps = {
  accepted: boolean;
  onToggle: (checked: boolean) => void;
  isDisabled: boolean;
};

export function LegalAgreement({
  accepted,
  onToggle,
  isDisabled,
}: LegalAgreementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAcceptAndClose = () => {
    onToggle(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <AgreementContainer>
        <Checkbox
          id="terms"
          checked={accepted}
          onChange={onToggle}
          disabled={isDisabled}
        />
        <AgreementLabel htmlFor="terms">
          Eu li e concordo com os{" "}
          <LinkButton
            type="button"
            onClick={() => setIsModalOpen(true)}
            disabled={isDisabled}
          >
            Termos de Uso e Política de Privacidade
          </LinkButton>
          .
        </AgreementLabel>
      </AgreementContainer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContentWrapper>
          <LegalContent showAcceptButton onAccept={handleAcceptAndClose} />
        </ModalContentWrapper>
      </Modal>
    </>
  );
}
