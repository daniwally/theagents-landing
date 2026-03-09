import { useState } from "react";
import "@/App.css";
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
    <div className="App bg-main noise-overlay" data-testid="app-container">
      {/* Header */}
      <Header onTrialClick={handleTrialClick} />

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <Hero onCTAClick={handleTrialClick} />

        {/* Agents Grid */}
        <AgentsGrid />

        {/* How it Works */}
        <HowItWorks />

        {/* Why Us - 15 años */}
        <WhyUs />

        {/* Pricing */}
        <Pricing onDemoClick={handleTrialClick} />

        {/* Dream Team */}
        <DreamTeam onCTAClick={handleTrialClick} />

        {/* Footer */}
        <Footer onDemoClick={handleTrialClick} />
      </main>

      {/* Chat Demo */}
      {isChatOpen ? (
        <ChatDemo isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      ) : (
        <ChatTrigger onClick={handleChatToggle} />
      )}

      {/* Trial Form Modal */}
      <TrialForm 
        isOpen={isTrialOpen} 
        onClose={() => setIsTrialOpen(false)}
        selectedPack={null}
      />
    </div>
  );
}

export default App;
