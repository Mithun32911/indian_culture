// Cultural data for Indian traditions and festivals
export const culturalData = [
  {
    id: 1,
    name: "Diwali",
    type: "Festival",
    description: "The festival of lights celebrated across India with diyas, fireworks, and sweets. It symbolizes the victory of light over darkness and good over evil.",
    region: "Pan-India",
    season: "October-November",
    significance: "Victory of good over evil, prosperity and new beginnings",
    image: '/diwali2.jpg'
  },
  {
    id: 2,
    name: "Holi",
    type: "Festival",
    description: "The festival of colors celebrating spring, love, and new beginnings. People throw colored powders and water at each other in joyful celebration.",
    region: "North India primarily",
    season: "March",
    significance: "Celebration of spring, love, and the triumph of good over evil"
  },
  {
    id: 3,
    name: "Classical Dance Forms",
    type: "Tradition",
    description: "India has eight classical dance forms including Bharatanatyam, Kathak, Odissi, and Kuchipudi, each with unique styles and spiritual significance.",
    region: "Various regions",
    season: "Year-round",
    significance: "Spiritual expression and cultural preservation",
    image: '/classical2.png'
  },
  {
    id: 4,
    name: "Yoga and Meditation",
    type: "Tradition",
    description: "Ancient practices originating in India for physical, mental, and spiritual well-being, now practiced worldwide.",
    region: "Pan-India",
    season: "Year-round",
    significance: "Holistic wellness and spiritual growth",
    image: '/yoga.png'
  },
  {
    id: 5,
    name: "Ganesh Chaturthi",
    type: "Festival",
    description: "Celebration of Lord Ganesha with elaborate decorations, processions, and community gatherings, especially popular in Maharashtra.",
    region: "Maharashtra and South India",
    season: "August-September",
    significance: "Removal of obstacles and new beginnings",
    image: '/ganesh.png'
  },
  {
    id: 6,
    name: "Ayurveda",
    type: "Tradition",
    description: "Ancient system of natural healing and medicine that emphasizes balance between mind, body, and spirit through herbs, diet, and lifestyle.",
    region: "Pan-India, especially Kerala",
    season: "Year-round",
    significance: "Holistic health and natural healing",
    image: '/ayurveda2.png'
  }
  ,
  {
    id: 7,
    name: "Kumbh Mela",
    type: "Festival",
    description: "One of the world's largest religious gatherings where millions of pilgrims converge to bathe in sacred rivers (Ganges, Yamuna, Godavari) seeking spiritual cleansing. The event rotates among four pilgrimage sites and is held according to a 12-year cycle.",
    region: "Prayagraj, Haridwar, Nashik, Ujjain (rotating)",
    season: "Varies (based on astrological timings; major gatherings occur every 3 years at different sites, 12-year full cycle)",
    significance: "Mass pilgrimage for spiritual purification, merit, and communal worship; major cultural and devotional event",
    image: '/kumbhmela.png'
  },
  {
    id: 8,
    name: "Rajasthani Folk Music & Dance",
    type: "Tradition",
    description: "A vibrant tradition of music and dance from Rajasthan featuring instruments like the dholak, sarangi, and kamaicha, and dances such as Ghoomar and Kalbelia which celebrate courtship, seasonal festivals, and community life.",
    region: "Rajasthan",
    season: "Year-round; peaks during fairs and festival seasons",
    significance: "Oral cultural heritage that preserves regional stories, social customs, and traditional performing arts",
    image: '/rajasthan.png'
  },
  {
    id: 9,
    name: "Pattachitra Painting",
    type: "Art Form",
    description: "A traditional cloth-based scroll painting from Odisha and West Bengal characterized by intricate details, mythological themes (especially Krishna and Jagannath), and natural colors made from minerals and organic dyes.",
    region: "Odisha and West Bengal",
    season: "Year-round",
    significance: "Represents a durable folk-painting tradition integral to temple rituals, storytelling, and regional identity",
    image: '/pattachitra.png'
  }
  ,
  {
    id: 10,
    name: "Thangka-style Miniatures",
    type: "Art Form",
    description: "Small, highly detailed paintings inspired by Himalayan Thangka traditions, often depicting deities and mandalas for devotional use and private altars.",
    region: "Himalayan regions (Sikkim, Arunachal Pradesh) and pockets across North India",
    season: "Year-round",
    significance: "Preserves Buddhist devotional iconography and painting techniques at miniature scale",
    image: '/thangka.png'
  },
  {
    id: 11,
    name: "Warli Painting",
    type: "Art Form",
    description: "A tribal art form from Maharashtra using simple geometric shapes (circles, triangles, lines) to depict scenes of daily life, rituals, and nature on mud walls.",
    region: "Maharashtra (Warli tribal areas)",
    season: "Year-round",
    significance: "Represents indigenous visual storytelling and community identity",
    image: '/warli.png'
  },
  {
    id: 12,
    name: "Kalamkari Textiles",
    type: "Art Form",
    description: "Hand-painted or block-printed textiles using natural dyes (notably indigo and iron) traditionally produced in Andhra Pradesh and Telangana, illustrating epic narratives and floral motifs.",
    region: "Andhra Pradesh, Telangana",
    season: "Year-round",
    significance: "Skilled craft tradition linked to textile design, storytelling, and ceremonial uses",
    image: '/kalamkari.png'
  }
];

