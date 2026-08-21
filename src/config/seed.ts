import "dotenv/config";
import { connectDatabase } from "./db";
import { AnnouncementModel } from "../models/Announcement";
import { CareerModel } from "../models/Career";
import { HospitalInfoModel } from "../models/HospitalInfo";
import { ServiceModel } from "../models/Service";
import { StaffModel } from "../models/Staff";
import mongoose from "mongoose";

const PLACEHOLDER_IMAGE_BASE = "https://placehold.co";

const hospitalInfoSeed = {
  name: "Nasipit District Hospital",
  tagline: "Caring for our community since 1975",
  address: "D-6 Kinabjangan, Nasipit, Agusan Del Norte, Philippines",
  phone: "(049) 123-4567",
  emergencyHotline: "0917-123-4567",
  email: "info@nasipitdistrict.hospital",
  hours: "Emergency & Trauma: Open 24/7 · OPD: Monday–Saturday, 8:00 AM–5:00 PM",
  foundedYear: 1975,
  bedCount: 15,
  departmentCount: 12,
  accreditations: ["DOH-licensed Level II General Hospital", "PhilHealth-accredited"],
  facebookUrl: "https://facebook.com/nasipitdistricthospital",
  // Fictional address has no real embeddable map; the client falls back to a placeholder image.
  googleMapsEmbedUrl: undefined,
};

const announcementSeeds = [
  {
    title: "Free Flu Vaccination Drive This Weekend",
    content:
      "Nasipit District Hospital will hold a free flu vaccination drive for senior citizens and children under 5 this Saturday, 8:00 AM to 3:00 PM, at the OPD lobby. Walk-ins are welcome; please bring a valid ID and, for minors, a barangay health record.",
    isActive: true,
    publishedAt: new Date("2026-08-15"),
  },
  {
    title: "New Radiology Wing Now Open",
    content:
      "Our newly renovated Radiology & Imaging wing is now open, featuring a new digital X-ray unit and upgraded ultrasound suites. The expansion reduces average wait times for imaging results from 2 days to same-day for most outpatient cases.",
    isActive: true,
    publishedAt: new Date("2026-08-10"),
  },
  {
    title: "Holiday Schedule for OPD Departments",
    content:
      "Outpatient departments will observe modified hours during the upcoming holiday. Emergency and Trauma services remain open 24/7 as usual. Please call our main line ahead of your visit to confirm department-specific hours.",
    isActive: true,
    publishedAt: new Date("2026-08-05"),
  },
];

