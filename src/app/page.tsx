import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TripSummary from "@/components/TripSummary";
import RouteMap from "@/components/RouteMap";
import FeriaGuide from "@/components/FeriaGuide";
import CityGuide from "@/components/CityGuide";
import CamperParking from "@/components/CamperParking";
import Gastronomy from "@/components/Gastronomy";
import Weather from "@/components/Weather";
import Budget from "@/components/Budget";
import Checklist from "@/components/Checklist";
import PDFExport from "@/components/PDFExport";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TripSummary />
        <RouteMap />
        <FeriaGuide />
        <CityGuide />
        <CamperParking />
        <Gastronomy />
        <Weather />
        <Budget />
        <Checklist />
        <PDFExport />
      </main>
      <Footer />
    </>
  );
}
