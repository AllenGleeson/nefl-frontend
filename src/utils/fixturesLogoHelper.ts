// Helper function to get club logo for fixtures.json
// Maps team names as they appear in fixtures.json to their logo paths

const fixturesTeamLogoMap: Record<string, string> = {
  "Drogheda Town FC": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Navan Town FC": "/images/clublogos/Navan-Town-Cosmos.webp", // Using Navan Town Cosmos logo
  "Kentstown Rovers": "/images/clublogos/kentstwon-rovers-fc-crest.webp",
  "Duleek FC": "/images/clublogos/duleek-afc-crest.webp",
  "Walshestown FC": "/images/clublogos/Walshestown.webp",
  "Athboy Celtic": "/images/clublogos/Athboy-Celtic-Logo.webp",
  "Trim Celtic": "/images/clublogos/trim-celtic-crest.webp",
  "Slane Wanderers": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Parkvilla FC": "/images/clublogos/parkvilla-fc-crest.webp",
  "Torro United": "/images/clublogos/Torro-Utd-Crest-2020.webp",
  "Bellurgan United": "/images/clublogos/bellurgan-united-crest.webp",
  "Carrick Rovers": "/images/clublogos/Carrick-Rovers-AFC-crest.webp",
  "Dromin United": "/images/logos/UHY_Logo.webp", // Default - no logo found
  "Ardee Celtic": "/images/clublogos/Ardee-Celtic.webp",
};

export function getFixtureTeamLogo(teamName: string): string {
  const normalizedName = teamName.trim();
  
  // Try exact match first
  if (fixturesTeamLogoMap[normalizedName]) {
    return fixturesTeamLogoMap[normalizedName];
  }
  
  // Try case-insensitive match
  const lowerName = normalizedName.toLowerCase();
  for (const [key, value] of Object.entries(fixturesTeamLogoMap)) {
    if (key.toLowerCase() === lowerName) {
      return value;
    }
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(fixturesTeamLogoMap)) {
    const keyLower = key.toLowerCase();
    const nameLower = normalizedName.toLowerCase();
    
    if (nameLower.includes(keyLower) || keyLower.includes(nameLower)) {
      return value;
    }
  }
  
  return "/images/logos/UHY_Logo.webp"; // Default fallback
}