const staffSeeds = [
  {
    name: "Dr. Maria Santos",
    role: "Internal Medicine",
    schedule: "Mon, Wed, Fri · 9:00 AM–12:00 PM",
    imageUrl: `${PLACEHOLDER_IMAGE_BASE}/400x400?text=Dr.+Santos`,
    bio: "Dr. Santos has over 15 years of experience in internal medicine, with a focus on chronic disease management for adult and geriatric patients.",
    isActive: true,
  },
  {
    name: "Dr. Antonio Reyes",
    role: "Pediatrics",
    schedule: "Tue, Thu, Sat · 1:00 PM–5:00 PM",
    imageUrl: `${PLACEHOLDER_IMAGE_BASE}/400x400?text=Dr.+Reyes`,
    bio: "Dr. Reyes specializes in newborn and childhood care, including well-baby checkups, immunizations, and developmental screening.",
    isActive: true,
  },
  {
    name: "Dr. Liza Fernandez",
    role: "Obstetrics & Gynecology",
    schedule: "Mon–Fri · 8:00 AM–11:00 AM",
    imageUrl: `${PLACEHOLDER_IMAGE_BASE}/400x400?text=Dr.+Fernandez`,
    bio: "Dr. Fernandez provides prenatal, delivery, and postnatal care, and leads the hospital's maternal health outreach programs.",
    isActive: true,
  },
  {
    name: "Dr. Carlos Villanueva",
    role: "General Surgery",
    schedule: "Mon, Tue, Thu · 10:00 AM–2:00 PM",
    imageUrl: `${PLACEHOLDER_IMAGE_BASE}/400x400?text=Dr.+Villanueva`,
    bio: "Dr. Villanueva has performed over a thousand surgical procedures, ranging from routine appendectomies to complex trauma repair.",
    isActive: true,
  },
  {
    name: "Dr. Grace Tan",
    role: "Emergency Medicine",
    schedule: "Rotating shifts · 24/7 Emergency Department",
    imageUrl: `${PLACEHOLDER_IMAGE_BASE}/400x400?text=Dr.+Tan`,
    bio: "Dr. Tan leads the Emergency Department's trauma response team and coordinates with local barangay health units for disaster preparedness.",
    isActive: true,
  },
  {
    name: "Dr. Ramon Cruz",
    role: "Orthopedics",
    schedule: "Wed, Fri · 9:00 AM–1:00 PM",
    imageUrl: `${PLACEHOLDER_IMAGE_BASE}/400x400?text=Dr.+Cruz`,
    bio: "Dr. Cruz treats fractures, joint injuries, and musculoskeletal conditions, and oversees the hospital's rehabilitation referral program.",
    isActive: true,
  },
  {
    name: "Elena Morales, RN",
    role: "Head Nurse",
    schedule: "Mon–Fri · 7:00 AM–3:00 PM",
    imageUrl: `${PLACEHOLDER_IMAGE_BASE}/400x400?text=E.+Morales`,
    bio: "Elena leads the nursing staff across all wards, coordinating patient care schedules and mentoring newly licensed nurses.",
    isActive: true,
  },
  {
    name: "Joel Dizon",
    role: "Administrative Officer",
    schedule: "Mon–Fri · 8:00 AM–5:00 PM",
    imageUrl: `${PLACEHOLDER_IMAGE_BASE}/400x400?text=J.+Dizon`,
    bio: "Joel oversees hospital records, patient admissions, and coordinates front-desk operations for a smoother patient experience.",
    isActive: true,
  },
];

const serviceSeeds = [
  {
    name: "Emergency Room Care",
    description:
      "Round-the-clock emergency care for trauma, cardiac events, and acute illness, staffed by a dedicated emergency medicine team.",
    category: "Emergency & Trauma",
    operatingHours: "Open 24/7",
    imageUrl: "/components/hospitalnas.png",
    isActive: true,
  },
  {
    name: "Ambulance & Trauma Response",
    description:
      "Emergency transport and on-site stabilization for critical patients within Nasipit and neighboring barangays.",
    category: "Emergency & Trauma",
    operatingHours: "Open 24/7",
    imageUrl: "/components/healthcare1.jpg",
    isActive: true,
  },
  {
    name: "Trauma Stabilization Unit",
    description:
      "A dedicated bay for stabilizing severe trauma cases before transfer to surgery or the intensive care unit.",
    category: "Emergency & Trauma",
    operatingHours: "Open 24/7",
    imageUrl: "/components/pexels-karola-g-4386466.jpg",
    isActive: true,
  },
  {
    name: "General Outpatient Consultation",
    description:
      "Walk-in and scheduled consultations with general practitioners for common illnesses, checkups, and referrals.",
    category: "Outpatient/OPD",
    operatingHours: "Mon–Sat, 8:00 AM–5:00 PM",
    imageUrl: "/components/healthcare1.jpg",
    isActive: true,
  },
  {
    name: "Specialist OPD Clinics",
    description:
      "Scheduled outpatient consultations with visiting specialists across internal medicine, pediatrics, and surgery.",
    category: "Outpatient/OPD",
    operatingHours: "Mon–Fri, 8:00 AM–4:00 PM",
    imageUrl: "/components/healthcare2.jpg",
    isActive: true,
  },
  {
    name: "Minor Procedures Clinic",
    description:
      "Same-day treatment for minor wounds, sutures, and outpatient procedures that do not require hospital admission.",
    category: "Outpatient/OPD",
    operatingHours: "Mon–Sat, 8:00 AM–5:00 PM",
    imageUrl: "/components/pexels-gabby-k-5841806.jpg",
    isActive: true,
  },
  {
    name: "Clinical Laboratory Testing",
    description:
      "Blood chemistry, hematology, urinalysis, and microbiology testing with same-day results for most panels.",
    category: "Diagnostic & Laboratory",
    operatingHours: "Mon–Sat, 6:00 AM–8:00 PM",
    imageUrl: "/components/healthcare2.jpg",
    isActive: true,
  },
  {
    name: "COVID-19 & Infectious Disease Testing",
    description: "Rapid antigen and PCR testing for common infectious diseases, with results available within 24 hours.",
    category: "Diagnostic & Laboratory",
    operatingHours: "Mon–Sat, 7:00 AM–4:00 PM",
    imageUrl: "/components/pexels-gabby-k-5841806.jpg",
    isActive: true,
  },
  {
    name: "Prenatal Checkups",
    description:
      "Routine prenatal monitoring, ultrasounds, and health education for expectant mothers throughout pregnancy.",
    category: "Maternal & Child Health",
    operatingHours: "Mon–Fri, 8:00 AM–11:00 AM",
    imageUrl: "/components/pexels-karola-g-4386466.jpg",
    isActive: true,
  },
  {
    name: "Newborn & Immunization Care",
    description:
      "Well-baby checkups, growth monitoring, and the full national immunization schedule for infants and children.",
    category: "Maternal & Child Health",
    operatingHours: "Tue, Thu, Sat, 1:00 PM–5:00 PM",
    imageUrl: "/components/nasipitpics.png",
    isActive: true,
  },
];

