import { useState } from "react";
import "@/App.css";
import { LanguageProvider } from "./context/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { AgentsGrid } from "./components/AgentsGrid";
import { HowItWorks } from "./components/HowItWorks";
import { WhyUs } from "./components/WhyUs";
import { Pricing } from "./components/Pricing";
import { DreamTeam } from "./components/DreamTeam";
import { ChatDemo, ChatTrigger } from "./components/ChatDemo";
import { TrialForm } from "./components/TrialForm";
import { Footer } from "./components/Footer";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  const handleTrialClick = () => {
    setIsTrialOpen(true);
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <LanguageProvider>
      <div className="App bg-main noise-overlay" data-testid="app-container">
        <Header onTrialClick={handleTrialClick} />
        <main>
          <Hero onCTAClick={handleTrialClick} />
          <AgentsGrid />
          <HowItWorks />
          <WhyUs />
          <Pricing onDemoClick={handleTrialClick} />
          <DreamTeam onCTAClick={handleTrialClick} />
          <Footer onDemoClick={handleTrialClick} />
        </main>
        {isChatOpen ? (
          <ChatDemo isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        ) : (
          <ChatTrigger onClick={handleChatToggle} />
        )}
        <TrialForm 
          isOpen={isTrialOpen} 
          onClose={() => setIsTrialOpen(false)}
          selectedPack={null}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
