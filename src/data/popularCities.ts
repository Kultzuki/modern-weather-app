export interface PopularCity {
  name: string;
  country: string;
  state?: string;
  displayName: string;
}

export const popularCities: PopularCity[] = [
  // North America
  { name: "New York", country: "US", state: "NY", displayName: "New York, NY, US" },
  { name: "Los Angeles", country: "US", state: "CA", displayName: "Los Angeles, CA, US" },
  { name: "Chicago", country: "US", state: "IL", displayName: "Chicago, IL, US" },
  { name: "Miami", country: "US", state: "FL", displayName: "Miami, FL, US" },
  { name: "Toronto", country: "CA", displayName: "Toronto, Canada" },
  { name: "Vancouver", country: "CA", displayName: "Vancouver, Canada" },
  
  // Europe
  { name: "London", country: "GB", displayName: "London, United Kingdom" },
  { name: "Paris", country: "FR", displayName: "Paris, France" },
  { name: "Berlin", country: "DE", displayName: "Berlin, Germany" },
  { name: "Madrid", country: "ES", displayName: "Madrid, Spain" },
  { name: "Rome", country: "IT", displayName: "Rome, Italy" },
  { name: "Amsterdam", country: "NL", displayName: "Amsterdam, Netherlands" },
  { name: "Barcelona", country: "ES", displayName: "Barcelona, Spain" },
  { name: "Vienna", country: "AT", displayName: "Vienna, Austria" },
  
  // Asia
  { name: "Tokyo", country: "JP", displayName: "Tokyo, Japan" },
  { name: "Singapore", country: "SG", displayName: "Singapore" },
  { name: "Hong Kong", country: "HK", displayName: "Hong Kong" },
  { name: "Seoul", country: "KR", displayName: "Seoul, South Korea" },
  { name: "Bangkok", country: "TH", displayName: "Bangkok, Thailand" },
  { name: "Mumbai", country: "IN", displayName: "Mumbai, India" },
  { name: "Delhi", country: "IN", displayName: "Delhi, India" },
  { name: "Shanghai", country: "CN", displayName: "Shanghai, China" },
  { name: "Beijing", country: "CN", displayName: "Beijing, China" },
  
  // Australia & Oceania
  { name: "Sydney", country: "AU", displayName: "Sydney, Australia" },
  { name: "Melbourne", country: "AU", displayName: "Melbourne, Australia" },
  { name: "Auckland", country: "NZ", displayName: "Auckland, New Zealand" },
  
  // South America
  { name: "São Paulo", country: "BR", displayName: "São Paulo, Brazil" },
  { name: "Rio de Janeiro", country: "BR", displayName: "Rio de Janeiro, Brazil" },
  { name: "Buenos Aires", country: "AR", displayName: "Buenos Aires, Argentina" },
  { name: "Lima", country: "PE", displayName: "Lima, Peru" },
  
  // Africa
  { name: "Cairo", country: "EG", displayName: "Cairo, Egypt" },
  { name: "Cape Town", country: "ZA", displayName: "Cape Town, South Africa" },
  { name: "Lagos", country: "NG", displayName: "Lagos, Nigeria" },
  
  // Middle East
  { name: "Dubai", country: "AE", displayName: "Dubai, UAE" },
  { name: "Istanbul", country: "TR", displayName: "Istanbul, Turkey" },
  { name: "Tel Aviv", country: "IL", displayName: "Tel Aviv, Israel" },
]; 