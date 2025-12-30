// // Generate time slots between startHour and endHour every 2 hours
// export function generateTimeSlots(startHour = 9, endHour = 18) {
//   const slots = [];

//   for (let h = startHour; h <= endHour; h += 2) {
//     const hourStr = h.toString().padStart(2, "0");
//     slots.push(`${hourStr}:00`);
//   }

//   return slots;
// }

// export function generateTimeSlots(startHour, endHour, interval = 120) {
//   const slots = [];
//   for (let h = startHour; h < endHour; h += interval / 60) {
//     const hour = String(Math.floor(h)).padStart(2, "0");
//     const minute = "00";
//     slots.push(`${hour}:${minute}`);
//   }
//   return slots;
// }

export function generateTimeSlots(startHour, endHour) {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour += 2) {
    const hh = hour.toString().padStart(2, "0");
    slots.push(`${hh}:00`);
  }
  return slots;
}
