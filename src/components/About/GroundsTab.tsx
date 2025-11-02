// src/components/About/Grounds.tsx
import KeyDates from "./KeyDates";
import GroundsCarousel from "./GroundsCarousel";
import MDLGallery from "./MDLGallery";

export default function GroundsTab() {
    return (
        <div className="grounds-tab">
            <MDLGallery />
            <KeyDates />
            <GroundsCarousel />
        </div>
    );
}