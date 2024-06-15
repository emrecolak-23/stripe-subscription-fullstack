import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";

const Navigation = () => {
  return (
    <>
      <AppShell header={{ height: 50 }}>
        <AppShell.Header>
          <NavBar />
        </AppShell.Header>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
};

export default Navigation;
