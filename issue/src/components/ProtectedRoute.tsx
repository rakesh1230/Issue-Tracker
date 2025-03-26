import { useFrappeAuth } from "frappe-react-sdk";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { JSX } from "@emotion/react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useFrappeAuth();

  if (!currentUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card
          sx={{
            maxWidth: 400,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h6" color="error" gutterBottom>
              Access Denied
            </Typography>
            <Typography variant="body1" color="textSecondary">
              You are not logged in. Please sign in to continue.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              href="/login"
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;
