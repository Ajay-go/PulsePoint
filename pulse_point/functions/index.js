const { onSchedule } = require("firebase-functions/v2/scheduler");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const firestore = getFirestore();

exports.resetDoctorSlotsDaily = onSchedule(
  {
    schedule: "every day 06:00",
    timeZone: "Asia/Kolkata",
  },
  async (event) => {
    console.log("Running scheduled doctor slot reset...");

    try {
      const doctorsSnapshot = await firestore.collection("pulse_point").get();

      for (const docSnap of doctorsSnapshot.docs) {
        const doctorId = docSnap.id;
        const formattedDocId = doctorId.replace(/\s+/g, "_").replace(/\./g, "");
        const appointmentRef = firestore.collection("appointments").doc(formattedDocId);

        const updatedSlots = {
          "10-am": "Available",
          "11-am": "Available",
          "12-pm": "Available",
          "14-pm": "Available",
          "15-pm": "Available",
          "16-pm": "Available",
          "17-pm": "Available",
          "18-pm": "Available",
        };

        await appointmentRef.set(updatedSlots, { merge: true });
        console.log(`✅ Updated slots for ${doctorId}`);
      }

      console.log("🎉 All doctor slots updated successfully.");
    } catch (err) {
      console.error("❌ Error resetting slots:", err);
    }
  }
);
