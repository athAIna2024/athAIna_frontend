import axios from "@/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

export const initiatePasswordChange = async () => {
  const router = useRouter();
  const userStore = useUserStore();
  const email = userStore.getEmail();

  try {
    // First get the user's email from the store
    if (!email) {
      throw new Error("User email not found. Please log in again.");
    }

    // Send the password change request with the current user's email
    const response = await axios.post(
      "/account/password-change-request/",
      { email: email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.successful) {
      // Navigate directly to OTP verification page with email already processed
      router.push({
        name: "change_password_otp",
        params: { email: email },
      });
      return true;
    } else {
      throw new Error(response.data.message || "Failed to send reset email");
    }
  } catch (err) {
    console.error("Error initiating password change:", err);
    throw err;
  }
};
