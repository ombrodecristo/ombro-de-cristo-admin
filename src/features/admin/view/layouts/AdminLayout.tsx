import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  background-color: ${props => props.theme.colors.mainBackground};
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.l}px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.m}px;
  }
`;

const MobileOverlay = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => (props.isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
`;

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen} onNavigate={closeSidebar} />
      <MainContent>
        <Header onToggleSidebar={toggleSidebar} />
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
      <MobileOverlay isOpen={isSidebarOpen} onClick={toggleSidebar} />
    </LayoutContainer>
  );
}
