import { useOutletContext } from "react-router";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { FoodShowcase, CustomCreationsBanner } from "../components/FoodShowcase";
import { EventInfo } from "../components/EventInfo";
import { HowToOrder } from "../components/HowToOrder";
import { Reviews } from "../components/Reviews";
import { Location } from "../components/Location";
import { SEO, myungGaStructuredData } from "../components/SEO";

export function Home() {
  const { selectedMenuItems, setSelectedMenuItems } = useOutletContext<{
    selectedMenuItems: string[];
    setSelectedMenuItems: React.Dispatch<React.SetStateAction<string[]>>;
  }>();

  const removeMenuItem = (itemToRemove: string) => {
    setSelectedMenuItems(selectedMenuItems.filter(item => item !== itemToRemove));
  };

  return (
    <>
      <SEO
        title="MyungGa Korean Catering - Authentic Asian Cuisine for Weddings, Parties & Corporate Events"
        description="Premium Korean and Asian catering services with 20+ years experience. Specializing in authentic Korean, Vietnamese, Chinese fusion, and Thai cuisine for weddings, parties, and corporate events in Ontario."
        keywords="Korean catering, Asian catering, wedding catering, corporate catering, party catering, authentic Korean food, Vietnamese catering, Chinese fusion catering, Thai catering, galbi-jjim, japchae, pho, jjajangmyeon, Ontario catering, event catering"
        canonical={typeof window !== 'undefined' ? window.location.origin : undefined}
        structuredData={myungGaStructuredData}
      />
      <div>
        <Hero />
        <EventInfo />
        <FoodShowcase 
          selectedMenuItems={selectedMenuItems} 
          setSelectedMenuItems={setSelectedMenuItems} 
        />
        <CustomCreationsBanner/>
        <About />

        <HowToOrder 
          selectedMenuItems={selectedMenuItems}
          removeMenuItem={removeMenuItem}
        />
        <Reviews />
        <Location />
      </div>
    </>
  );
}