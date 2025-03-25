import { Outlet } from "react-router-dom";
import { FrappeProvider } from "frappe-react-sdk";
function App() {
  return (
    <div>
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_URL}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
        <Outlet />
      </FrappeProvider>
    </div>
  );
}

export default App;
