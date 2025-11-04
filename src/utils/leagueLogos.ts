// Helper function to get the appropriate logo for a league based on its sponsor

export function getLeagueLogo(leagueName: string): string {
  // UHY Farrelly Dawe White leagues
  if (leagueName.includes("UHY") || leagueName.includes("Farrelly Dawe White")) {
    return "/images/logos/UHY_Logo.webp";
  }
  
  // O Neills Sportswear leagues
  if (leagueName.includes("O Neills") || leagueName.includes("Neills Sportswear")) {
    return "/images/logos/oneills_logo.webp";
  }
  
  // PM Blinds & Shutters leagues
  if (leagueName.includes("PM Blinds") || leagueName.includes("Blinds & Shutters")) {
    return "/images/logos/pm-blinds.webp";
  }
  
  // Superior Racking & Shelving leagues
  if (leagueName.includes("Superior Racking") || leagueName.includes("Superior")) {
    return "/images/logos/superior.webp";
  }
  
  // Default fallback
  return "/images/logos/UHY_Logo.webp";
}

