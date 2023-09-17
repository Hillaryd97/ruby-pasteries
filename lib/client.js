import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "8owdl5tw",
  dataset: "production",
  apiVersion: "2023-09-15",
  useCdn: true,
  // token:
  //   "skd9aKWjisUXrGggwgWfC4AEO6xFY538p29trydiF9bZTYOx8t8usxxXuLIeudJx63hxyw9Nj8JRFqpPDDaM8YT5QOmHaAzwI7mSGg46klkzwfL6R7K0oy5XsKBIS5etRg2RmDcXPVgBaSbtPSCkMwPR3LZaqBgfpY6RBtr54UpmQEDKUVOi",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
