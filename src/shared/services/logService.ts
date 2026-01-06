import { supabase } from "@/core/lib/supabaseClient";
import type { Json } from "@/core/types/supabase";
import type { PostgrestError } from "@supabase/supabase-js";

type LogLevel = "ERROR" | "INFO" | "WARN";

type LogMetadata = {
  stack?: string;
  component?: string;
  [key: string]: unknown;
};

async function writeLog(
  level: LogLevel,
  message: string,
  metadata?: LogMetadata
) {
  if (import.meta.env.MODE !== "production") {
    const logArgs = metadata ? [message, metadata] : [message];
    if (level === "ERROR") {
      console.error(...logArgs);
    } else if (level === "WARN") {
      console.warn(...logArgs);
    } else {
      console.log(...logArgs);
    }
  }

  const { error } = await supabase.from("logs").insert({
    level,
    message,
    metadata: metadata as Json,
  });

  if (error) {
    console.error("Failed to write log to Supabase:", error.message);
  }
}

async function logError(
  error: Error | PostgrestError,
  metadata?: Omit<LogMetadata, "stack">
) {
  const logMetadata: LogMetadata = { ...metadata };
  if (error instanceof Error) {
    logMetadata.stack = error.stack;
  }

  await writeLog("ERROR", error.message, logMetadata);
}

async function logInfo(message: string, metadata?: LogMetadata) {
  await writeLog("INFO", message, metadata);
}

async function logWarn(message: string, metadata?: LogMetadata) {
  await writeLog("WARN", message, metadata);
}

export const logService = {
  logError,
  logInfo,
  logWarn,
};
