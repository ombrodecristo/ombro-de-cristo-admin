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
`;

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen} />
      <MainContent>
        <Header onToggleSidebar={toggleSidebar} />
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
}
