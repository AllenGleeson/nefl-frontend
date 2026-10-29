// src/components/About/HistoryTab.tsx
import LeagueHistory from "./LeagueHistory";
import Timeline from "./Timeline";
import PhotoGallery from "./PhotoGallery";

const archivePhotos = [
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Presention-to-Cathal-1987-1170x650.jpg", caption: "Presentation to Cathal, 1987" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1980-1097x650.jpg", caption: "The early days, 1980" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/Shambo-87-1170x650.jpg", caption: "Shambo, 1987" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/1990-pic-1-1170x650.jpg", caption: "Early 1990s" },
  { src: "https://i0.wp.com/nefl.ie/wp-content/uploads/2020/10/dunderry-panle-90s-1170x650.jpg", caption: "Dunderry panel, 1990s" },
];

export default function HistoryTab() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <LeagueHistory />
      <Timeline />
      <PhotoGallery title="From the archive" images={archivePhotos} />
    </div>
  );
}
