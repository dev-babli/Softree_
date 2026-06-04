/**
 * Type definitions for the TestimonialSlider component.
 */

export interface TestimonialSlide {
  /** Unique identifier for the slide */
  id: string;
  /** Quote text (rendered inside blockquote) */
  quote: string;
  /** Person's name */
  name: string;
  /** Person's title/role (used when company is not set) */
  title?: string;
  /** Company name */
  company?: string;
  /** Client location */
  location?: string;
  /** Optional background image (unused when Grainient brand panel is shown) */
  image?: string;
  /** Company logo (shown centered over gradient) */
  logo?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Star rating (1-5). Default: 5 */
  rating?: number;
}

export type TestimonialSliderVariant = "default" | "softree";

export interface TestimonialSliderProps {
  /** Array of testimonial slides */
  slides: TestimonialSlide[];
  /** Optional eyebrow label. Default: "Client Stories" */
  eyebrowLabel?: string;
  /** Optional additional className on the root */
  className?: string;
  /** Callback when active slide changes */
  onSlideChange?: (index: number) => void;
  /** `softree` = compact section height + brand accents. Default: `default` */
  variant?: TestimonialSliderVariant;
}
