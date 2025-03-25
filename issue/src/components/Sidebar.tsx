import { useMemo, useState } from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Issues from "./Issue/issueList";
import { Box } from "@mui/material";
import Createissue from "./Issue/Createissue";

const Sidebar = (props: any) => {
  const NAVIGATION: Navigation = [
    {
      segment: "dashboard",
      title: "Issue",
      icon: <DashboardIcon />,
    },
  ];
  function useRouter(initialPath: string): Router {
    const [pathname, setPathname] = useState(initialPath);

    const router = useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path: string | URL) => setPathname(String(path)),
      };
    }, [pathname]);

    return router;
  }

  const Theme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: "class",
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  const { window } = props;

  const router = useRouter("/dashboard");

  const Window = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={Theme}
      window={Window}
    >
      <DashboardLayout>
        <PageContainer>
          <Box>
            <Createissue />
            <Issues />
          </Box>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Sidebar;
