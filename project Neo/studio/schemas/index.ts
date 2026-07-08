// Document types
import page from "./documents/page";
import post from "./documents/post";
import project from "./documents/project";
import person from "./documents/person";
import settings from "./singletons/settings";

// Object types
import callToAction from "./objects/callToAction";
import infoSection from "./objects/infoSection";
import heroSection from "./objects/heroSection";

export const schemaTypes = [
  // Documents
  page,
  post,
  project,
  person,
  settings,
  // Objects
  callToAction,
  infoSection,
  heroSection,
];