const careerSeeds = [
  {
    title: "Staff Nurse",
    department: "Emergency Department",
    type: "Full-time" as const,
    description:
      "We are seeking a licensed Staff Nurse to join our Emergency Department, providing direct patient care and supporting rapid trauma response.",
    requirements: "Registered Nurse license, BLS/ACLS certification, minimum 1 year of clinical experience preferred.",
    howToApply: "Send your resume and license copy to careers@nasipitdistrict.hospital with the subject 'Staff Nurse Application'.",
    isActive: true,
    postedAt: new Date("2026-08-12"),
  },
  {
    title: "Medical Technologist",
    department: "Clinical Laboratory",
    type: "Full-time" as const,
    description:
      "Join our laboratory team performing hematology, chemistry, and microbiology testing to support accurate and timely diagnoses.",
    requirements: "Licensed Medical Technologist, PRC license in good standing, experience with laboratory information systems a plus.",
    howToApply: "Submit your application through the HR office or email careers@nasipitdistrict.hospital.",
    isActive: true,
    postedAt: new Date("2026-08-08"),
  },
  {
    title: "Radiologic Technologist",
    department: "Radiology & Imaging",
    type: "Part-time" as const,
    description:
      "Operate X-ray and ultrasound equipment to produce diagnostic images, working alongside our radiology and physician teams.",
    requirements: "Licensed Radiologic Technologist, PRC license, willingness to work rotating shifts.",
    howToApply: "Email your resume and license to careers@nasipitdistrict.hospital with the subject 'Radiologic Technologist Application'.",
    isActive: true,
    postedAt: new Date("2026-08-01"),
  },
];

async function seed(): Promise<void> {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) throw new Error("MONGO_URI is not set");

  await connectDatabase(mongoUri);
  console.log("Connected to MongoDB for seeding");

  await Promise.all([
    HospitalInfoModel.deleteMany({}),
    AnnouncementModel.deleteMany({}),
    StaffModel.deleteMany({}),
    ServiceModel.deleteMany({}),
    CareerModel.deleteMany({}),
  ]);
  console.log("Cleared existing collections");

  await HospitalInfoModel.create(hospitalInfoSeed);
  await AnnouncementModel.insertMany(announcementSeeds);
  await StaffModel.insertMany(staffSeeds);
  await ServiceModel.insertMany(serviceSeeds);
  await CareerModel.insertMany(careerSeeds);

  console.log("Seed data inserted successfully");
  await mongoose.disconnect();
}

seed().catch((error: unknown) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
