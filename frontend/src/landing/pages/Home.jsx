import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Services from "../components/Services/Services";
import Location from "../components/Location/Location";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <Location />
      </main>
    </>
  );
}

export default Home;
