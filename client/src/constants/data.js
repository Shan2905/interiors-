export const SERVICES = [
  { id:1, category:"Interior Paints", title:"Premium Emulsion", desc:"Silk, matte & semi-gloss finishes in 1000+ shades. Low VOC, washable, anti-fungal.", features:["Washable & Scrub Resistant","Low VOC Formula","Anti-Fungal Protection","1000+ Shade Options"], accent:"#D4522A" },
  { id:2, category:"Exterior Paints", title:"Weather Guard Exterior", desc:"All-season protection engineered for Indian climate. UV-stable & waterproof.", features:["UV Ray Protection","Waterproof Coating","Anti-Algae Formula","5-Year Warranty"], accent:"#2A7DD4" },
  { id:3, category:"Wall Putty", title:"WallCare Putty", desc:"White cement-based putty for a flawless smooth base. Superior adhesion.", features:["Smooth Base Finish","Excellent Adhesion","Water Resistant Grade","Reduces Paint Consumption"], accent:"#8B7355" },
  { id:4, category:"Wall Putty", title:"AquaShield Putty", desc:"100% waterproof putty for bathrooms, kitchens & wet zones.", features:["100% Waterproof","Ideal for Wet Areas","Anti-Crack Formula","Long-Lasting Bond"], accent:"#2A9D8F" },
  { id:5, category:"Designer Textures", title:"Sand Texture Finish", desc:"Rich dimensional walls that add architectural depth & character.", features:["Architectural Depth","Accent Wall Specialist","Custom Patterns","Premium Finish"], accent:"#C07A3A" },
  { id:6, category:"Designer Textures", title:"Stone Effect Texture", desc:"Natural stone elegance for luxury interiors at a fraction of the cost.", features:["Natural Stone Look","Luxury Appeal","Durable Surface","Easy Maintenance"], accent:"#6B5E4E" },
  { id:7, category:"Enamel & Gloss", title:"High Gloss Enamel", desc:"Mirror-like gloss for doors, windows & furniture. Chip resistant.", features:["Mirror Gloss Finish","Chip Resistant","For Wood & Metal","Fast Drying"], accent:"#1A1A2E" },
  { id:8, category:"Accessories", title:"Professional Tools Kit", desc:"Complete range — rollers, brushes, putty knives, masking tape & more.", features:["Professional Grade","Full Range","For All Surfaces","Bulk Supply"], accent:"#4A4A4A" },
];

export const CATEGORIES = ["All","Interior Paints","Exterior Paints","Wall Putty","Designer Textures","Enamel & Gloss","Accessories"];

export const PROJECTS = [
  { title:"Modern Residential Villa", location:"Guntur", type:"Full Interior", area:"3200 sq ft", year:"2024" },
  { title:"Commercial Office Space", location:"Vijayawada", type:"Exterior + Interior", area:"8500 sq ft", year:"2024" },
  { title:"Luxury Apartment Complex", location:"Hyderabad", type:"Designer Textures", area:"12000 sq ft", year:"2023" },
  { title:"Boutique Hotel Interiors", location:"Visakhapatnam", type:"Premium Texture Work", area:"6700 sq ft", year:"2023" },
  { title:"Heritage Home Restoration", location:"Amaravathi", type:"Full Renovation", area:"4100 sq ft", year:"2023" },
  { title:"Corporate Headquarters", location:"Warangal", type:"Commercial Painting", area:"15000 sq ft", year:"2022" },
];

export const GOLD = "#C4A882";
export const DARK = "#0F0F0F";
export const MID  = "#1A1A1A";
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
