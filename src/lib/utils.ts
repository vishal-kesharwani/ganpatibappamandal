import { FESTIVAL_CONFIG, FESTIVAL_DAYS } from "@/data/festival";

/** Local calendar date as YYYY-MM-DD (timezone-safe: uses device date). */
export function localISODate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Auto day checker — maps the device calendar date to the festival day.
 * Returns 0 before the festival, 1–7 during, 8 after.
 * Timezone-safe: compares calendar dates, never millisecond diffs against
 * UTC-midnight parsed strings.
 */
export function getCurrentDay(): number {
  const today = localISODate();
  const idx = FESTIVAL_DAYS.findIndex((d) => d.date === today);
  if (idx >= 0) return idx + 1;
  return today < FESTIVAL_CONFIG.startDate ? 0 : 8;
}

export function getCurrentDayData() {
  const day = getCurrentDay();
  return FESTIVAL_DAYS.find(d => d.day === day);
}

export function isFestivalActive(): boolean {
  const day = getCurrentDay();
  return day >= 1 && day <= 7;
}

export function formatTime12(time24: string): string {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function formatTime24(timeStr: string): string {
  return timeStr;
}

export function getTimeStatus(time: string, timeEnd?: string): "past" | "live" | "upcoming" {
  const now = new Date();
  const [startHours, startMinutes] = time.split(":").map(Number);
  const startTime = new Date();
  startTime.setHours(startHours, startMinutes, 0, 0);

  if (timeEnd) {
    const [endHours, endMinutes] = timeEnd.split(":").map(Number);
    const endTime = new Date();
    endTime.setHours(endHours, endMinutes, 0, 0);

    if (now >= startTime && now <= endTime) return "live";
  }

  if (now >= startTime) return "past";
  return "upcoming";
}

export function getTimeUntil(time: string): string {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const targetTime = new Date();
  targetTime.setHours(hours, minutes, 0, 0);

  if (targetTime <= now) return "";

  const diffMs = targetTime.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const remainingMins = diffMins % 60;

  if (diffHours > 0) {
    return `${diffHours} तास ${remainingMins} मिनिटे`;
  }
  return `${diffMins} मिनिटे`;
}

export function shareText(text: string, url?: string): void {
  if (navigator.share) {
    navigator.share({
      title: "OM SAI MITRA MANDAL",
      text: text,
      url: url || window.location.href,
    }).catch(() => {});
  } else {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + (url ? "\n" + url : ""))}`;
    window.open(whatsappUrl, "_blank");
  }
}

export function shareToWhatsApp(text: string, url?: string): void {
  const message = url ? `${text}\n\n${url}` : text;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
}

export function generateCalendarUrl(title: string, date: string, time: string, description?: string): string {
  const startDate = new Date(`${date}T${time}:00`);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  
  const format = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${format(startDate)}/${format(endDate)}`,
    details: description || "",
    location: "Triveni Sangam Apartment",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
