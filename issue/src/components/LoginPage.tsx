import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

const CredentialsSignInPage = () => {
  const { login, currentUser } = useFrappeAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const providers = [{ id: "credentials", name: "Email and Password" }];

  const signIn = async (provider: AuthProvider, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login({ username: email, password });

      if (currentUser) {
        navigate("/issues");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while signing in.");
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
};

export default CredentialsSignInPage;
