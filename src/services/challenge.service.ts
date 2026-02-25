import axios from "axios";
import { apiClient } from "@/api";
import { API_ENDPOINTS } from "@/constants";

export interface SubmitChallengePayload {
  applicationId: string;
  pastebinUrl: string;
  answer: number;
}

export interface SubmitChallengeResponse {
  ok: boolean;
}

// Maps HTTP status codes from the challenge API to user-facing messages
const SUBMIT_ERRORS: Record<number, string> = {
  400: "Respuesta incorrecta o debés iniciar el challenge primero (Step 1).",
  403: "No completaste el primer challenge.",
  404: "No se encontró un candidato con ese Application ID.",
  409: "Ya enviaste tu respuesta anteriormente.",
  410: "Se acabó el tiempo (30 minutos). No podés enviar más tu respuesta.",
};

export class ChallengeService {
  static async submitChallenge(
    payload: SubmitChallengePayload,
  ): Promise<SubmitChallengeResponse> {
    try {
      const response = await apiClient.post<SubmitChallengeResponse>(
        API_ENDPOINTS.CANDIDATE.SUBMIT_CHALLENGE,
        payload,
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const msg =
          SUBMIT_ERRORS[err.response.status] ??
          `Error inesperado (${err.response.status}).`;
        throw new Error(msg);
      }
      throw new Error("No se pudo conectar al servidor. Verificá tu conexión.");
    }
  }
}
