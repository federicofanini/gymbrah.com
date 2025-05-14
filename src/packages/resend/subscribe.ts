"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "../database/types/action-response";

const schema = z.object({
  email: z.string().email(),
});

export const subscribeAction = createSafeActionClient()
  .schema(schema)
  .action(async (input): Promise<ActionResponse> => {
    try {
      // Add to Resend audience
      if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
        try {
          const resendResponse = await fetch(
            `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: input.parsedInput.email,
                first_name: "",
                last_name: "",
                unsubscribed: false,
              }),
              cache: "no-store",
            }
          );

          if (!resendResponse.ok) {
            console.error(
              "Failed to add contact to Resend audience:",
              await resendResponse.text()
            );
          }
        } catch (resendError) {
          console.error("Resend API error:", resendError);
        }
      }

      revalidatePath("/");

      return {
        success: true,
        data: input.parsedInput.email,
      };
    } catch (error) {
      console.error("Subscribe error:", error);
      return {
        success: false,
        error: "UNEXPECTED_ERROR",
      };
    }
  });

export async function getSubscriberCount(): Promise<ActionResponse> {
  try {
    // First try to get count from Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
      try {
        const response = await fetch(
          `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (response.ok) {
          const data = await response.json();
          return {
            success: true,
            data: {
              count: data.data.length,
            },
          };
        }
      } catch (resendError) {
        console.error("Resend count error:", resendError);
      }
    }

    return {
      success: true,
      data: {
        count: 0,
      },
    };
  } catch (error) {
    console.error("Error fetching subscriber count:", error);
    return {
      success: false,
      error: "UNEXPECTED_ERROR",
    };
  }
}
