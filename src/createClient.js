import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qhaalqypfxpnvhzxvtrm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYWFscXlwZnhwbnZoenh2dHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQxMTcyNTcsImV4cCI6MjAwOTY5MzI1N30.UtldHG8YHACDUaNSKDrcfeO4vWrN04J8ZGERXhR-tO8"
);
