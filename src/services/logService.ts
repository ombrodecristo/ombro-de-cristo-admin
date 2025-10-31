import { supabase } from "../lib/supabaseClient";
import { type Json } from "../types/supabase";

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
  if (level === "ERROR") {
    console.error(message, metadata ?? "");
  } else if (level === "WARN") {
    console.warn(message, metadata ?? "");
  } else {
    console.log(message, metadata ?? "");
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

async function logError(error: Error, metadata?: Omit<LogMetadata, "stack">) {
  await writeLog("ERROR", error.message, {
    ...metadata,
    stack: error.stack,
  });
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
