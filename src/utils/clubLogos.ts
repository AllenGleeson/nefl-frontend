// Helper function to get club logo path based on club name
// Maps club names to their logo files in /images/clublogos/

const clubLogoMap: Record<string, string> = {
  // Men's teams
  "Parkvilla FC": "/images/clublogos/parkvilla-fc-crest.webp",
  "Duleek AFC": "/images/clublogos/duleek-afc-crest.webp",
  "Rock Celtic FC": "/images/clublogos/rock-celtic-fc-crest.webp",
  "Quay Celtic FC": "/images/clublogos/quay-celtic-fc-crest.webp",
  "Bellurgan United": "/images/clublogos/bellurgan-united-crest.webp",
  "Trim Celtic AFC": "/images/clublogos/trim-celtic-crest.webp",
  "Glenmuir FC": "/images/clublogos/glenmore-united-fc-crest.webp", // Using Glenmore as closest match
  "Carrick Rovers AFC": "/images/clublogos/Carrick-Rovers-AFC-crest.webp",
  "Kentstown Rovers FC": "/images/clublogos/kentstwon-rovers-fc-crest.webp",
  "Albion Rovers FC": "/images/clublogos/Albion-New-Crest.webp",
  "Johnstown FC": "/images/clublogos/JFC-club-mark.webp",
  "Ardee Celtic FC": "/images/clublogos/Ardee-Celtic.webp",
  "Torro United FC": "/images/clublogos/Torro-Utd-Crest-2020.webp",
  "Robinstown FC": "/images/clublogos/Robinstown-FC-crest.webp",
  "Kingscourt Harps AFC": "/images/clublogos/kingscourt-harps-afc-crest.webp",
  "Athboy Celtic FC": "/images/clublogos/Athboy-Celtic-Logo.webp",
  "Walshestown FC": "/images/clublogos/Walshestown.webp",
  "Navan Town Cosmos": "/images/clublogos/Navan-Town-Cosmos.webp",
  "BJD Celtic": "/images/clublogos/sporting-BJD-FC.webp", // Using Sporting BJD as closest
  "Black Bull FC": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Enfield Celtic FC": "/images/clublogos/enfield-celtic-fc-crest.webp",
  "Oldcastle United": "/images/clublogos/UHY_Logo.webp", // Default - no logo found
  "Termonfeckin Celtic FC": "/images/clublogos/Termonfeckin-Celtic-FC.webp",
  "Virginia Celtic FC": "/images/clublogos/UHY_Logo.webp", // Default - no logo found
  "Trim Town FC": "/images/clublogos/Trim-Town-Crest.webp",
  "Bailieboro Celtic AFC": "/images/clublogos/UHY_Logo.webp", // Default - no logo found
  "Kells Celtic Youths": "/images/clublogos/UHY_Logo.webp", // Default - no logo found
  "Monaghan United FC": "/images/clublogos/Monaghan-Utd-png.webp",
  "Monaghan Town FC": "/images/clublogos/Monaghan-Town-FC-.webp",
  "Cootehill Harps": "/images/clublogos/CootehillHarpsCrest.webp",
  "Rossin Rovers": "/images/clublogos/rossin-rovers-crest.webp",
  "Newtown United": "/images/clublogos/NUFC-Badge.webp",
  "Aston Celtic FC": "/images/clublogos/ASTON.webp",
  "Navan Rangers": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Drogheda Rovers": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Kells United": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Slane Wanderers": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Castleblayney United": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Bailieboro Shamrocks": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Dundalk Town": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Drogheda City": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Cavan Rovers": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Meath Athletic": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Louth United": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Electro Celtic FC": "/images/clublogos/Electro-Celtic-FC-crest.webp",
  "Longwood AFC": "/images/clublogos/longwood.webp",
  "OMP United": "/images/clublogos/omp.webp",
  "Castle Villa": "/images/clublogos/Castle-Villa.webp",
  "Bohermeen Celtic FC": "/images/clublogos/Bohermeen-Celtic.webp",
  "Parkceltic Summerhill": "/images/clublogos/Parkceltic-Summerhill-crest.webp",
  "Sporting BJD FC": "/images/clublogos/sporting-BJD-FC.webp",
  "Fordrew Rovers": "/images/clublogos/Fordrew-Rovers-.webp",
  "Rathkenny Rovers": "/images/clublogos/rathkenny.webp",
  "Raharney United FC": "/images/clublogos/Raharney-Utd-.webp",
  "Newtown Celtic FC": "/images/clublogos/Newtown-Celtic-.webp",
  "Grove Rangers": "/images/clublogos/Grove-Rangers-FC-450x450-1.webp",
  "Ballyhaise Celtic": "/images/clublogos/Ballyhaise.webp",
  "Ballivor FC": "/images/clublogos/ballivor.webp",
  
  // Women's teams
  "Balbriggan FC": "/images/clublogos/Ballbriggan-FC.webp",
  "Balrath FC": "/images/clublogos/Balrath-FC.webp",
  "Dunshaughlin Youths": "/images/clublogos/dunsh.webp",
  "Kinnegad Juniors AFC": "/images/clublogos/Kinnegad-Juniors-AFC.webp",
  "Glen Magic FC": "/images/clublogos/Glen-Magic-Soccer-288x287-1.webp",
};

// Default logo fallback
const defaultLogo = "/images/logos/UHY_Logo.webp";

export function getClubLogo(clubName: string): string {
  // Normalize the club name for matching (case-insensitive, trim whitespace)
  const normalizedName = clubName.trim();
  
  // Try exact match first
  if (clubLogoMap[normalizedName]) {
    return clubLogoMap[normalizedName];
  }
  
  // Try case-insensitive match
  const lowerName = normalizedName.toLowerCase();
  for (const [key, value] of Object.entries(clubLogoMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }
  
  // Try partial match for common variations
  for (const [key, value] of Object.entries(clubLogoMap)) {
    const keyLower = key.toLowerCase();
    const nameLower = normalizedName.toLowerCase();
    
    // Check if club name contains key or vice versa
    if (nameLower.includes(keyLower) || keyLower.includes(nameLower)) {
      return value;
    }
  }
  
  return defaultLogo;
}

