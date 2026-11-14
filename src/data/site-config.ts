import { BusinessSettings, CategoryInfo } from '@/types';

export const SITE_CONFIG: BusinessSettings = {
  businessName: 'Sharma Electronics',
  tagline: 'Big Brands. Better Prices. Right Here in Vasant Kunj.',
  phone: '+91 70119 62356',
  whatsapp: '917011962356',
  email: 'contact@sharmaelectronics.com',
  address: '80-B, Masoodpur Dairy, Near Vasant Kunj',
  area: 'Vasant Kunj',
  city: 'New Delhi',
  pincode: '110070',
  landmark: 'Opposite Masoodpur Flyover / Dairy, Main Road, Vasant Kunj',
  workingHours: 'Open Daily: 10:00 AM – 9:00 PM',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.2938830171637!2d77.15312!3d28.53985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1de9d28dbba3%3A0x6bfa3e82d7c58d04!2sMasoodpur%2C%20Vasant%20Kunj%2C%20New%20Delhi%2C%20Delhi%20110070!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Masoodpur+Dairy,+Vasant+Kunj,+New+Delhi+110070',
  coordinates: {
    latitude: 28.5415,
    longitude: 77.1557,
  },
  floorsInfo: {
    totalFloors: 5,
    areaPerFloor: '200 Gaj (approx. 1,800 sq.ft)',
    hasCommercialLift: true,
    establishedYear: 2019,
  },
};

export const ELECTRONICS_CATEGORIES: CategoryInfo[] = [
  {
    id: 'televisions',
    name: 'Televisions',
    shortDescription: '4K Ultra HD, OLED, and QLED Smart TVs from 43" to 85".',
    tagline: 'Cinematic Visuals & Dolby Atmos Sound',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    brands: ['Sony Bravia', 'Samsung', 'LG', 'Mi', 'OnePlus'],
  },
  {
    id: 'air-conditioners',
    name: 'Air Conditioners',
    shortDescription: '1 to 2 Ton 3-Star & 5-Star Copper Inverter Split & Window ACs.',
    tagline: 'Extreme Cooling for Delhi Summers',
    imageUrl: 'https://images.unsplash.com/photo-1614633833026-06201a070e2a?auto=format&fit=crop&w=800&q=80',
    brands: ['Daikin', 'Voltas', 'LG Dual Inverter', 'Hitachi', 'Blue Star'],
  },
  {
    id: 'refrigerators',
    name: 'Refrigerators',
    shortDescription: 'Single, Double Door & Side-by-Side Inverter Frost-Free Fridges.',
    tagline: 'Maximum Freshness & Smart Inverter Savings',
    imageUrl: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    brands: ['Samsung', 'LG', 'Whirlpool', 'Haier', 'Bosch'],
  },
  {
    id: 'washing-machines',
    name: 'Washing Machines',
    shortDescription: 'Front Load, Top Load & Semi-Automatic Inverter Washers with Heaters.',
    tagline: 'Germ-Free Deep Fabric Care',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    brands: ['Bosch', 'IFB', 'LG', 'Samsung', 'Whirlpool'],
  },
  {
    id: 'microwaves',
    name: 'Microwaves',
    shortDescription: 'Solo, Grill & Convection Ovens with Indian Tandoor auto-cook menus.',
    tagline: 'Baking, Grilling & Instant Reheating',
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80',
    brands: ['Samsung', 'LG Charcoal', 'IFB', 'Panasonic', 'Morphy Richards'],
  },
  {
    id: 'water-dispensers',
    name: 'Water Dispensers',
    shortDescription: 'Floor-standing Hot, Cold & Normal Dispensers with Cooling Cabinets.',
    tagline: 'Instant Hot & Refreshingly Chilled Water',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    brands: ['Voltas', 'Blue Star', 'Atlantis', 'Usha'],
  },
];

export const METRO_DIRECTIONS = [
  {
    metroLine: 'Yellow Line (Chattarpur Metro Station)',
    distance: '3.8 km',
    travelTime: '10 mins by Auto / Taxi',
    route: 'Take auto towards Masoodpur Dairy / Vasant Kunj via Mehrauli-Mahipalpur Road. Showroom is on the main road opposite Masoodpur flyover.',
  },
  {
    metroLine: 'Orange Line / Airport Express (Delhi Aerocity Metro)',
    distance: '4.2 km',
    travelTime: '12 mins by Cab',
    route: 'Head east on Nelson Mandela Marg towards Vasant Kunj. Turn right at Masoodpur Dairy junction.',
  },
  {
    metroLine: 'Magenta Line (Vasant Vihar Metro Station)',
    distance: '4.5 km',
    travelTime: '12 mins',
    route: 'Drive through Nelson Mandela Marg past Ambience Mall and DLF Promenade down to Masoodpur Dairy.',
  },
];

export const GOOGLE_REVIEWS_MOCK = [
  {
    id: '1',
    author: 'Vikram Malhotra',
    location: 'Sector B, Pocket 1, Vasant Kunj',
    rating: 5,
    date: '1 week ago',
    text: 'Saved ₹1,800 on a Sony 55-inch 4K TV compared to Amazon! They have a 5-floor showroom in Masoodpur with a proper lift. The owner personally verified the seal and arranged prompt delivery to my flat within 4 hours. Superb local service.',
    category: 'Televisions',
  },
  {
    id: '2',
    author: 'Dr. Meenakshi Sundaram',
    location: 'C-9, Vasant Kunj',
    rating: 5,
    date: '3 weeks ago',
    text: 'Bought a Daikin 1.5 Ton 5-Star Inverter AC during peak May heat. Got it installed the very next morning at a price better than Croma and Vijay Sales. Very transparent dealing and honest advice.',
    category: 'Air Conditioners',
  },
  {
    id: '3',
    author: 'Sunil Aggarwal',
    location: 'Munirka Enclave, South Delhi',
    rating: 5,
    date: '1 month ago',
    text: 'Ordered a Bosch 8kg front load washing machine on WhatsApp after comparing prices with Croma and Reliance Digital. Sharma Electronics beat the quote by ₹1,500 with authentic brand bill and manufacturer warranty provided immediately.',
    category: 'Washing Machines',
  },
  {
    id: '4',
    author: 'Pooja Sethi',
    location: 'Pocket 3, Sector D, Vasant Kunj',
    rating: 5,
    date: '2 months ago',
    text: 'Visited the Masoodpur showroom personally. Very spacious five floors of electronics with a clean lift. They checked online prices right in front of us and gave us a genuine ₹1,200 discount on a Samsung double door refrigerator. Highly recommended.',
    category: 'Refrigerators',
  },
];
