import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin · OM SAI MITRA MANDAL",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard section="overview" />;
}
