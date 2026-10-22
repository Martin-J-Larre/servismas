import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Services from "../components/Services/Services";
import Location from "../components/Location/Location";
import BecomeProvider from "../components/BecomeProvider/BecomeProvider";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <Location />
        <BecomeProvider />
      </main>
    </>
  );
}

export default Home;
