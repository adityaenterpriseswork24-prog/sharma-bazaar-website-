export interface DeliveryLocality {
  slug: string;
  name: string;
  tagline: string;
  pincodes: string[];
  distanceFromShowroom: string;
  deliveryWindow: string;
  deliveryPill: string;
  landmarkCoverage: string[];
  keySectors: string[];
  overview: string;
  deliveryHighlights: {
    title: string;
    description: string;
  }[];
  popularAppliances: {
    category: string;
    models: string;
    avgSavings: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}

export const SOUTH_DELHI_LOCALITIES: DeliveryLocality[] = [
  // 1. Vasant Kunj (Core Hub)
  {
    slug: 'vasant-kunj',
    name: 'Vasant Kunj',
    tagline: 'Immediate Express Doorstep Appliance Delivery (Sectors A, B, C, D & Masoodpur)',
    pincodes: ['110070'],
    distanceFromShowroom: '0.2 – 3.5 km (Immediate Showroom Vicinity)',
    deliveryWindow: '2 – 3 Hours (Fastest Dispatch)',
    deliveryPill: '2 - 3 Hrs Express Delivery',
    landmarkCoverage: [
      'Sector A (Pockets 1 & 2)',
      'Sector B (Pockets 1 to 11)',
      'Sector C (Pockets 1 to 9)',
      'Sector D (Pockets 1 to 8)',
      'Masoodpur Dairy & Village',
      'Nelson Mandela Marg Residences',
      'Vasant Square Mall Environs',
      'Kishangarh Extension',
    ],
    keySectors: [
      'Sector A',
      'Sector B',
      'Sector C',
      'Sector D',
      'Masoodpur',
      'Nelson Mandela Marg',
      'Promenade / Ambience Corridor',
      'Kishangarh',
    ],
    overview:
      'As our primary neighborhood showroom located at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj residents enjoy our fastest white-glove doorstep delivery. Large appliances—including 4K Smart TVs, double door refrigerators, front load washing machines, and split air conditioners—are dispatched directly from our local warehouse within 2 to 3 hours.',
    deliveryHighlights: [
      {
        title: 'Room Carry-In & Unboxing',
        description:
          'Our trained delivery staff bring the appliance straight inside your flat, place it in your living room or kitchen, and unbox it in front of you.',
      },
      {
        title: 'Brand Seal & Physical Inspection',
        description:
          'Inspect the factory box seal, barcodes, and physical condition of the unit before making any final payment.',
      },
      {
        title: 'Pay on Delivery (Cash or UPI)',
        description:
          'No advance card commitments required. Pay conveniently via UPI QR code or cash once your appliance is safely inside your flat.',
      },
      {
        title: 'Priority Brand Installation Coordination',
        description:
          'We directly coordinate with authorized OEM service teams (Daikin, LG, Samsung, Sony, Bosch) for next-day professional wall-mounting or installation.',
      },
    ],
    popularAppliances: [
      {
        category: 'Split Inverter Air Conditioners',
        models: 'Daikin & LG 1.5 Ton 5-Star Dual Inverter',
        avgSavings: '₹1,500 – ₹2,800 vs. Chain Stores',
      },
      {
        category: '4K Smart Televisions',
        models: 'Sony Bravia OLED & Samsung QLED 55"–65"',
        avgSavings: '₹2,000 – ₹4,500 with Local Warranty',
      },
      {
        category: 'Frost-Free Refrigerators',
        models: 'Samsung & LG 260L–450L Double Door & Side-by-Side',
        avgSavings: '₹1,200 – ₹3,000 with Immediate Unboxing',
      },
      {
        category: 'Front Load Washing Machines',
        models: 'Bosch & IFB 7kg–8kg AI Wash Inverter',
        avgSavings: '₹1,400 – ₹2,600 with Free Transit Safety',
      },
    ],
    faqs: [
      {
        question: 'How quickly can an appliance be delivered to Vasant Kunj?',
        answer:
          'Because our physical showroom is located at Dairy Farm, 80-B, Masoodpur, G/F right in Vasant Kunj, we offer express same-day dispatch. In-stock models are typically delivered to Sectors A, B, C, D, and Masoodpur within 2 to 3 hours of order confirmation.',
      },
      {
        question: 'Will the delivery team carry the heavy appliance up to my apartment floor?',
        answer:
          'Yes. Our white-glove delivery team brings the appliance straight inside your flat via lift or stairs. We never dump heavy boxes at the building entrance gate or curbside.',
      },
      {
        question: 'Can I inspect the appliance before making the payment?',
        answer:
          'Absolutely. We encourage customers to verify the intact manufacturer seal, serial numbers, and physical condition of the cabinet before completing payment via UPI or cash on delivery.',
      },
    ],
    metaTitle: 'Home Appliance Doorstep Delivery in Vasant Kunj | Sharma Bazaar',
    metaDescription:
      'Order TVs, ACs, refrigerators & washing machines with same-day 2–3 hr doorstep delivery in Vasant Kunj Sectors A, B, C, D & Masoodpur. Room carry-in, COD & seal check.',
  },

  // 2. Masoodpur & Kishangarh
  {
    slug: 'masoodpur-kishangarh',
    name: 'Masoodpur & Kishangarh',
    tagline: 'Immediate Walk-In & 90-Minute Doorstep Delivery (Opposite Flyover & Village)',
    pincodes: ['110070'],
    distanceFromShowroom: '0.1 – 1.5 km (Showroom Doorstep)',
    deliveryWindow: '90 Mins – 2 Hours (Instant Dispatch)',
    deliveryPill: 'Instant 90-Min Delivery',
    landmarkCoverage: [
      'Masoodpur Dairy Main Road',
      'Masoodpur Flyover Vicinity',
      'Kishangarh Main Market',
      'Kishangarh Gaon & Extension',
      'JNU South Gate Environs',
      'Baba Nagpal Corner',
    ],
    keySectors: ['Masoodpur Dairy', 'Masoodpur Village', 'Kishangarh', 'JNU Gate Area'],
    overview:
      'Located directly at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj, we offer instant 90-minute doorstep delivery to local families, tenants, and business owners across Masoodpur and Kishangarh. Visit our showroom in person or order via WhatsApp.',
    deliveryHighlights: [
      {
        title: '90-Minute Express Dispatch',
        description:
          'For in-stock models, our delivery personnel hand-carry or transport units directly to your doorstep within 90 minutes.',
      },
      {
        title: 'Narrow Alley Expertise',
        description:
          'Our porters easily navigate residential village lanes and multi-story builder floors safely.',
      },
      {
        title: 'Direct Local Showroom Warranty',
        description:
          'Walk into our showroom at any time with any questions or demo requests—we are right in your neighborhood.',
      },
      {
        title: 'Pay After Complete Inspection',
        description: 'Verify model and carton seals before paying cash or scanning our UPI QR code.',
      },
    ],
    popularAppliances: [
      {
        category: 'Inverter Air Conditioners',
        models: 'Voltas & Daikin 1.5 Ton Split ACs',
        avgSavings: '₹1,200 – ₹2,400 with Instant Delivery',
      },
      {
        category: 'Single & Double Door Fridges',
        models: 'Samsung & Haier 190L–260L Inverters',
        avgSavings: '₹1,000 – ₹2,000 vs. Regional Chains',
      },
      {
        category: 'Smart LED TVs',
        models: 'Mi, OnePlus & LG 32"–50" Full HD / 4K',
        avgSavings: '₹1,200 – ₹2,500 with GST Bill',
      },
      {
        category: 'Semi & Fully Automatic Washers',
        models: 'Whirlpool & LG 7kg Smart Inverters',
        avgSavings: '₹900 – ₹1,800 with Tap Connection Advice',
      },
    ],
    faqs: [
      {
        question: 'Can I see the appliance at the showroom before it gets delivered to my room in Masoodpur?',
        answer:
          'Yes! Visit Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj (opposite the flyover). Choose your appliance, verify the serial number, and we will dispatch it to your room immediately.',
      },
    ],
    metaTitle: 'Appliance Delivery in Masoodpur & Kishangarh | Sharma Bazaar',
    metaDescription:
      'Instant 90-min appliance delivery in Masoodpur & Kishangarh from Sharma Bazaar showroom (Dairy Farm, 80-B, Masoodpur, G/F). Great prices on ACs, TVs, fridges & washers with COD.',
  },

  // 3. Chattarpur & Sultanpur
  {
    slug: 'chattarpur',
    name: 'Chattarpur & Sultanpur',
    tagline: 'White-Glove Doorstep Appliance Delivery (Chattarpur Enclave, DLF Farms & 100 Feet Rd)',
    pincodes: ['110074'],
    distanceFromShowroom: '3.5 – 5.5 km',
    deliveryWindow: '3 – 4 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 4 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Chattarpur Enclave (Phase 1 & 2)',
      '100 Feet Road Corridor',
      'DLF Farms & Radhey Mohan Drive',
      'Sultanpur & MG Road Junction',
      'Chattarpur Temple Road',
      'Tivoli Garden Vicinity',
      'Dr. Ambedkar Colony',
      'Mandi Road',
    ],
    keySectors: [
      'Chattarpur Enclave Phase 1',
      'Chattarpur Enclave Phase 2',
      '100 Feet Road',
      'DLF Farms',
      'Sultanpur',
      'Mandi Road',
      'Chattarpur Metro Environs',
    ],
    overview:
      'Serving homes, builder floors, and farmhouses across Chattarpur, Sultanpur, and 100 Feet Road. We offer scheduled same-day delivery on all major appliances with dedicated transit vans and two-person carry teams equipped for multi-story builder flats.',
    deliveryHighlights: [
      {
        title: 'Multi-Story Builder Flat Delivery',
        description:
          'Our specialized delivery staff handles narrow staircases and builder floors with protective appliance blankets and safety strapping.',
      },
      {
        title: 'Hard-Water Appliance Advice',
        description:
          'We supply washing machines with built-in scale filters and anti-rust copper condensers suited for local ground water.',
      },
      {
        title: 'Inspect First, Pay Later',
        description:
          'Verify your TV or refrigerator model number and exterior before paying via phone UPI or cash at your doorstep.',
      },
      {
        title: 'Direct Masoodpur Support',
        description:
          'Need demo or replacement? Our showroom is just 10 minutes away on the main road opposite Masoodpur flyover.',
      },
    ],
    popularAppliances: [
      {
        category: 'Large Capacity Refrigerators',
        models: 'Double Door & Side-by-Side 350L–600L Inverter',
        avgSavings: '₹1,800 – ₹3,500 vs. Online Retail',
      },
      {
        category: 'Heavy-Duty Air Conditioners',
        models: 'Daikin, Voltas & Blue Star 1.5 & 2.0 Ton Split Inverters',
        avgSavings: '₹1,500 – ₹3,200 with Prompt Delivery',
      },
      {
        category: 'Large Smart Televisions',
        models: 'Sony Bravia 65" 4K Google TV & LG UHD',
        avgSavings: '₹2,500 – ₹5,000 with Verified Seal',
      },
      {
        category: 'Washing Machines',
        models: 'LG & Samsung 7.5kg–9kg Smart Inverter Washers',
        avgSavings: '₹1,200 – ₹2,400 with Tap Point Setup Help',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to builder floors in Chattarpur Enclave?',
        answer:
          'Yes! A large percentage of our Chattarpur deliveries are to builder floors. Our delivery teams are experienced in safely navigating staircases to deliver refrigerators, TVs, and washing machines right into your home.',
      },
      {
        question: 'Can I pay via UPI when the delivery arrives in Chattarpur?',
        answer:
          'Yes, our delivery executive carries an official Sharma Bazaar dynamic UPI QR code. You can pay via Google Pay, PhonePe, Paytm, or net banking once the box is inspected inside your flat.',
      },
    ],
    metaTitle: 'Home Appliance Doorstep Delivery in Chattarpur & Sultanpur | Sharma Bazaar',
    metaDescription:
      'Same-day appliance doorstep delivery in Chattarpur Enclave, 100 Feet Road & Sultanpur. Split ACs, 4K TVs, refrigerators & washers with room carry-in & COD.',
  },

  // 4. Sultanpur & Ghitorni
  {
    slug: 'sultanpur-ghitorni',
    name: 'Sultanpur & Ghitorni',
    tagline: 'Rapid Appliance Delivery along MG Road & Farmhouse Belts',
    pincodes: ['110030'],
    distanceFromShowroom: '4.0 – 6.5 km',
    deliveryWindow: '3 – 4 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 4 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Ghitorni Metro Station & MG Road Belt',
      'Ghitorni Village & Furniture Market',
      'Gadaipur & Silver Oak Farms',
      'Zero Number Road',
      'Sultanpur Metro Corridor',
      'CDR Chowk & MG Road Junction',
    ],
    keySectors: ['Ghitorni', 'Gadaipur', 'Sultanpur', 'Zero Number Rd', 'Silver Oak Farms'],
    overview:
      'Direct delivery along MG Road and the farmhouse belts of Ghitorni and Gadaipur. We cater to high-capacity refrigeration, multi-split ACs, and water dispensers for luxury villas and corporate studios.',
    deliveryHighlights: [
      {
        title: 'Farmhouse & Villa Transport',
        description:
          'Equipped to navigate long private driveways and estate gates with protective transit wrapping.',
      },
      {
        title: 'High-Tonnage Cooling Systems',
        description: 'Daikin and Blue Star 2.0 Ton split ACs built for high ceiling villa rooms.',
      },
      {
        title: 'B2B GST Tax Invoicing',
        description: 'Instant tax invoices for farm offices and commercial design studios.',
      },
      {
        title: 'Doorstep Unboxing Verification',
        description: 'Full unboxing inside your living area before payment.',
      },
    ],
    popularAppliances: [
      {
        category: 'High-Tonnage Split ACs',
        models: 'Daikin & Blue Star 2.0 Ton Heavy Duty 5-Star',
        avgSavings: '₹2,000 – ₹3,800 vs. Chain Stores',
      },
      {
        category: 'Side-by-Side Refrigerators',
        models: 'LG French Door & Samsung 653L Smart Inverters',
        avgSavings: '₹3,500 – ₹7,000 with Flat Placement',
      },
      {
        category: 'Hot & Cold Water Dispensers',
        models: 'Voltas & Blue Star Floor Standing Cabinets',
        avgSavings: '₹800 – ₹1,500 with Prompt Transit',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to farmhouses on Gadaipur and Zero Number Road?',
        answer:
          'Yes, our delivery vehicles regularly service farmhouses and private estates across Ghitorni, Gadaipur, and Sultanpur.',
      },
    ],
    metaTitle: 'Appliance Delivery in Sultanpur & Ghitorni | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Sultanpur & Ghitorni along MG Road. 2 Ton ACs, French door fridges & water dispensers with room delivery & COD.',
  },

  // 5. Mahipalpur & Rangpuri
  {
    slug: 'mahipalpur',
    name: 'Mahipalpur & Rangpuri',
    tagline: 'Fast Delivery to Residential Pockets, Hotels & NH-48 Corridor',
    pincodes: ['110037'],
    distanceFromShowroom: '2.5 – 4.5 km',
    deliveryWindow: '3 – 4 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 4 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Mahipalpur Extension & L-Block',
      'Vasant Kunj Road Corridor',
      'Rangpuri & A-Block Environs',
      'Radisson Blu Junction',
      'NH-48 Commercial Area',
      'Mata Chowk & Dairy Road',
    ],
    keySectors: ['Mahipalpur Extension', 'L-Block', 'Rangpuri', 'Vasant Kunj Road', 'NH-48'],
    overview:
      'Strategically located between Vasant Kunj and NH-48, Sharma Bazaar provides rapid same-day appliance supply to residences, guest houses, boutique hotels, and offices across Mahipalpur and Rangpuri.',
    deliveryHighlights: [
      {
        title: 'Residential & Hospitality Supply',
        description: 'Single home appliances and bulk hotel cooling/water dispenser units.',
      },
      {
        title: '18%/28% GST Invoicing',
        description: 'Eligible for business Input Tax Credit (ITC).',
      },
      {
        title: 'Fast Transit via Nelson Mandela Marg',
        description: 'Direct 10-minute transit with zero vehicle bouncing or shock damage.',
      },
      {
        title: 'Payment on Physical Inspection',
        description: 'Confirm factory seal and cabinet condition at your doorstep.',
      },
    ],
    popularAppliances: [
      {
        category: 'Water Dispensers',
        models: 'Voltas & Blue Star Floor-Standing with Refrigerator Cabinet',
        avgSavings: '₹800 – ₹1,600 vs. Market',
      },
      {
        category: 'Split Inverter ACs',
        models: 'Voltas & Daikin 1.5 Ton High-Ambient Cooling',
        avgSavings: '₹1,500 – ₹2,800 with Express Delivery',
      },
      {
        category: 'Smart Televisions',
        models: 'LG 43" & 50" 4K UHD Smart TVs',
        avgSavings: '₹1,400 – ₹3,000 with Local Warranty',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to hotels and guest houses in Mahipalpur?',
        answer:
          'Yes, we regularly fulfill both single-unit home orders and bulk appliance orders for guest houses, service apartments, and offices in Mahipalpur and Rangpuri.',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery Mahipalpur & Rangpuri | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Mahipalpur & Rangpuri. ACs, commercial water dispensers, TVs & fridges with GST tax invoicing and doorstep verification.',
  },

  // 6. Aerocity
  {
    slug: 'aerocity',
    name: 'Aerocity & Hospitality District',
    tagline: 'Commercial & Executive Residence Fast Delivery (Worldmark & Hotel Hub)',
    pincodes: ['110037'],
    distanceFromShowroom: '3.0 – 4.5 km',
    deliveryWindow: '3 – 4 Hours (Priority Dispatch)',
    deliveryPill: '3 - 4 Hrs Priority Delivery',
    landmarkCoverage: [
      'Worldmark 1, 2, 3 Offices',
      'Aerocity Metro Station Vicinity',
      'Hospitality District Hotels',
      'Northern Access Road Corridor',
      'Asset Area 1–10',
    ],
    keySectors: ['Worldmark', 'Aerocity Hub', 'Hotel District', 'Asset Area'],
    overview:
      'Serving corporate offices, executive residences, and hotel facilities across the Delhi Aerocity hub with direct B2B billing and priority white-glove logistics.',
    deliveryHighlights: [
      {
        title: 'Security Clearance Compliance',
        description: 'Delivery personnel carry verified government IDs and documentation for gated commercial complexes.',
      },
      {
        title: 'Commercial Refrigeration & Dispensers',
        description: 'Ideal for pantries, breakrooms, and executive hospitality suites.',
      },
      {
        title: 'Express 3-Hour Transit',
        description: 'Just 8 minutes down the road via Nelson Mandela Marg.',
      },
      {
        title: 'B2B GST Tax Bill',
        description: 'Full tax invoice for corporate accounts.',
      },
    ],
    popularAppliances: [
      {
        category: 'Commercial Dispensers',
        models: 'Blue Star & Voltas Floor-Standing Hot/Cold',
        avgSavings: '₹900 – ₹1,800 vs. Retail',
      },
      {
        category: 'Pantry Microwaves',
        models: 'Samsung & LG Solo & Convection Ovens',
        avgSavings: '₹700 – ₹1,500 with Quick Handover',
      },
      {
        category: 'Display & Conference TVs',
        models: 'Sony Bravia 65"–75" Commercial 4K Displays',
        avgSavings: '₹3,000 – ₹7,000 with OEM Support',
      },
    ],
    faqs: [
      {
        question: 'Can you deliver to Worldmark office towers in Aerocity?',
        answer: 'Yes, our teams regularly deliver to office pantries and executive suites with proper gate passes.',
      },
    ],
    metaTitle: 'Appliance Delivery Aerocity Delhi & Worldmark | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Delhi Aerocity & Worldmark. Commercial water dispensers, smart TVs, microwaves & fridges with GST tax invoicing.',
  },

  // 7. Vasant Vihar & Shanti Niketan
  {
    slug: 'vasant-vihar',
    name: 'Vasant Vihar & Shanti Niketan',
    tagline: 'Premium White-Glove Appliance Delivery (Blocks A to F & Paschimi Marg)',
    pincodes: ['110057'],
    distanceFromShowroom: '4.0 – 6.0 km',
    deliveryWindow: '3 – 5 Hours (Scheduled Premium Delivery)',
    deliveryPill: '3 - 5 Hrs White-Glove Delivery',
    landmarkCoverage: [
      'Vasant Vihar Blocks A, B, C, D, E, F',
      'Paschimi Marg & Poorvi Marg',
      'Priya PVR Cinema Complex Environs',
      'Basant Lok Community Centre',
      'Shanti Niketan & Anand Niketan',
      'Munirka Enclave & DDA Flats',
    ],
    keySectors: [
      'Block A',
      'Block B',
      'Block C',
      'Block D',
      'Block E',
      'Block F',
      'Shanti Niketan',
      'Anand Niketan',
    ],
    overview:
      'Vasant Vihar, Shanti Niketan, and Anand Niketan households demand meticulous handling, premium aesthetics, and authentic manufacturer guarantees. Sharma Bazaar delivers top-tier OLED TVs, multi-door French refrigerators, and premium front-load washers with utmost care.',
    deliveryHighlights: [
      {
        title: 'Floor Protection & Upright Transport',
        description:
          'Our personnel use rubberized dollies and protective padding to safeguard marble, hardwood, and designer tiles during transit.',
      },
      {
        title: 'Flagship OLED Specialists',
        description:
          'Specialist handling for Sony Bravia XR OLEDs, Bosch Series 8 Washers, and LG InstaView French door refrigerators.',
      },
      {
        title: 'Pre-Delivery Seal & Serial Match',
        description:
          'Model serial numbers on the box match the invoice exactly, ensuring complete manufacturer warranty validity.',
      },
      {
        title: 'Tailored Delivery Scheduling',
        description:
          'Choose a specific 2-hour window that fits your schedule, avoiding inconvenient random courier arrivals.',
      },
    ],
    popularAppliances: [
      {
        category: 'Flagship OLED & QLED TVs',
        models: 'Sony Bravia XR Master Series 65" / 75" & LG OLED C3/G3',
        avgSavings: '₹3,500 – ₹8,000 below Corporate Store MSRP',
      },
      {
        category: 'Side-by-Side & French Door Refrigerators',
        models: 'Samsung Bespoke & LG InstaView Multi-Door',
        avgSavings: '₹4,000 – ₹9,000 with White-Glove Setup',
      },
      {
        category: 'Premium Front Load Washers & Dryers',
        models: 'Bosch Series 8 & IFB Executive 9kg Washer-Dryers',
        avgSavings: '₹2,000 – ₹4,500 with Express Scheduling',
      },
      {
        category: '5-Star Copper Inverter ACs',
        models: 'Daikin FTKM series & Hitachi Heavy-Duty Inverters',
        avgSavings: '₹1,800 – ₹3,500 with Certified Installers',
      },
    ],
    faqs: [
      {
        question: 'How do you ensure safe handling of high-end OLED TVs in Vasant Vihar?',
        answer:
          'Our logistics vans are equipped with shock-absorbing upright racks. We never lay flat-screen OLED or large QLED televisions flat. Delivery personnel carry the unit upright and unpack it gently in your living room.',
      },
      {
        question: 'Can we schedule a specific delivery time in the evening?',
        answer:
          'Yes. Unlike standard online couriers who give broad 10-hour windows, you can agree on an exact 2-hour delivery slot with our showroom team.',
      },
    ],
    metaTitle: 'Premium Appliance Delivery Vasant Vihar & Shanti Niketan | Sharma Bazaar',
    metaDescription:
      'White-glove appliance delivery in Vasant Vihar Blocks A-F & Shanti Niketan. Sony OLEDs, Bosch washers, LG French-door fridges with room carry-in & seal check.',
  },

  // 8. Munirka & JNU
  {
    slug: 'munirka-jnu',
    name: 'Munirka & JNU Enclave',
    tagline: 'Prompt Delivery to Flats, Student Residencies & DDA Colonies',
    pincodes: ['110067'],
    distanceFromShowroom: '2.5 – 4.0 km',
    deliveryWindow: '2 – 3 Hours (Express Same-Day)',
    deliveryPill: '2 - 3 Hrs Express Delivery',
    landmarkCoverage: [
      'Munirka Enclave & DDA Flats',
      'Munirka Village & Main Market',
      'Jawaharlal Nehru University (JNU Campus)',
      'Ber Sarai & Katwaria Sarai',
      'Nelson Mandela Marg Outer Ring Junction',
      'Munirka Metro Station Environs',
    ],
    keySectors: ['Munirka Enclave', 'Munirka Village', 'JNU Campus', 'Ber Sarai', 'Katwaria Sarai'],
    overview:
      'Just minutes away across Nelson Mandela Marg. We supply professors, students, researchers, and families in Munirka Enclave and JNU with compact refrigerators, energy-saving split ACs, and reliable washing machines.',
    deliveryHighlights: [
      {
        title: 'Staircase & Floor Delivery',
        description: 'Our two-man delivery teams carry appliances up multi-floor DDA flats with ease.',
      },
      {
        title: 'Student & Faculty Friendly Pricing',
        description: 'Save ₹1,000–₹2,500 on everyday essentials like single-door fridges and microwave ovens.',
      },
      {
        title: 'Express 2-Hour Turnaround',
        description: 'Direct transit down Nelson Mandela Marg from our Masoodpur showroom.',
      },
      {
        title: 'UPI / Cash on Delivery',
        description: 'Verify the box seals before making final payment.',
      },
    ],
    popularAppliances: [
      {
        category: 'Energy Efficient ACs',
        models: 'Daikin & LG 1.5 Ton 3-Star & 5-Star Split ACs',
        avgSavings: '₹1,500 – ₹2,600 with Fast Setup',
      },
      {
        category: 'Single & Double Door Fridges',
        models: 'Samsung & Haier 190L–240L Smart Inverters',
        avgSavings: '₹1,000 – ₹2,200 with In-Room Carry',
      },
      {
        category: 'Top Load Washers',
        models: 'Whirlpool & LG 7kg Fully Automatic',
        avgSavings: '₹1,100 – ₹2,000 with Free Plumbing Pipe',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver inside JNU Campus residential quarters?',
        answer: 'Yes, our delivery vehicles have standard Delhi permits and regularly deliver right to faculty and staff residences in JNU.',
      },
    ],
    metaTitle: 'Appliance Delivery in Munirka & JNU | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Munirka Enclave, DDA Flats, JNU & Ber Sarai. 2–3 hr dispatch on ACs, refrigerators, TVs & washers with room carry-in.',
  },

  // 9. Saket & Press Enclave
  {
    slug: 'saket',
    name: 'Saket & Press Enclave',
    tagline: 'Reliable Doorstep Electronics Delivery (Blocks J, K, M, N & Press Enclave)',
    pincodes: ['110017'],
    distanceFromShowroom: '5.5 – 8.0 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Saket Blocks J, K, L, M, N',
      'Press Enclave Marg & Saket DDA Flats',
      'Select Citywalk & DLF South Court Vicinity',
      'Anupam Enclave & Paryavaran Complex',
      'Max Hospital Saket Residential Area',
      'Saket Metro Station Corridor',
    ],
    keySectors: ['Saket Block J', 'Saket Block M', 'Saket Block N', 'Press Enclave', 'Anupam Enclave'],
    overview:
      'Serving residential communities across Saket with honest showroom pricing that consistently beats mall chains like Croma and Reliance Digital. Enjoy direct showroom delivery right to your door with zero shipping surcharge.',
    deliveryHighlights: [
      {
        title: 'Price Beat vs. Mall Retailers',
        description: 'Save ₹1,500 to ₹4,000 compared to Select Citywalk and local mall outlets.',
      },
      {
        title: 'Direct Distributor Stock',
        description: 'All appliances are sourced directly from brand distributors with unbroken factory seals.',
      },
      {
        title: 'In-Room Carry-In',
        description: 'Delivered directly into your apartment living room or utility area.',
      },
      {
        title: 'Payment on Verification',
        description: 'Confirm model specifications, voltage labels, and carton seals before paying.',
      },
    ],
    popularAppliances: [
      {
        category: 'Inverter Split Air Conditioners',
        models: 'Daikin, LG & Blue Star 1.5 Ton 5-Star Copper',
        avgSavings: '₹1,500 – ₹3,000 vs. Mall Retailers',
      },
      {
        category: 'Frost-Free Refrigerators',
        models: 'Samsung & Haier Bottom Mounted & Side-by-Side',
        avgSavings: '₹1,800 – ₹3,800 with Room Carry-in',
      },
      {
        category: '4K Ultra HD Smart TVs',
        models: 'LG 4K UHD & Sony Bravia Google TVs 50"–65"',
        avgSavings: '₹2,000 – ₹4,200 with Local Support',
      },
    ],
    faqs: [
      {
        question: 'Why buy from Sharma Bazaar instead of shopping at Saket mall outlets?',
        answer:
          'Mall retail stores in Saket carry huge rental overheads that are baked into their prices. Because Sharma Bazaar operates from our showroom at Dairy Farm, 80-B, Masoodpur, G/F, Vasant Kunj, we pass wholesale distributor savings directly to you—offering up to ₹1,000–₹5,000 in savings on select models with identical OEM warranties.',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery in Saket & Press Enclave | Sharma Bazaar',
    metaDescription:
      'Save ₹1,500–₹5,000 on TVs, ACs, refrigerators & washing machines in Saket. Same-day doorstep delivery, unboxing & payment on seal inspection.',
  },

  // 10. Sainik Farm & Neb Sarai
  {
    slug: 'sainik-farm',
    name: 'Sainik Farm & Neb Sarai',
    tagline: 'Direct Delivery to Villas, Farmhouses & Freedom Fighters Enclave',
    pincodes: ['110062', '110068'],
    distanceFromShowroom: '6.0 – 8.5 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Western Avenue & Central Avenue',
      'Country Club & Forest Lane',
      'Freedom Fighters Enclave',
      'Neb Sarai & IGNOU Road',
      'Paryavaran Complex',
      'Saket South Gate Environs',
    ],
    keySectors: ['Western Avenue', 'Central Avenue', 'Forest Lane', 'Freedom Fighters Enclave', 'Neb Sarai'],
    overview:
      'Providing prompt doorstep delivery to villas and farmhouses across Sainik Farm and Neb Sarai. We supply premium side-by-side refrigerators, large screen 4K TVs, and heavy duty inverter split ACs.',
    deliveryHighlights: [
      {
        title: 'Spacious Villa Delivery',
        description: 'Transport vehicles equipped for long driveways and large estate gates.',
      },
      {
        title: 'Premium Brand Selection',
        description: 'Sony OLED TVs, Samsung Bespoke refrigerators, and Daikin 5-star cooling.',
      },
      {
        title: 'Hard-Water Protection Advice',
        description: 'Washing machines and dispensers chosen to handle local borewell conditions.',
      },
      {
        title: 'COD / UPI After Inspection',
        description: 'Inspect factory seals before completing payment.',
      },
    ],
    popularAppliances: [
      {
        category: 'Side-by-Side Refrigerators',
        models: 'LG InstaView & Samsung 650L Inverters',
        avgSavings: '₹3,500 – ₹7,500 vs. City Stores',
      },
      {
        category: '65"–75" 4K Smart TVs',
        models: 'Sony Bravia Google TV & Samsung QLED',
        avgSavings: '₹3,000 – ₹6,000 with Safe Transit',
      },
      {
        category: '2.0 Ton Inverter ACs',
        models: 'Daikin & Blue Star Copper 5-Star Split ACs',
        avgSavings: '₹2,000 – ₹3,500 with Quick Installation',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to interior avenues of Sainik Farm?',
        answer: 'Yes, our vans deliver along Western Avenue, Central Avenue, and throughout Sainik Farm.',
      },
    ],
    metaTitle: 'Appliance Delivery in Sainik Farm & Neb Sarai | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Sainik Farm & Freedom Fighters Enclave. Side-by-side fridges, OLED TVs & 2 Ton ACs with room delivery & COD.',
  },

  // 11. Malviya Nagar & Shivalik
  {
    slug: 'malviya-nagar',
    name: 'Malviya Nagar & Shivalik',
    tagline: 'Prompt Delivery across Malviya Nagar Main Market & Shivalik Colony',
    pincodes: ['110017'],
    distanceFromShowroom: '5.0 – 7.0 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Malviya Nagar Main Market',
      'Shivalik Colony (A, B, C Blocks)',
      'Geeta Colony & Sarviya Vihar',
      'Khirki Extension & Village',
      'Panchsheel Enclave Border',
      'Malviya Nagar Metro Station Corridor',
    ],
    keySectors: ['Shivalik A Block', 'Shivalik B Block', 'Main Market', 'Khirki Ext', 'Geeta Colony'],
    overview:
      'Serving residents of Malviya Nagar and Shivalik Colony with competitive distributor pricing that beats local market retail quotes by ₹1,000 to ₹3,000.',
    deliveryHighlights: [
      {
        title: 'Floor-by-Floor Delivery',
        description: 'Experienced teams handling multi-story builder floors and stairwells.',
      },
      {
        title: 'Competitive Local Price Guarantee',
        description: 'Send us any quote from local market shops and we will match or beat it.',
      },
      {
        title: 'Express Same-Day Transit',
        description: 'Dispatched directly from Masoodpur via Mehrauli-Badarpur route.',
      },
      {
        title: 'Doorstep Seal Verification',
        description: 'Check brand box seals and serial numbers before paying.',
      },
    ],
    popularAppliances: [
      {
        category: 'Split Inverter ACs',
        models: 'Daikin & LG 1.5 Ton 5-Star Dual Inverter',
        avgSavings: '₹1,500 – ₹2,800 vs. Local Dealers',
      },
      {
        category: 'Double Door Refrigerators',
        models: 'Samsung & Whirlpool 265L–340L Frost-Free',
        avgSavings: '₹1,200 – ₹2,500 with Prompt Delivery',
      },
      {
        category: 'Front Load Washers',
        models: 'Bosch Serie 6 & IFB Senator 8kg',
        avgSavings: '₹1,500 – ₹2,700 with Unboxing',
      },
    ],
    faqs: [
      {
        question: 'How quickly can an AC be delivered to Shivalik Colony?',
        answer: 'Typically within 3 to 4 hours of confirmation from our Masoodpur showroom.',
      },
    ],
    metaTitle: 'Home Appliance Delivery Malviya Nagar & Shivalik | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Malviya Nagar & Shivalik Colony. Daikin ACs, Samsung fridges & Bosch washing machines with doorstep unboxing & COD.',
  },

  // 12. Hauz Khas & SDA
  {
    slug: 'hauz-khas',
    name: 'Hauz Khas & Safdarjung Dev Area (SDA)',
    tagline: 'Prompt Delivery Across South Central Delhi (Aurobindo Marg & SDA)',
    pincodes: ['110016'],
    distanceFromShowroom: '5.0 – 7.5 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Hauz Khas Enclave & Main Market',
      'Hauz Khas Village Corridor',
      'Safdarjung Development Area (SDA Blocks C to K)',
      'Sarvapriya Vihar & Kalu Sarai',
      'IIT Delhi & NCERT Residential Environs',
      'Aurobindo Marg Corridor',
    ],
    keySectors: ['Hauz Khas Enclave', 'SDA', 'Sarvapriya Vihar', 'Kalu Sarai', 'IIT Gate Area'],
    overview:
      'Providing prompt doorstep appliance deliveries to professors, doctors, young families, and professionals across Hauz Khas, SDA, and Sarvapriya Vihar via Outer Ring Road.',
    deliveryHighlights: [
      {
        title: 'Swift Transit via Outer Ring Road',
        description: 'Reaches Hauz Khas and SDA within 20 minutes from our showroom base.',
      },
      {
        title: '100% Brand Guarantee',
        description: 'Every appliance carries genuine manufacturer warranty and invoice.',
      },
      {
        title: 'Hassle-Free UPI / Cash Payment',
        description: 'Pay right at your doorstep after inspecting original seals.',
      },
      {
        title: 'Full Installation Handover',
        description: 'We coordinate with company engineers for fast wall mounting and electrical setup.',
      },
    ],
    popularAppliances: [
      {
        category: 'Front Load Washing Machines',
        models: 'Bosch Serie 6 & IFB Senator Smart Inverter',
        avgSavings: '₹1,500 – ₹2,800 vs. Market',
      },
      {
        category: 'Inverter Split ACs',
        models: 'Daikin & LG 1.5 Ton 5-Star Split ACs',
        avgSavings: '₹1,600 – ₹3,000 with Rapid Dispatch',
      },
      {
        category: 'Smart 4K Televisions',
        models: 'Sony Bravia 55"–65" Google TVs',
        avgSavings: '₹2,200 – ₹4,500 with OEM Support',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to SDA and Sarvapriya Vihar?',
        answer: 'Yes, we provide same-day doorstep deliveries across Hauz Khas Enclave, SDA, and Sarvapriya Vihar.',
      },
    ],
    metaTitle: 'Home Appliance Doorstep Delivery Hauz Khas & SDA | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Hauz Khas & SDA. Smart TVs, Daikin ACs, Bosch washing machines & fridges with doorstep unboxing & COD.',
  },

  // 13. Green Park & Gulmohar Park
  {
    slug: 'green-park',
    name: 'Green Park & Gulmohar Park',
    tagline: 'White-Glove Delivery Across Green Park Main, Extension & Gulmohar Park',
    pincodes: ['110016', '110049'],
    distanceFromShowroom: '5.5 – 8.0 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Green Park Main & Market',
      'Green Park Extension',
      'Gulmohar Park (A to D Blocks)',
      'Gautam Nagar & Uphaar Complex Area',
      'Yusuf Sarai Market Environs',
      'AIIMS Doctor Residential Quarters',
    ],
    keySectors: ['Green Park Main', 'Green Park Ext', 'Gulmohar Park', 'Gautam Nagar', 'Yusuf Sarai'],
    overview:
      'Serving homes, medical professionals, and long-time residents across Green Park and Gulmohar Park with premium white-glove electronics delivery and dedicated after-sales coordination.',
    deliveryHighlights: [
      {
        title: 'Floor-Care Room Delivery',
        description: 'Trained porters bring heavy appliances right into your kitchen or utility room.',
      },
      {
        title: 'Direct Wholesale Pricing',
        description: 'Substantial savings vs. traditional high-rent South Delhi market outlets.',
      },
      {
        title: 'Pre-Payment Box Verification',
        description: 'Inspect the unit in your home before authorizing payment.',
      },
      {
        title: 'Official Installation Setup',
        description: 'Prompt coordination with brand engineers within 24 hours.',
      },
    ],
    popularAppliances: [
      {
        category: 'Frost-Free Refrigerators',
        models: 'LG & Samsung 300L–450L Double Door & Side-by-Side',
        avgSavings: '₹1,500 – ₹3,200 vs. High Street Stores',
      },
      {
        category: 'Inverter Split ACs',
        models: 'Daikin & Hitachi 1.5 Ton 5-Star Split ACs',
        avgSavings: '₹1,800 – ₹3,200 with Rapid Dispatch',
      },
      {
        category: 'Front Load Washers',
        models: 'Bosch & Samsung 8kg AI Wash Inverter',
        avgSavings: '₹1,400 – ₹2,600 with Free Pipe Setup',
      },
    ],
    faqs: [
      {
        question: 'Can you deliver an appliance to Green Park Extension today?',
        answer: 'Yes! For orders confirmed by early afternoon, we deliver the same evening directly to your flat.',
      },
    ],
    metaTitle: 'Appliance Delivery in Green Park & Gulmohar Park | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Green Park & Gulmohar Park. Daikin ACs, Samsung refrigerators & Bosch washers with in-room carry-in & COD.',
  },

  // 14. Safdarjung Enclave
  {
    slug: 'safdarjung-enclave',
    name: 'Safdarjung Enclave',
    tagline: 'Prompt Delivery Across Blocks A to F & Kamal Cinema Corridor',
    pincodes: ['110029'],
    distanceFromShowroom: '5.5 – 7.5 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Safdarjung Enclave (Blocks A, B, C, D, E, F)',
      'Kamal Cinema & B-6 Market Environs',
      'Arjun Nagar & Humayunpur',
      'Africa Avenue Corridor',
      'Deer Park Environs',
    ],
    keySectors: ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block F', 'Arjun Nagar'],
    overview:
      'Delivering directly to independent houses, builder floors, and apartments throughout Safdarjung Enclave with safe handling, unbroken seals, and transparent pricing.',
    deliveryHighlights: [
      {
        title: 'Builder Floor Stairwell Care',
        description: 'Careful navigation of apartment stairways with protective wrapping.',
      },
      {
        title: 'Unbroken Factory Guarantee',
        description: 'Original brand carton seals and GST invoice for registered warranty.',
      },
      {
        title: 'COD & Dynamic UPI',
        description: 'Scan and pay on delivery after inspecting your appliance.',
      },
      {
        title: 'Quick 24-Hr Installation',
        description: 'Brand certified installation teams booked on dispatch.',
      },
    ],
    popularAppliances: [
      {
        category: 'Split ACs',
        models: 'LG Dual Inverter & Daikin 1.5 Ton 5-Star',
        avgSavings: '₹1,500 – ₹2,800 vs. Chain Outlets',
      },
      {
        category: '4K Smart Televisions',
        models: 'Sony Bravia & Samsung 55" 4K Smart TVs',
        avgSavings: '₹2,000 – ₹4,200 with Local Warranty',
      },
    ],
    faqs: [
      {
        question: 'Do you carry refrigerators upstairs to 3rd floor builder flats in Safdarjung Enclave?',
        answer: 'Yes! Our two-person team will carry the unit directly into your flat.',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery Safdarjung Enclave | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Safdarjung Enclave Blocks A-F. ACs, TVs, fridges & washers with in-room carry-in & payment after inspection.',
  },

  // 15. Panchsheel Park & Panchsheel Enclave
  {
    slug: 'panchsheel-park',
    name: 'Panchsheel Park & Panchsheel Enclave',
    tagline: 'White-Glove Luxury Appliance Delivery (North & South Blocks & Outer Ring Rd)',
    pincodes: ['110017', '110049'],
    distanceFromShowroom: '6.0 – 8.5 km',
    deliveryWindow: '3 – 5 Hours (Premium White-Glove)',
    deliveryPill: '3 - 5 Hrs White-Glove Delivery',
    landmarkCoverage: [
      'Panchsheel Park North (Blocks A, B, C)',
      'Panchsheel Park South (Blocks N, S)',
      'Panchsheel Enclave & Community Centre',
      'Shahpur Jat Designer Belt Border',
      'August Kranti Marg & Outer Ring Road Corridor',
    ],
    keySectors: ['Panchsheel North', 'Panchsheel South', 'Panchsheel Enclave', 'August Kranti Marg'],
    overview:
      'Supplying high-end homes and bungalows across Panchsheel Park and Panchsheel Enclave with premium OLED TVs, multi-door refrigerators, and quiet inverter washing machines.',
    deliveryHighlights: [
      {
        title: 'White-Glove Floor Care',
        description: 'Rubberized transport gear designed to protect hardwood and imported stone.',
      },
      {
        title: 'Flagship Models In Stock',
        description: 'Sony Master Series OLEDs, Bosch Series 8, and Samsung French Door fridges.',
      },
      {
        title: 'Exact 2-Hour Delivery Slots',
        description: 'Coordinate an exact arrival time with our showroom dispatch team.',
      },
      {
        title: 'Inspect First, Pay on Delivery',
        description: 'Verify model, finish, and unbroken seals before payment.',
      },
    ],
    popularAppliances: [
      {
        category: 'Flagship OLED Televisions',
        models: 'Sony Bravia XR OLED 65"/77" & LG G3 Series',
        avgSavings: '₹4,000 – ₹9,000 below Corporate Store MSRP',
      },
      {
        category: 'Multi-Door French Refrigerators',
        models: 'Samsung Bespoke 4-Door & LG InstaView 674L',
        avgSavings: '₹4,500 – ₹10,000 with In-Room Setup',
      },
    ],
    faqs: [
      {
        question: 'Do you offer white-glove setup for luxury OLED TVs in Panchsheel Park?',
        answer: 'Yes, we handle upright transport, in-room placement, and coordinate premier brand wall-mount installation.',
      },
    ],
    metaTitle: 'Luxury Appliance Delivery Panchsheel Park & Enclave | Sharma Bazaar',
    metaDescription:
      'White-glove appliance delivery in Panchsheel Park & Panchsheel Enclave. Sony OLED TVs, French door refrigerators & Bosch washers with in-room carry-in.',
  },

  // 16. Greater Kailash 1 (GK 1)
  {
    slug: 'greater-kailash-1',
    name: 'Greater Kailash 1 (GK 1)',
    tagline: 'Premium Appliance Delivery across M & N Blocks, Pamposh Enclave & Hemkunt',
    pincodes: ['110048'],
    distanceFromShowroom: '7.5 – 10.0 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'GK 1 M-Block & N-Block Markets',
      'Blocks A, B, C, R, S, W, N',
      'Pamposh Enclave',
      'Hemkunt Colony',
      'Kailash Colony Metro Vicinity',
      'Archana Shopping Complex Corridor',
    ],
    keySectors: ['M-Block', 'N-Block', 'Pamposh Enclave', 'Hemkunt Colony', 'Block R', 'Block S'],
    overview:
      'Serving GK 1 residents with genuine showroom pricing that substantially beats upscale local market shops. Large screen smart TVs, side-by-side refrigerators, and 5-star ACs delivered safely.',
    deliveryHighlights: [
      {
        title: 'Huge Savings vs. GK High Street',
        description: 'Save ₹2,000–₹6,000 on major brands without high market retail markups.',
      },
      {
        title: 'Careful In-Flat Delivery',
        description: 'Two-person team ensures smooth transport through lifts and staircases.',
      },
      {
        title: 'Authentic Sealed Units',
        description: 'Unbroken factory seals inspected with you before payment.',
      },
      {
        title: '24-Hour Brand Setup',
        description: 'Manufacturer technicians booked immediately upon dispatch.',
      },
    ],
    popularAppliances: [
      {
        category: 'Premium Smart TVs',
        models: 'Sony Bravia 55"–65" 4K Google TV & Samsung QLED',
        avgSavings: '₹2,500 – ₹5,500 vs. Local GK Retailers',
      },
      {
        category: 'Double Door & French Fridges',
        models: 'LG 360L–500L Inverter Frost-Free',
        avgSavings: '₹2,000 – ₹4,500 with In-Room Placement',
      },
      {
        category: 'Inverter Split ACs',
        models: 'Daikin & LG 1.5 Ton 5-Star Dual Inverter',
        avgSavings: '₹1,800 – ₹3,500 with Prompt Delivery',
      },
    ],
    faqs: [
      {
        question: 'Why order from Sharma Bazaar when living in GK 1?',
        answer: 'You get identical factory-fresh products with identical warranties while saving thousands compared to high-street market overheads.',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery in Greater Kailash 1 (GK 1) | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Greater Kailash 1 (GK 1). Save ₹2,000–₹6,000 on Sony TVs, Daikin ACs, LG fridges & Bosch washers with COD.',
  },

  // 17. Greater Kailash 2 (GK 2)
  {
    slug: 'greater-kailash-2',
    name: 'Greater Kailash 2 (GK 2)',
    tagline: 'Direct Delivery to M-Block Market Environs, Masjid Moth & Savitri Cinema',
    pincodes: ['110048'],
    distanceFromShowroom: '8.0 – 10.5 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'GK 2 M-Block Market & Restaurants',
      'Blocks E, S, W, M',
      'Masjid Moth DDA Flats & Phase 1 & 2',
      'Savitri Cinema Complex Environs',
      'Jahanpanah City Forest Border',
      'Chittaranjan Park Border',
    ],
    keySectors: ['Block E', 'Block S', 'Block W', 'M-Block GK2', 'Masjid Moth Phase 1 & 2'],
    overview:
      'Delivering premium home appliances to GK 2 households. Enjoy wholesale showroom pricing on top brand televisions, side-by-side refrigerators, and energy-saving air conditioners.',
    deliveryHighlights: [
      {
        title: 'White-Glove Flat Placement',
        description: 'Delivered directly into your apartment, avoiding street-level drops.',
      },
      {
        title: 'Original OEM Warranty',
        description: 'Complete GST invoice and registered manufacturer guarantee.',
      },
      {
        title: 'Doorstep UPI / Cash',
        description: 'Inspect the carton seals and serial numbers before paying.',
      },
      {
        title: 'Dedicated Technician Booking',
        description: 'Official installation request logged immediately upon dispatch.',
      },
    ],
    popularAppliances: [
      {
        category: 'Large Smart TVs',
        models: 'Sony Bravia XR 65" 4K Google TV & LG OLED',
        avgSavings: '₹3,000 – ₹6,000 vs. Chain Outlets',
      },
      {
        category: 'Inverter Split ACs',
        models: 'Daikin & Blue Star 1.5 Ton 5-Star Split ACs',
        avgSavings: '₹1,800 – ₹3,200 with Rapid Dispatch',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to apartments near Jahanpanah City Forest in GK 2?',
        answer: 'Yes, our delivery vehicles regularly deliver across all blocks of GK 2 and Masjid Moth.',
      },
    ],
    metaTitle: 'Appliance Delivery in Greater Kailash 2 (GK 2) | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Greater Kailash 2 (GK 2) & Masjid Moth. Sony TVs, Daikin ACs & LG refrigerators with room carry-in & seal inspection.',
  },

  // 18. CR Park (Chittaranjan Park)
  {
    slug: 'cr-park',
    name: 'CR Park (Chittaranjan Park)',
    tagline: 'Prompt Delivery Across Blocks A to K, Market 1 to 4 & Bipin Chandra Pal Marg',
    pincodes: ['110019'],
    distanceFromShowroom: '8.0 – 10.5 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'CR Park Blocks A, B, C, D, E, F, G, H, I, J, K',
      'Market 1 & Market 2 Corridor',
      'Market 3 & Market 4 Environs',
      'Bipin Chandra Pal Marg',
      'Kali Mandir Vicinity',
      'Pocket 40 DDA Flats',
    ],
    keySectors: ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Block K', 'Market 1 Area', 'Pocket 40'],
    overview:
      'Providing trustworthy, transparent appliance delivery to families across CR Park. We supply frost-free refrigerators, high-efficiency washing machines, and smart TVs with direct showroom guarantees.',
    deliveryHighlights: [
      {
        title: 'Honest Pricing & Genuine Bills',
        description: 'Direct distributor pricing with full GST tax invoice.',
      },
      {
        title: 'Staircase & Lift Carry-In',
        description: 'We bring the appliance straight into your flat on any floor.',
      },
      {
        title: 'Inspect Before You Pay',
        description: 'Verify intact box seals and pristine finish at your doorstep.',
      },
      {
        title: 'Rapid Manufacturer Installation',
        description: 'Authorized brand service engineer booked within 24 hours.',
      },
    ],
    popularAppliances: [
      {
        category: 'Double Door Refrigerators',
        models: 'Samsung & LG 260L–340L Inverter Frost-Free',
        avgSavings: '₹1,400 – ₹2,800 vs. High Street Shops',
      },
      {
        category: 'Front & Top Load Washers',
        models: 'Bosch & IFB 7.5kg Inverter Washers',
        avgSavings: '₹1,500 – ₹2,600 with Free Pipe Setup',
      },
      {
        category: '4K Smart Televisions',
        models: 'LG 43" & Sony 50" 4K Smart TVs',
        avgSavings: '₹1,600 – ₹3,500 with Genuine Bill',
      },
    ],
    faqs: [
      {
        question: 'Can you deliver a washing machine to CR Park Block B today?',
        answer: 'Yes! Orders placed by early afternoon are delivered the same evening.',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery CR Park (Chittaranjan Park) | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to CR Park Blocks A-K & Markets 1-4. LG fridges, Bosch washing machines & Sony TVs with in-room carry-in & COD.',
  },

  // 19. Alaknanda & Tara Crescent
  {
    slug: 'alaknanda',
    name: 'Alaknanda & Tara Crescent',
    tagline: 'Doorstep Delivery Across DDA Enclaves (Gangotri, Nilgiri, Mandakini & Godavari)',
    pincodes: ['110019'],
    distanceFromShowroom: '7.5 – 10.0 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Gangotri Enclave',
      'Yamunotri Enclave',
      'Nilgiri Apartments',
      'Mandakini Enclave',
      'Narmada & Godavari Apartments',
      'Tara Crescent & Aravali Apartments',
      'Alaknanda Shopping Complex',
    ],
    keySectors: ['Gangotri', 'Nilgiri', 'Mandakini', 'Yamunotri', 'Narmada', 'Godavari', 'Tara Crescent'],
    overview:
      'Specialized delivery to DDA residential societies across Alaknanda. Our delivery staff brings appliances up society lifts and staircases directly into your apartment.',
    deliveryHighlights: [
      {
        title: 'Society Lift & Stair Delivery',
        description: 'Trained teams carry appliances into multi-floor DDA flats safely.',
      },
      {
        title: 'Best Multi-Brand Pricing',
        description: 'Save ₹1,200 to ₹3,000 on Samsung, LG, Daikin, and Bosch.',
      },
      {
        title: 'Doorstep Unboxing Check',
        description: 'Inspect seals and serial numbers before completing payment.',
      },
      {
        title: 'Authorized Installation Scheduling',
        description: 'Fast service engineer booking for hassle-free setup.',
      },
    ],
    popularAppliances: [
      {
        category: 'Split Inverter ACs',
        models: 'Daikin & Voltas 1.5 Ton 5-Star Split ACs',
        avgSavings: '₹1,500 – ₹2,800 vs. Local Outlets',
      },
      {
        category: 'Frost-Free Fridges',
        models: 'Samsung & LG 260L–345L Inverters',
        avgSavings: '₹1,200 – ₹2,400 with In-Room Placement',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to Nilgiri and Mandakini Enclaves in Alaknanda?',
        answer: 'Yes, we deliver to all residential enclaves in Alaknanda with in-apartment carry-in.',
      },
    ],
    metaTitle: 'Appliance Delivery in Alaknanda DDA Enclaves | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Alaknanda, Gangotri, Nilgiri & Mandakini Enclaves. ACs, fridges & washers with in-flat carry-in & COD.',
  },

  // 20. Kalkaji & Nehru Place
  {
    slug: 'kalkaji-nehru-place',
    name: 'Kalkaji & Nehru Place',
    tagline: 'Fast Delivery to Residential Pockets, Commercial Offices & Nehru Place Hub',
    pincodes: ['110019'],
    distanceFromShowroom: '8.0 – 11.0 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Kalkaji Main & Blocks A to L',
      'Kalkaji Extension & DDA Flats',
      'Nehru Place Commercial Hub',
      'Govindpuri Metro Environs',
      'Lotus Temple & Kalkaji Mandir Vicinity',
      'Hansraj Sethi Marg Corridor',
    ],
    keySectors: ['Kalkaji Block A', 'Kalkaji Block B', 'Kalkaji Ext', 'Nehru Place Commercial', 'Govindpuri'],
    overview:
      'Serving both residential homes across Kalkaji and commercial offices in Nehru Place. Fast dispatch on smart displays, office water dispensers, and home appliances.',
    deliveryHighlights: [
      {
        title: 'Commercial & Residential Dispatch',
        description: 'Supplying home flats as well as IT offices and corporate suites.',
      },
      {
        title: 'GST Tax Billing',
        description: 'Official B2B invoices for company purchase records.',
      },
      {
        title: 'Inspect Before Payment',
        description: 'Verify intact carton seals before paying.',
      },
      {
        title: 'Direct Masoodpur Support',
        description: 'Prompt showroom customer service just a phone call away.',
      },
    ],
    popularAppliances: [
      {
        category: 'Hot & Cold Water Dispensers',
        models: 'Voltas & Blue Star Floor Standing',
        avgSavings: '₹800 – ₹1,600 vs. Retail',
      },
      {
        category: 'Smart 4K TVs & Displays',
        models: 'Sony Bravia & LG 43"–65" Displays',
        avgSavings: '₹1,800 – ₹4,000 with Local Warranty',
      },
    ],
    faqs: [
      {
        question: 'Can you deliver commercial water dispensers to Nehru Place offices?',
        answer: 'Yes! We deliver dispensers and pantry appliances with GST tax invoices directly to office floors.',
      },
    ],
    metaTitle: 'Appliance Delivery in Kalkaji & Nehru Place | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Kalkaji & Nehru Place. Water dispensers, smart TVs, ACs & fridges with GST tax invoicing and doorstep verification.',
  },

  // 21. Defence Colony
  {
    slug: 'defence-colony',
    name: 'Defence Colony',
    tagline: 'White-Glove Appliance Delivery (Blocks A to E & Def Col Market)',
    pincodes: ['110024'],
    distanceFromShowroom: '8.5 – 11.5 km',
    deliveryWindow: '4 – 6 Hours (Premium White-Glove)',
    deliveryPill: '4 - 6 Hrs White-Glove Delivery',
    landmarkCoverage: [
      'Defence Colony Blocks A, B, C, D, E',
      'Defence Colony Main Market & Flyover',
      'Varun Marg & Moolchand Corridor',
      'Moets Restaurant Vicinity',
      'Jangpura Border',
    ],
    keySectors: ['Block A', 'Block B', 'Block C', 'Block D', 'Block E', 'Def Col Market'],
    overview:
      'Providing discreet, careful white-glove appliance deliveries to bungalows and luxury builder floors in Defence Colony. We supply top-of-the-line OLED TVs, multi-door refrigeration, and quiet washing machines.',
    deliveryHighlights: [
      {
        title: 'Upright OLED & TV Transport',
        description: 'Large OLEDs transported in dedicated upright vehicle brackets.',
      },
      {
        title: 'Substantial Savings vs. Local Retail',
        description: 'Save ₹3,000–₹8,000 on flagship models without high market overheads.',
      },
      {
        title: 'Floor Protection Standards',
        description: 'Rubber-wheeled dollies to protect interior marble and wooden floors.',
      },
      {
        title: 'Scheduled 2-Hour Window',
        description: 'Agreed delivery slots matching your schedule.',
      },
    ],
    popularAppliances: [
      {
        category: 'Flagship OLED Televisions',
        models: 'Sony Bravia XR OLED 65"/77" & LG OLED C3',
        avgSavings: '₹4,000 – ₹8,500 vs. Chain Stores',
      },
      {
        category: 'Side-by-Side Refrigerators',
        models: 'Samsung Bespoke & LG French Door 650L+',
        avgSavings: '₹4,500 – ₹9,000 with In-Room Setup',
      },
      {
        category: 'Premium Inverter Washers',
        models: 'Bosch Serie 8 & IFB Executive 9kg',
        avgSavings: '₹2,000 – ₹4,000 with Rapid Dispatch',
      },
    ],
    faqs: [
      {
        question: 'Do you offer white-glove unboxing in Defence Colony?',
        answer: 'Yes, our team carries the appliance into your living room or kitchen and unboxes it in your presence.',
      },
    ],
    metaTitle: 'White-Glove Appliance Delivery Defence Colony | Sharma Bazaar',
    metaDescription:
      'Premium appliance delivery in Defence Colony Blocks A-E. Sony OLEDs, French door fridges & Bosch washers with in-room carry-in & seal check.',
  },

  // 22. South Extension (Part 1 & 2)
  {
    slug: 'south-extension',
    name: 'South Extension (Part 1 & 2)',
    tagline: 'Prompt Delivery across South Ex 1, South Ex 2 & Ring Road Belts',
    pincodes: ['110049'],
    distanceFromShowroom: '7.5 – 10.5 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'South Extension Part 1 (Blocks A to H)',
      'South Extension Part 2 (Blocks A to G)',
      'Ring Road Shopping Belt',
      'AIIMS & Safdarjung Hospital Vicinity',
      'Uday Park & Niti Bagh Border',
      'South Extension Metro Station',
    ],
    keySectors: ['South Ex 1', 'South Ex 2', 'Uday Park', 'Niti Bagh', 'Ring Road Area'],
    overview:
      'Delivering directly to residential streets behind the South Extension markets. Avoid mall crowds and high retail prices by ordering directly from our showroom with same-day doorstep delivery.',
    deliveryHighlights: [
      {
        title: 'Direct Wholesale Pricing',
        description: 'Beat high-street market prices by ₹1,500 to ₹4,000.',
      },
      {
        title: 'Two-Man Room Delivery',
        description: 'Heavy appliances carried straight into your home.',
      },
      {
        title: 'Seal Verification Before Payment',
        description: 'Verify model and unbroken carton seals at your doorstep.',
      },
      {
        title: 'Priority Brand Installation',
        description: 'Certified company installation booked upon dispatch.',
      },
    ],
    popularAppliances: [
      {
        category: 'Inverter Split ACs',
        models: 'Daikin & LG 1.5 Ton 5-Star Split ACs',
        avgSavings: '₹1,500 – ₹3,000 vs. Market Outlets',
      },
      {
        category: 'Smart 4K TVs',
        models: 'Sony Bravia & Samsung 55"–65" 4K Google TVs',
        avgSavings: '₹2,200 – ₹4,800 with Genuine Bill',
      },
    ],
    faqs: [
      {
        question: 'Can you deliver to residential blocks in South Ex 2?',
        answer: 'Yes! We deliver directly to residential addresses throughout South Ex 1 and 2.',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery South Extension (Part 1 & 2) | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to South Ex 1 & South Ex 2. ACs, TVs, fridges & washers with in-room carry-in & payment after inspection.',
  },

  // 23. Lajpat Nagar & Amar Colony
  {
    slug: 'lajpat-nagar',
    name: 'Lajpat Nagar & Amar Colony',
    tagline: 'Fast Delivery Across Lajpat Nagar 1, 2, 3, 4 & Amar Colony',
    pincodes: ['110024'],
    distanceFromShowroom: '9.0 – 12.0 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Lajpat Nagar 1 & 2',
      'Lajpat Nagar 3 & Central Market Environs',
      'Lajpat Nagar 4 & National Park',
      'Amar Colony & Dayanand Colony',
      'Kasturba Niketan & Vikram Vihar',
      'Moolchand Metro Station Corridor',
    ],
    keySectors: ['Lajpat Nagar 1', 'Lajpat Nagar 2', 'Lajpat Nagar 3', 'Lajpat Nagar 4', 'Amar Colony', 'Dayanand Colony'],
    overview:
      'Serving homes, builder floors, and businesses across Lajpat Nagar and Amar Colony. Avoid congested market parking by ordering genuine brand electronics delivered straight to your living room.',
    deliveryHighlights: [
      {
        title: 'Avoid Market Congestion',
        description: 'Appliance delivered directly into your home without dealing with market traffic.',
      },
      {
        title: 'Wholesale Price Matching',
        description: 'Send us any market price quote and we will match or beat it.',
      },
      {
        title: 'Safe Builder Floor Transport',
        description: 'Experienced staff handling stairs and narrow gates.',
      },
      {
        title: 'Pay on Doorstep Verification',
        description: 'Cash or UPI payment only after inspecting unbroken seals.',
      },
    ],
    popularAppliances: [
      {
        category: 'Double Door Refrigerators',
        models: 'LG & Samsung 260L–340L Inverter Frost-Free',
        avgSavings: '₹1,200 – ₹2,500 vs. Market Dealers',
      },
      {
        category: 'Fully Automatic Washers',
        models: 'Whirlpool & Bosch 7kg–8kg Washers',
        avgSavings: '₹1,200 – ₹2,200 with Unboxing',
      },
      {
        category: 'Split Inverter ACs',
        models: 'Voltas & Daikin 1.5 Ton Copper ACs',
        avgSavings: '₹1,500 – ₹2,800 with Rapid Dispatch',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to Amar Colony and Dayanand Colony?',
        answer: 'Yes! We deliver to all phases of Lajpat Nagar and Amar Colony.',
      },
    ],
    metaTitle: 'Appliance Delivery in Lajpat Nagar & Amar Colony | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Lajpat Nagar 1-4 & Amar Colony. ACs, fridges, TVs & washing machines with room carry-in & COD.',
  },

  // 24. Mehrauli & Andheria Mor
  {
    slug: 'mehrauli',
    name: 'Mehrauli & Andheria Mor',
    tagline: 'Direct Showroom Delivery across Heritage South Delhi (Ward 1–8 & Qutab Green)',
    pincodes: ['110030'],
    distanceFromShowroom: '1.0 – 3.0 km (Immediate Neighbor)',
    deliveryWindow: '2 – 3 Hours (Fastest Dispatch)',
    deliveryPill: '2 - 3 Hrs Express Delivery',
    landmarkCoverage: [
      'Mehrauli Heritage Zone (Wards 1–8)',
      'Qutab Green & Andheria Mor',
      'Ahinsa Sthal & 100 Feet Bypass Junction',
      'Lado Sarai & Qutab Institutional Area',
      'DDA Flats Sarita / Mehrauli',
      'Kalka Das Marg & Mehrauli Bus Terminal',
    ],
    keySectors: ['Mehrauli Wards 1-8', 'Andheria Mor', 'Qutab Green', 'Lado Sarai', 'Ahinsa Sthal'],
    overview:
      'Directly adjacent to our Masoodpur showroom, Mehrauli residents enjoy hyper-local 2 to 3-hour doorstep delivery. Our drivers know every colony and narrow lane, guaranteeing smooth room carry-in for all appliances.',
    deliveryHighlights: [
      {
        title: 'Hyper-Local 2-Hour Response',
        description: 'Minutes away from Dairy Farm, 80-B, Masoodpur, G/F. Same-afternoon delivery on all in-stock appliances.',
      },
      {
        title: 'Narrow Lane & Stilt Navigation',
        description: 'Our compact delivery vans and experienced porters easily navigate local residential alleys.',
      },
      {
        title: 'Guaranteed Best Neighborhood Rates',
        description: 'We match or beat any legitimate local quote on Sony, Daikin, Samsung, LG, Voltas, and Bosch.',
      },
      {
        title: 'Verify Before You Spend',
        description: 'Full box check, power cord inspection, and physical assessment before you pay a single rupee.',
      },
    ],
    popularAppliances: [
      {
        category: 'Single & Double Door Refrigerators',
        models: 'Samsung & Haier 190L–260L Inverters',
        avgSavings: '₹1,000 – ₹2,200 vs. Regional Retailers',
      },
      {
        category: 'Split & Window Air Conditioners',
        models: 'Voltas & LG 1.5 Ton Copper ACs',
        avgSavings: '₹1,400 – ₹2,500 with Quick Delivery',
      },
      {
        category: 'Full HD & 4K Smart TVs',
        models: 'Mi, OnePlus & LG Smart LED TVs 32"–55"',
        avgSavings: '₹1,200 – ₹2,800 with Genuine Bill',
      },
      {
        category: 'Semi & Top Load Washing Machines',
        models: 'LG & Whirlpool Smart Inverters 7kg–8kg',
        avgSavings: '₹900 – ₹2,000 with In-Room Carry',
      },
    ],
    faqs: [
      {
        question: 'Can you deliver an AC or fridge to Mehrauli within 2 hours?',
        answer: 'Yes, for all in-stock models, our delivery team can reach Mehrauli within 2 hours of confirmation.',
      },
    ],
    metaTitle: 'Fast Appliance Delivery Mehrauli & Andheria Mor | Sharma Bazaar',
    metaDescription:
      '2–3 hr express appliance delivery in Mehrauli & Andheria Mor from Sharma Bazaar showroom. Best prices on ACs, TVs, fridges & washers with COD.',
  },

  // 25. Fatehpur Beri & Asola
  {
    slug: 'fatehpur-beri-asola',
    name: 'Fatehpur Beri & Asola',
    tagline: 'Direct Delivery to Farmhouses, Estates & Asola Wildlife Corridor',
    pincodes: ['110074'],
    distanceFromShowroom: '6.5 – 9.5 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Fatehpur Beri Village & Main Road',
      'Asola Homes & Farmhouses',
      'Bhati Mines Corridor',
      'Chandanhulla Village',
      'Dera Mandi Road',
      'Radha Soami Satsang Environs',
    ],
    keySectors: ['Fatehpur Beri', 'Asola', 'Chandanhulla', 'Dera Mandi', 'Bhati'],
    overview:
      'Serving farmhouses, private residences, and community estates across Fatehpur Beri, Asola, and Dera Mandi. We provide high-tonnage split ACs, large capacity refrigerators, and heavy-duty washing machines.',
    deliveryHighlights: [
      {
        title: 'Estate & Farmhouse Access',
        description: 'Vehicles prepared for private estate driveways and gated compounds.',
      },
      {
        title: 'High-Capacity Cooling',
        description: '2 Ton split ACs with high ambient cooling for large farmhouse rooms.',
      },
      {
        title: 'Hard-Water Compatible Washers',
        description: 'Machines with lint and scaling protection for local ground water.',
      },
      {
        title: 'Doorstep Unboxing & Verification',
        description: 'Inspect factory seals before completing payment.',
      },
    ],
    popularAppliances: [
      {
        category: '2.0 Ton Split Inverter ACs',
        models: 'Daikin & Blue Star Heavy Duty 5-Star',
        avgSavings: '₹2,000 – ₹3,800 vs. Chain Stores',
      },
      {
        category: 'Side-by-Side Refrigerators',
        models: 'Samsung & LG 650L+ Multi-Door',
        avgSavings: '₹3,500 – ₹7,000 with In-Room Placement',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to farmhouses on Dera Mandi Road?',
        answer: 'Yes, we regularly deliver appliances to farmhouses throughout Fatehpur Beri and Dera Mandi.',
      },
    ],
    metaTitle: 'Appliance Delivery in Fatehpur Beri & Asola | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Fatehpur Beri, Asola & Dera Mandi. 2 Ton ACs, French door fridges & washers with estate delivery & COD.',
  },

  // 26. Aya Nagar & Arjan Garh
  {
    slug: 'aya-nagar',
    name: 'Aya Nagar & Arjan Garh',
    tagline: 'Direct Delivery Across Aya Nagar Phases 1 to 6 & Air Force Station Belt',
    pincodes: ['110047'],
    distanceFromShowroom: '5.5 – 8.0 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Aya Nagar Phases 1, 2, 3, 4, 5, 6',
      'Aya Nagar Main Market & Gaon',
      'Arjan Garh Metro Station Corridor',
      'Air Force Station Residential Quarters',
      'MG Road Delhi-Gurgaon Border Junction',
    ],
    keySectors: ['Aya Nagar Phase 1-6', 'Aya Nagar Gaon', 'Arjan Garh Metro', 'Air Force Station Area'],
    overview:
      'Providing prompt doorstep appliance delivery to families and residents in Aya Nagar and Arjan Garh. We offer genuine multi-brand appliances at wholesale distributor prices.',
    deliveryHighlights: [
      {
        title: 'Builder Flat & Village Access',
        description: 'Porters experienced with local streets and multi-floor buildings.',
      },
      {
        title: 'Wholesale Savings',
        description: 'Save ₹1,000 to ₹2,500 compared to local border shops.',
      },
      {
        title: 'Payment on Box Inspection',
        description: 'Verify seals and serial numbers before making payment.',
      },
      {
        title: 'Next-Day OEM Installation',
        description: 'Brand certified engineers booked directly on dispatch.',
      },
    ],
    popularAppliances: [
      {
        category: 'Split Inverter ACs',
        models: 'Voltas & LG 1.5 Ton Copper ACs',
        avgSavings: '₹1,400 – ₹2,600 with Fast Transit',
      },
      {
        category: 'Double Door Refrigerators',
        models: 'Samsung & Haier 240L–260L Inverters',
        avgSavings: '₹1,100 – ₹2,200 with Room Delivery',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to Aya Nagar Phase 5 and 6?',
        answer: 'Yes, our delivery vehicles cover all phases of Aya Nagar.',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery Aya Nagar & Arjan Garh | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Aya Nagar Phases 1-6 & Arjan Garh. ACs, fridges, TVs & washing machines with room delivery & COD.',
  },

  // 27. Dwarka (Sectors 1 to 24)
  {
    slug: 'dwarka',
    name: 'Dwarka (Sectors 1 to 24)',
    tagline: 'Express Transit via Aerocity Underpass to All Dwarka Residential Sectors',
    pincodes: ['110075', '110077', '110078'],
    distanceFromShowroom: '7.0 – 12.0 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Dwarka Sectors 1 to 24 Residential Societies',
      'Ramphal Chowk & Sector 7 Market',
      'Sector 6 & 10 Central Markets',
      'Sector 21 Metro Interchange Corridor',
      'Urban Extension Road 2 (UER-2) / Aerocity Underpass Route',
      'Dwarka Expressway Junction',
    ],
    keySectors: ['Sector 4', 'Sector 6', 'Sector 7', 'Sector 10', 'Sector 12', 'Sector 21', 'Sector 22'],
    overview:
      'Rapidly connected directly to our Vasant Kunj showroom via the Aerocity tunnel underpass. We deliver to DDA and CGHS cooperative housing societies across Dwarka with full in-flat carry-in and seal inspection.',
    deliveryHighlights: [
      {
        title: 'Direct Underpass Transit',
        description: 'Reaches Dwarka sectors within 18 minutes via the Aerocity tunnel route.',
      },
      {
        title: 'CGHS & DDA Society Delivery',
        description: 'Our two-man delivery teams bring appliances directly up society elevators.',
      },
      {
        title: 'Beat Mall Chain Prices',
        description: 'Save ₹1,500 to ₹4,000 on major models compared to local Dwarka mall outlets.',
      },
      {
        title: 'Inspect Seals Before Paying',
        description: 'Verify box seals and serial numbers before completing payment.',
      },
    ],
    popularAppliances: [
      {
        category: 'Inverter Split ACs',
        models: 'Daikin & LG 1.5 Ton 5-Star Split ACs',
        avgSavings: '₹1,500 – ₹3,000 vs. Dwarka Retailers',
      },
      {
        category: 'Double Door & Side-by-Side Fridges',
        models: 'Samsung & LG 260L–500L Inverter Frost-Free',
        avgSavings: '₹1,800 – ₹4,000 with In-Room Carry',
      },
      {
        category: 'Front Load Washers',
        models: 'Bosch & IFB 7.5kg–8kg AI Wash Inverters',
        avgSavings: '₹1,400 – ₹2,800 with Rapid Dispatch',
      },
      {
        category: '4K Smart TVs',
        models: 'Sony Bravia 55"–65" 4K Google TVs',
        avgSavings: '₹2,200 – ₹4,500 with OEM Warranty',
      },
    ],
    faqs: [
      {
        question: 'How fast can you deliver to a CGHS society in Dwarka Sector 10?',
        answer: 'Via the Aerocity underpass, our delivery van reaches Dwarka in just 20 minutes. Orders placed by afternoon are delivered the same evening.',
      },
    ],
    metaTitle: 'Home Appliance Doorstep Delivery in Dwarka (Sectors 1-24) | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Dwarka Sectors 1-24 via Aerocity Underpass. ACs, fridges, TVs & washers with CGHS flat carry-in & COD.',
  },

  // 28. Kapashera & Bijwasan
  {
    slug: 'kapashera-bijwasan',
    name: 'Kapashera & Bijwasan',
    tagline: 'Direct Appliance Delivery along NH-48 Border & Farmhouse Belts',
    pincodes: ['110037', '110061'],
    distanceFromShowroom: '5.5 – 8.5 km',
    deliveryWindow: '3 – 5 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 5 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Kapashera Border & Main Market',
      'Bijwasan Railway Station Vicinity',
      'Samalka & NH-48 Service Road',
      'Bamnoli & Salapur Khera',
      'The Oberoi / Trident Corridor',
    ],
    keySectors: ['Kapashera', 'Bijwasan', 'Samalka', 'Bamnoli', 'Salapur Khera'],
    overview:
      'Serving residential and commercial clients across Kapashera, Bijwasan, and Samalka. Prompt supply of room air conditioners, refrigerators, and water dispensers with GST tax invoicing.',
    deliveryHighlights: [
      {
        title: 'Prompt NH-48 Transit',
        description: 'Short drive from Vasant Kunj via Mahipalpur-Kapashera link road.',
      },
      {
        title: 'GST Tax Invoicing',
        description: 'Official invoices for corporate premises and warehouses.',
      },
      {
        title: 'Two-Man Room Delivery',
        description: 'Units placed right inside your room or pantry.',
      },
      {
        title: 'COD & UPI on Inspection',
        description: 'Confirm unbroken manufacturer seals before paying.',
      },
    ],
    popularAppliances: [
      {
        category: 'Split & Window ACs',
        models: 'Voltas & Daikin 1.5 Ton Copper ACs',
        avgSavings: '₹1,400 – ₹2,600 with Fast Dispatch',
      },
      {
        category: 'Water Dispensers',
        models: 'Blue Star & Voltas Floor Standing with Cabinets',
        avgSavings: '₹800 – ₹1,600 vs. Retail',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to Kapashera border residences?',
        answer: 'Yes! We deliver directly to Kapashera, Bijwasan, and Samalka with in-room placement.',
      },
    ],
    metaTitle: 'Appliance Delivery in Kapashera & Bijwasan | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Kapashera, Bijwasan & Samalka. ACs, water dispensers & refrigerators with GST invoicing & COD.',
  },
];

export function getLocalityBySlug(slug: string): DeliveryLocality | undefined {
  return SOUTH_DELHI_LOCALITIES.find((loc) => loc.slug === slug);
}

export function getAllLocalitySlugs(): string[] {
  return SOUTH_DELHI_LOCALITIES.map((loc) => loc.slug);
}
