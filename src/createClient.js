import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://liqbjqsqeclrrgjqjcze.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcWJqcXNxZWNscnJnanFqY3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5MDQ1MzUsImV4cCI6MjA0NDQ4MDUzNX0.DLYgPRpMbHVOaNXG6G_B6BABRtL6esoVv-Wzr7F1Zj0"
);