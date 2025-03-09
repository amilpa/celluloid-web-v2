
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ScriptGenerator from "@/components/ScriptGenerator";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <ScriptGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
