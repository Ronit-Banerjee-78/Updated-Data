import React, { useState } from "react";
import { SiteProvider } from "./context/SiteContext";
import { useLocationTab } from "./hooks/useLocationTab";
import RootLayout from "./app/layout";
import RootPage from "./app/page";

export default function App() {
  const [activeTab, setActiveTab] = useLocationTab("home");
  const [userSession, setUserSession] = useState(null);

  return (
    <SiteProvider>
      <RootLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userSession={userSession}
        setUserSession={setUserSession}
      >
        <RootPage
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userSession={userSession}
          setUserSession={setUserSession}
        />
      </RootLayout>
    </SiteProvider>
  );
}