// Monument data for famous Indian heritage sites
export const monumentData = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    built: "1632-1653",
    builder: "Shah Jahan",
    type: "Mausoleum",
    description: "An ivory-white marble mausoleum built by Shah Jahan in memory of his wife Mumtaz Mahal. It's considered one of the finest examples of Mughal architecture.",
    significance: "UNESCO World Heritage Site, Symbol of eternal love",
    architecture: "Indo-Islamic architecture with Persian, Islamic, and Indian elements",
    visitingHours: "6:00 AM to 7:00 PM (closed on Fridays)",
    entryFee: "₹50 for Indians, ₹1100 for foreigners",
    image: '/tajmahal.jpg'
  },
  {
    id: 2,
    name: "Red Fort",
    location: "Delhi",
    built: "1638-1648",
    builder: "Shah Jahan",
    type: "Fortified Palace",
    description: "A historic fortified palace that served as the main residence of the Mughal emperors. It's where India's Prime Minister addresses the nation on Independence Day.",
    significance: "UNESCO World Heritage Site, Symbol of Indian independence",
    architecture: "Mughal architecture with red sandstone walls",
    visitingHours: "9:30 AM to 4:30 PM (closed on Mondays)",
    entryFee: "₹35 for Indians, ₹500 for foreigners",
    image: '/redfort.jpg'
  },
  {
    id: 3,
    name: "Qutub Minar",
    location: "Delhi",
    built: "1192-1220",
    builder: "Qutb-ud-din Aibak",
    type: "Victory Tower",
    description: "A 73-meter tall minaret made of red sandstone and marble. It's the tallest brick minaret in the world and showcases Indo-Islamic architecture.",
    significance: "UNESCO World Heritage Site, Symbol of Islamic rule in India",
    architecture: "Indo-Islamic architecture with intricate carvings",
    visitingHours: "7:00 AM to 5:00 PM",
    entryFee: "₹30 for Indians, ₹500 for foreigners",
    image: '/qutubminar.jpg'
  },
  {
    id: 4,
    name: "Gateway of India",
    location: "Mumbai, Maharashtra",
    built: "1924",
    builder: "British Government",
    type: "Triumphal Arch",
    description: "An arch monument built to commemorate the visit of King George V and Queen Mary. It's now an iconic symbol of Mumbai.",
    significance: "Historic landmark, Symbol of Mumbai",
    architecture: "Indo-Saracenic architecture",
    visitingHours: "24 hours (best visited during sunrise/sunset)",
    entryFee: "Free",
    image: '/gateway.jpg'
  },
  {
    id: 5,
    name: "Ajanta and Ellora Caves",
    location: "Maharashtra",
    built: "2nd century BCE to 6th century CE",
    builder: "Buddhist, Hindu, and Jain monks",
    type: "Rock-cut Caves",
    description: "Ancient Buddhist, Hindu, and Jain temples and monasteries carved into rock faces, featuring exquisite sculptures and paintings.",
    significance: "UNESCO World Heritage Sites, Masterpieces of ancient Indian art",
    architecture: "Rock-cut architecture with intricate sculptures",
    visitingHours: "9:00 AM to 5:30 PM (closed on Mondays)",
    entryFee: "₹40 for Indians, ₹600 for foreigners",
    image: '/ajantaellora.jpg'
  },
  {
    id: 6,
    name: "Hawa Mahal",
    location: "Jaipur, Rajasthan",
    built: "1799",
    builder: "Maharaja Sawai Pratap Singh",
    type: "Palace",
    description: "The 'Palace of Winds' is a five-story palace with 953 small windows designed to allow royal ladies to observe street festivals while remaining unseen.",
    significance: "Iconic symbol of Jaipur, Architectural marvel",
    architecture: "Rajput architecture with Islamic influences",
    visitingHours: "9:00 AM to 4:30 PM",
    entryFee: "₹50 for Indians, ₹200 for foreigners",
    image: '/hawamahal.jpg'
  }
  
];

