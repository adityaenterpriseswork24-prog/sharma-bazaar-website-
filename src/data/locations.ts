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
      'As our primary neighborhood showroom located at 80-B, Masoodpur Dairy, Vasant Kunj residents enjoy our fastest white-glove doorstep delivery. Large appliances—including 4K Smart TVs, double door refrigerators, front load washing machines, and split air conditioners—are dispatched directly from our local warehouse within 2 to 3 hours.',
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
          'Because our physical showroom is located at Masoodpur Dairy right in Vasant Kunj, we offer express same-day dispatch. In-stock models are typically delivered to Sectors A, B, C, D, and Masoodpur within 2 to 3 hours of order confirmation.',
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
      {
        question: 'Who handles the installation for ACs and TVs?',
        answer:
          'Official brand technicians (from Daikin, LG, Sony, Samsung, Voltas, etc.) perform the installation. We log the installation request immediately upon dispatch, and the brand engineer visits your home within 24 to 48 hours with official warranty registration.',
      },
    ],
    metaTitle: 'Home Appliance Doorstep Delivery in Vasant Kunj | Sharma Bazaar',
    metaDescription:
      'Order TVs, ACs, refrigerators & washing machines with same-day 2–3 hr doorstep delivery in Vasant Kunj Sectors A, B, C, D & Masoodpur. Room carry-in, COD & seal check.',
  },
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
        title: 'Factory Fresh Sealed Units',
        description:
          'Every unit comes directly from authorized distributor stock with original GST invoice and registered manufacturer guarantee.',
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
      {
        question: 'What is the delivery charge for Chattarpur?',
        answer:
          'We offer free or nominal doorstep delivery on major electronics for Chattarpur and Sultanpur addresses. Inquire on WhatsApp for immediate confirmation for your specific pin code.',
      },
    ],
    metaTitle: 'Home Appliance Doorstep Delivery in Chattarpur & Sultanpur | Sharma Bazaar',
    metaDescription:
      'Same-day appliance doorstep delivery in Chattarpur Enclave, 100 Feet Road & Sultanpur. Split ACs, 4K TVs, refrigerators & washers with room carry-in & COD.',
  },
  {
    slug: 'mahipalpur',
    name: 'Mahipalpur & Aerocity',
    tagline: 'Fast Delivery to Residential Pockets, Hotels & Corporate Hubs',
    pincodes: ['110037'],
    distanceFromShowroom: '2.5 – 4.5 km',
    deliveryWindow: '3 – 4 Hours (Same-Day Delivery)',
    deliveryPill: '3 - 4 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Mahipalpur Extension & L-Block',
      'Vasant Kunj Road Corridor',
      'Radisson Blu / Aerocity Hotel Belt',
      'Aerocity Worldmark Office Complex',
      'NH-48 Commercial Area',
      'Rangpuri & A-Block Environs',
    ],
    keySectors: [
      'Mahipalpur Extension',
      'L-Block',
      'Aerocity District',
      'Vasant Kunj Main Road',
      'Rangpuri',
      'NH-48 Corridor',
    ],
    overview:
      'Strategically located between Vasant Kunj and NH-48, Sharma Bazaar provides rapid same-day appliance supply to residences, guest houses, boutique hotels, and offices across Mahipalpur and the Aerocity corridor.',
    deliveryHighlights: [
      {
        title: 'Residential & Commercial Dispatch',
        description:
          'We supply individual homes as well as hospitality properties needing commercial-grade water dispensers, microwaves, and mini-refrigerators.',
      },
      {
        title: 'GST Invoicing for Corporate ITC',
        description:
          'Receive clear B2B GST tax invoices for business input tax credit alongside manufacturer warranty certificates.',
      },
      {
        title: 'Quick Transit via Nelson Mandela Marg',
        description:
          'Short 10-minute transit ensures swift deliveries with zero prolonged vehicle shaking or damage.',
      },
      {
        title: 'Doorstep Unpacking & Inspection',
        description:
          'Boxes are unpacked in your presence to ensure absolute pristine condition of every appliance.',
      },
    ],
    popularAppliances: [
      {
        category: 'Hot & Cold Water Dispensers',
        models: 'Voltas & Blue Star Floor Standing with Cooling Cabinet',
        avgSavings: '₹800 – ₹1,500 vs. Online Marketplaces',
      },
      {
        category: 'Split & Window Air Conditioners',
        models: 'Voltas & Daikin 1.5 Ton High-Ambient Cooling Inverters',
        avgSavings: '₹1,500 – ₹2,500 with Express Delivery',
      },
      {
        category: 'Microwave Ovens',
        models: 'Samsung & LG Convection with Indian Auto-Cook',
        avgSavings: '₹900 – ₹1,800 with Genuine OEM Guarantee',
      },
      {
        category: 'Compact & Double Door Fridges',
        models: 'Single Door 190L & Double Door 260L Frost-Free',
        avgSavings: '₹1,200 – ₹2,200 with Same-Day Delivery',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to hotels and guest houses in Mahipalpur?',
        answer:
          'Yes, we regularly fulfill both single-unit home orders and bulk appliance orders for guest houses, service apartments, and offices in Mahipalpur and Aerocity.',
      },
      {
        question: 'Can we get an official GST bill with our company name?',
        answer:
          'Yes. Share your GSTIN number when ordering, and you will receive an official tax invoice eligible for 18% or 28% Input Tax Credit (ITC).',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery Mahipalpur & Aerocity | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Mahipalpur & Aerocity. ACs, commercial water dispensers, TVs & fridges with GST tax invoicing and doorstep verification.',
  },
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
      'Munirka Enclave',
    ],
    overview:
      'Vasant Vihar and Shanti Niketan households demand meticulous handling, premium aesthetics, and authentic manufacturer guarantees. Sharma Bazaar delivers top-tier OLED TVs, multi-door French refrigerators, and premium front-load washers with utmost care.',
    deliveryHighlights: [
      {
        title: 'Floor Protection & Protective Handling',
        description:
          'Our personnel use rubberized dollies and protective padding to safeguard marble, hardwood, and designer tiles during transit.',
      },
      {
        title: 'High-End Brand Specialists',
        description:
          'Authorized access to flagship Sony Bravia XR OLEDs, Bosch Series 6/8 Washers, and LG InstaView French door refrigerators.',
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
  {
    slug: 'saket',
    name: 'Saket & Sainik Farm',
    tagline: 'Reliable Doorstep Electronics Delivery (Blocks J, K, M, N & Press Enclave)',
    pincodes: ['110017', '110062'],
    distanceFromShowroom: '5.5 – 8.0 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Saket Blocks J, K, L, M, N',
      'Press Enclave Marg & Saket DDA Flats',
      'Select Citywalk & DLF South Court Vicinity',
      'Anupam Enclave & Paryavaran Complex',
      'Sainik Farm (Western Avenue & Country Club)',
      'Neb Sarai & Freedom Fighters Enclave',
    ],
    keySectors: [
      'Saket Block J',
      'Saket Block M',
      'Press Enclave',
      'Sainik Farm',
      'Anupam Enclave',
      'Neb Sarai',
    ],
    overview:
      'Serving residential communities across Saket and Sainik Farm with honest local pricing that consistently beats mall chains like Croma and Reliance Digital. Enjoy direct showroom delivery right to your door with zero shipping surcharge.',
    deliveryHighlights: [
      {
        title: 'Price Beat Guarantee vs. Mall Chains',
        description:
          'Save ₹1,500 to ₹4,000 on major brands compared to Select Citywalk and local retail outlets.',
      },
      {
        title: 'Direct From Authorized Stock',
        description:
          'All appliances are sourced directly from brand distributors with zero display-unit or repackaged stock.',
      },
      {
        title: 'Safe Transit to Farmhouses & Villas',
        description:
          'Reliable transportation handling long driveways and villa entrances across Sainik Farm.',
      },
      {
        title: 'Payment on Verification',
        description:
          'Confirm your model specifications, voltage labels, and carton seals before paying.',
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
      {
        category: 'Fully Automatic Washers',
        models: 'Bosch & Samsung Top & Front Load Inverters',
        avgSavings: '₹1,200 – ₹2,500 with Quick Delivery',
      },
    ],
    faqs: [
      {
        question: 'Why buy from Sharma Bazaar instead of shopping at Saket mall outlets?',
        answer:
          'Mall retail stores in Saket carry huge rental overheads that are baked into their prices. Because Sharma Bazaar operates from our established showroom in Masoodpur Dairy, we pass wholesale distributor savings directly to you—saving you ₹1,500 to ₹5,000 on identical models with identical OEM warranties.',
      },
      {
        question: 'Do you deliver to Sainik Farm villas?',
        answer:
          'Yes, our delivery vehicles regularly deliver to Western Avenue, Central Avenue, and throughout Sainik Farm.',
      },
    ],
    metaTitle: 'Appliance Doorstep Delivery in Saket & Sainik Farm | Sharma Bazaar',
    metaDescription:
      'Save ₹1,500–₹5,000 on TVs, ACs, refrigerators & washing machines in Saket & Sainik Farm. Same-day doorstep delivery, unboxing & payment on seal inspection.',
  },
  {
    slug: 'hauz-khas',
    name: 'Hauz Khas & Green Park',
    tagline: 'Prompt Delivery Across South Central Delhi (Aurobindo Marg & Safdarjung)',
    pincodes: ['110016', '110029'],
    distanceFromShowroom: '5.0 – 7.5 km',
    deliveryWindow: '4 – 6 Hours (Same-Day Delivery)',
    deliveryPill: '4 - 6 Hrs Same-Day Delivery',
    landmarkCoverage: [
      'Hauz Khas Enclave & Main Market',
      'Hauz Khas Village Corridor',
      'Green Park Main & Extension',
      'Safdarjung Enclave & Development Area (SDA)',
      'Kalu Sarai & Sarvapriya Vihar',
      'IIT Delhi & NCERT Residential Environs',
    ],
    keySectors: [
      'Hauz Khas Enclave',
      'Green Park',
      'Safdarjung Enclave',
      'SDA',
      'Sarvapriya Vihar',
      'Kalu Sarai',
    ],
    overview:
      'Providing prompt doorstep appliance deliveries to professors, doctors, young families, and professionals across Hauz Khas, Green Park, SDA, and Safdarjung. Fast delivery via Outer Ring Road.',
    deliveryHighlights: [
      {
        title: 'Swift Transit via Outer Ring Road',
        description:
          'Located near Nelson Mandela Marg, we reach Hauz Khas and Green Park via Outer Ring Road within 20 minutes.',
      },
      {
        title: 'Authentic 100% Brand Guarantee',
        description:
          'Every appliance carries standard manufacturer warranty backed by OEM service networks across South Delhi.',
      },
      {
        title: 'Hassle-Free UPI / Cash Payment',
        description:
          'Pay right at your doorstep after inspecting the original tamper-proof seals.',
      },
      {
        title: 'Full Installation Handover',
        description:
          'We coordinate directly with company engineers for fast wall mounting, plumbing connection, and electrical setup.',
      },
    ],
    popularAppliances: [
      {
        category: 'Front Load Washing Machines',
        models: 'Bosch Serie 6 & IFB Senator Smart Inverter',
        avgSavings: '₹1,500 – ₹2,800 vs. Market',
      },
      {
        category: 'Energy Efficient Inverter ACs',
        models: 'Daikin & LG 1.5 Ton 5-Star Split ACs',
        avgSavings: '₹1,600 – ₹3,000 with Rapid Dispatch',
      },
      {
        category: 'Compact Double Door Refrigerators',
        models: 'LG & Samsung 260L–340L Smart Inverters',
        avgSavings: '₹1,200 – ₹2,400 with Room Delivery',
      },
      {
        category: 'Compact Microwaves & Ovens',
        models: 'LG Charcoal Convection 28L & 32L',
        avgSavings: '₹800 – ₹1,600 with Free Transit',
      },
    ],
    faqs: [
      {
        question: 'Do you deliver to SDA and Green Park?',
        answer:
          'Yes, we provide same-day doorstep deliveries across Green Park, Hauz Khas Enclave, SDA, and Safdarjung Enclave.',
      },
      {
        question: 'How do I place an order for Hauz Khas delivery?',
        answer:
          'Simply message us on WhatsApp with the appliance model or photo. We confirm showroom price, delivery time slot, and bring it directly to your home.',
      },
    ],
    metaTitle: 'Home Appliance Doorstep Delivery Hauz Khas & Green Park | Sharma Bazaar',
    metaDescription:
      'Same-day appliance delivery to Hauz Khas, Green Park & Safdarjung. Smart TVs, Daikin ACs, Bosch washing machines & fridges with doorstep unboxing & COD.',
  },
  {
    slug: 'mehrauli',
    name: 'Mehrauli & Kishangarh',
    tagline: 'Direct Showroom Delivery across Heritage South Delhi (Ward 1–8 & Qutab Green)',
    pincodes: ['110030', '110070'],
    distanceFromShowroom: '1.0 – 3.0 km (Immediate Neighbor)',
    deliveryWindow: '2 – 3 Hours (Fastest Dispatch)',
    deliveryPill: '2 - 3 Hrs Express Delivery',
    landmarkCoverage: [
      'Kishangarh Village & Main Market',
      'Mehrauli Heritage Zone (Wards 1–8)',
      'Qutab Green & Andheria Mor',
      'Ahinsa Sthal & 100 Feet Bypass Junction',
      'Lado Sarai & Qutab Institutional Area',
      'DDA Flats Sarita / Mehrauli',
    ],
    keySectors: [
      'Kishangarh',
      'Mehrauli Wards 1-8',
      'Andheria Mor',
      'Lado Sarai',
      'Qutab Institutional Area',
    ],
    overview:
      'Directly adjacent to our Masoodpur showroom, Kishangarh and Mehrauli residents enjoy hyper-local 2 to 3-hour doorstep delivery. Our drivers know every colony and narrow lane, guaranteeing smooth room carry-in for all appliances.',
    deliveryHighlights: [
      {
        title: 'Hyper-Local 2-Hour Response',
        description:
          'Minutes away from Masoodpur Dairy. Same-afternoon delivery on all in-stock appliances.',
      },
      {
        title: 'Narrow Lane & Stilt Navigation',
        description:
          'Our compact delivery vans and experienced porters easily navigate local residential alleys.',
      },
      {
        title: 'Guaranteed Best Neighborhood Rates',
        description:
          'We match or beat any legitimate local quote on Sony, Daikin, Samsung, LG, Voltas, and Bosch.',
      },
      {
        title: 'Verify Before You Spend',
        description:
          'Full box check, power cord inspection, and physical assessment before you pay a single rupee.',
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
        answer:
          'Yes, for all in-stock models, our delivery team can reach Mehrauli and Kishangarh within 2 hours of your confirmation.',
      },
      {
        question: 'Can I visit the showroom in person from Kishangarh?',
        answer:
          'We are just 3 minutes away at 80-B, Masoodpur Dairy on the main road opposite Masoodpur flyover. You can see physical models in person and schedule immediate delivery right at the counter.',
      },
    ],
    metaTitle: 'Fast Appliance Delivery Mehrauli & Kishangarh | Sharma Bazaar',
    metaDescription:
      '2–3 hr express appliance delivery in Mehrauli, Kishangarh & Andheria Mor from Sharma Bazaar showroom. Best prices on ACs, TVs, fridges & washers with COD.',
  },
];

export function getLocalityBySlug(slug: string): DeliveryLocality | undefined {
  return SOUTH_DELHI_LOCALITIES.find((loc) => loc.slug === slug);
}

export function getAllLocalitySlugs(): string[] {
  return SOUTH_DELHI_LOCALITIES.map((loc) => loc.slug);
}
