import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

// ✅ Your Firebase config (replace with actual values)

const firebaseConfig = {
  apiKey: "AIzaSyA-2vIlukJaqt37jl_s78lzSIPwk6v0uVo",
  authDomain: "pulsepoint-5d568.firebaseapp.com",
  databaseURL: "https://pulsepoint-5d568-default-rtdb.firebaseio.com",
  projectId: "pulsepoint-5d568",
  storageBucket: "pulsepoint-5d568.firebasestorage.app",
  messagingSenderId: "994769164321",
  appId: "1:994769164321:web:e96053392e5089e547ab60",
  measurementId: "G-G7S7CR45GL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Slot fields you expect in every doctor document
const slotFields = ["10-am", "11-am", "12-pm", "14-pm", "15-pm", "16-pm", "17-pm", "18-pm"];

// ✅ Admin function to update all boolean slots to strings
const convertSlotsToStrings = async () => {
  const appointmentsRef = collection(db, "appointments");
  const snapshot = await getDocs(appointmentsRef);

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const updates = {};

    slotFields.forEach((slot) => {
      const value = data[slot];

      if (value === true) {
        updates[slot] = "Available";
      } else if (value === false) {
        updates[slot] = "Booked"; // Temporary label — will be patient name later
      }
    });

    if (Object.keys(updates).length > 0) {
      await updateDoc(doc(db, "appointments", docSnap.id), updates);
      console.log(`✅ Updated ${docSnap.id} with`, updates);
    } else {
      console.log(`ℹ️ No changes needed for ${docSnap.id}`);
    }
  }

  console.log("🎉 All appointment slots converted to strings.");
};

// ✅ Run it
convertSlotsToStrings().catch((err) =>
  console.error("❌ Error updating appointment slots:", err)
);