// Heritage sites data
export const heritageSites = [
  {
    id: 1,
    name: "Hampi",
    location: "Karnataka",
    period: "Vijayanagara Empire (14th-16th century)",
    description: "Ruins of the last great Hindu kingdom in South India, with magnificent temples and royal complexes.",
    significance: "UNESCO World Heritage Site",
    highlights: "Vijaya Vittala Temple, Virupaksha Temple, Royal Enclosure",
    bestTime: "October to March",
    notableFeatures: ["Stone chariot", "Bas-reliefs", "Monolithic structures"],
    image: '/hampi.png'
  },
  {
    id: 2,
    name: "Khajuraho Temples",
    location: "Madhya Pradesh",
    period: "950-1050 CE",
    description: "Group of Hindu and Jain temples famous for their intricate sculptures and architectural excellence.",
    significance: "UNESCO World Heritage Site",
    highlights: "Kandariya Mahadeva, Lakshmana Temple, Erotic Sculptures",
    bestTime: "October to March",
    notableFeatures: ["Intricate carvings", "Sculptural panels", "Temple festivals"],
    image:'/kajuraho.png'
  },
  {
    id: 3,
    name: "Konark Sun Temple",
    location: "Odisha",
    period: "13th century",
    description: "Magnificent temple dedicated to the Sun God, designed as a colossal chariot with stone wheels.",
    significance: "UNESCO World Heritage Site",
    highlights: "Stone chariot, Wheel carvings, Intricate stonework",
    bestTime: "October to March",
    notableFeatures: ["Sunrise views", "Stone wheel carvings", "Rath design"],
    image: '/konark.png'
  },
  {
    id: 4,
    name: "Fatehpur Sikri",
    location: "Uttar Pradesh",
    period: "1571-1585",
    description: "Former Mughal capital built by Emperor Akbar, showcasing the finest Mughal architecture.",
    significance: "UNESCO World Heritage Site",
    highlights: "Buland Darwaza, Jama Masjid, Panch Mahal",
    bestTime: "October to March",
    notableFeatures: ["Red sandstone palaces", "Courtyards", "Imperial complexes"],
    image: '/fatehpur.png'
  }
  ,
  {
    id: 5,
    name: "Elephanta Caves",
    location: "Mumbai, Maharashtra",
    period: "5th-8th century",
    description: "Rock-cut cave temples primarily dedicated to Lord Shiva, featuring impressive sculptures and reliefs.",
    significance: "UNESCO World Heritage Site",
    highlights: "Trimurti sculpture, Cave shrines",
    bestTime: "November to February",
    notableFeatures: ["Rock-cut architecture", "Shiva sculptures", "Island setting"],
    image: '/elephanta.png'    
  },
  {
    id: 6,
    name: "Meenakshi Amman Temple",
    location: "Madurai, Tamil Nadu",
    period: "6th century onward",
    description: "A historic Hindu temple complex known for its towering gopurams covered with colorful sculptures and a vibrant temple festival tradition.",
    significance: "Major cultural and religious site",
    highlights: "Meenakshi sanctum, Thousand-pillared hall",
    bestTime: "October to March",
    notableFeatures: ["Dravidian architecture", "Sculpted gopurams", "Festivals"],
    image:'/madurai.png' 
  },
  {
    id: 7,
    name: "Sanchi Stupa",
    location: "Sanchi, Madhya Pradesh",
    period: "3rd century BCE onwards",
    description: "One of the oldest stone structures in India, built by Emperor Ashoka and an important Buddhist monument with intricately carved gateways.",
    significance: "UNESCO World Heritage Site",
    highlights: "Great Stupa, Toranas (gateways)",
    bestTime: "November to February",
    notableFeatures: ["Buddhist stupa", "Stone carvings", "Ashokan pillars"],
    image:'/sanchi.png'
  },
  {
    id: 8,
    name: "Mysore Palace",
    location: "Mysore, Karnataka",
    period: "1897 (current structure)",
    description: "A grand palace of the Wodeyar dynasty, famed for its ornate architectural style and the dazzling Dussehra celebrations.",
    significance: "Iconic royal palace",
    highlights: "Durbar Hall, Royal Pavilion",
    bestTime: "October to March",
    notableFeatures: ["Indo-Saracenic architecture", "Illumination at night", "Royal collections"],
    image: '/mysore.png'
  }
];

// Note: continuing file - add three new Art Form entries earlier in culturalData
