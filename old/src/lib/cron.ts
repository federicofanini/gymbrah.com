import { CronJob } from "cron";
import type { ActionResponse } from "@/actions/types/action-response";

export class Cron {
  private job: CronJob;

  constructor(
    cronTime: string,
    timeZone: string,
    onTick: () => Promise<ActionResponse>
  ) {
    this.job = new CronJob(
      cronTime,
      async () => {
        try {
          await onTick();
        } catch (error) {
          console.error("Cron job failed:", error);
        }
      },
      null,
      false,
      timeZone
    );
  }

  start(): void {
    this.job.start();
  }

  stop(): void {
    this.job.stop();
  }
}
