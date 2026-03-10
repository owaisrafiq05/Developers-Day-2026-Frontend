import type {
  PublicRegistrationRequest,
  PublicRegistrationResponse,
} from "@/types/registration";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_ROOT = API_BASE_URL?.replace(/\/api\/?$/, "") || API_BASE_URL;

if (!API_ROOT) {
  // eslint-disable-next-line no-console
  console.warn(
    "[registration api] NEXT_PUBLIC_API_BASE_URL is not set. Registration submissions will fail until it is configured."
  );
}

export async function submitPublicRegistration(
  payload: PublicRegistrationRequest
): Promise<PublicRegistrationResponse> {
  if (!API_ROOT) {
    throw new Error(
      "API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL."
    );
  }

  const formData = new FormData();

  formData.append("competitionId", payload.competitionId);
  formData.append("teamName", payload.teamName);

  if (payload.referenceCode) {
    formData.append("referenceCode", payload.referenceCode);
  }

  formData.append("leaderFullName", payload.leaderFullName);
  formData.append("leaderEmail", payload.leaderEmail);
  formData.append("leaderCnic", payload.leaderCnic);

  if (payload.leaderPhone) {
    formData.append("leaderPhone", payload.leaderPhone);
  }

  if (payload.leaderInstitution) {
    formData.append("leaderInstitution", payload.leaderInstitution);
  }

  if (payload.members.length > 0) {
    formData.append("members", JSON.stringify(payload.members));
  }

  formData.append("paymentScreenshot", payload.paymentScreenshot);

  const response = await fetch(`${API_ROOT}/public/registrations`, {
    method: "POST",
    body: formData,
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    const message =
      json?.message ||
      (Array.isArray(json?.errors) && json.errors[0]?.message) ||
      "Failed to submit registration.";
    throw new Error(message);
  }

  return json.data as PublicRegistrationResponse;
}

