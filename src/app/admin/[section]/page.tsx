import { notFound } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin · OM SAI MITRA MANDAL",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  "days",
  "events",
  "aartis",
  "notices",
  "gallery",
  "mandal",
  "visarjan",
  "contacts",
  "settings",
];

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section }));
}

export default async function AdminSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { section } = await params;
  const { edit } = await searchParams;
  if (!SECTIONS.includes(section)) notFound();
  return <AdminDashboard section={section} editSlug={edit} />;
}
