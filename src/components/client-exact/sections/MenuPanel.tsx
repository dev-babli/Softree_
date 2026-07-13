"use client"

import { assets } from "../content"

import { menu } from "../content"

/**
 * Exact Hanza open-menu panel (framer-rFApl Desktop).
 * Left: nav + profile. Right: project image cards.
 */
export function MenuPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div
      className="framer-3L5GK framer-cqh11d-container cx-menu-panel"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="framer-rFApl framer-J0UB8 framer-0fB9Y framer-1wybxq8 framer-v-1wybxq8" data-framer-name="Desktop" style={{ backgroundColor: "var(--token-a4a8718c-07f9-4933-9dc3-7840f6471332, rgb(25, 25, 25))", boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 20px 0px", opacity: "1" }}>
        <div className="framer-j5mz3r" data-framer-name="Menu" style={{ opacity: "1" }}>
          <nav className="framer-1ely9zm" data-framer-name="Nav" style={{ opacity: "1" }}>
            <div className="framer-1ibeai8-container" style={{ opacity: "1" }}>
              <a className="framer-c6z8u framer-GxmSJ framer-3x0ad0 framer-v-3x0ad0 framer-17jup9s" data-framer-name="Inverse" data-highlight="true" href="#home-hero" data-framer-page-link-current="true" tabIndex={0} style={{ width: "100%", opacity: "1" }}>
                <div className="framer-n2tvl0" data-framer-name="Vector" style={{ backgroundColor: "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))", transform: "scale(0)", opacity: "1" }} />
                <div className="framer-1cz5rc9" data-framer-component-type="RichTextContainer" style={{ ["--extracted-r6o4lv"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                  <p className="framer-text framer-styles-preset-1s378tr" data-styles-preset="QivRp3Nud" dir="auto" style={{ ["--framer-text-color"]: "var(--extracted-r6o4lv, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))" }}>
                    Home
                  </p>
                </div>
              </a>
            </div>
            <div className="framer-14pe6wh-container" style={{ opacity: "1" }}>
              <a className="framer-c6z8u framer-GxmSJ framer-3x0ad0 framer-v-3x0ad0 framer-17jup9s" data-framer-name="Inverse" data-highlight="true" href="#home-industries" tabIndex={0} style={{ width: "100%", opacity: "1" }}>
                <div className="framer-n2tvl0" data-framer-name="Vector" style={{ backgroundColor: "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))", transform: "scale(0)", opacity: "1" }} />
                <div className="framer-1cz5rc9" data-framer-component-type="RichTextContainer" style={{ ["--extracted-r6o4lv"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                  <p className="framer-text framer-styles-preset-1s378tr" data-styles-preset="QivRp3Nud" dir="auto" style={{ ["--framer-text-color"]: "var(--extracted-r6o4lv, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))" }}>
                    Industries
                  </p>
                </div>
              </a>
            </div>
            <div className="framer-15bw1kw-container" style={{ opacity: "1" }}>
              <a className="framer-c6z8u framer-GxmSJ framer-3x0ad0 framer-v-3x0ad0 framer-17jup9s" data-framer-name="Inverse" data-highlight="true" href="#home-about" tabIndex={0} style={{ width: "100%", opacity: "1" }}>
                <div className="framer-n2tvl0" data-framer-name="Vector" style={{ backgroundColor: "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))", transform: "scale(0)", opacity: "1" }} />
                <div className="framer-1cz5rc9" data-framer-component-type="RichTextContainer" style={{ ["--extracted-r6o4lv"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                  <p className="framer-text framer-styles-preset-1s378tr" data-styles-preset="QivRp3Nud" dir="auto" style={{ ["--framer-text-color"]: "var(--extracted-r6o4lv, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))" }}>
                    About
                  </p>
                </div>
              </a>
            </div>
            <div className="framer-169mvim-container" style={{ opacity: "1" }}>
              <a className="framer-c6z8u framer-GxmSJ framer-3x0ad0 framer-v-3x0ad0 framer-17jup9s" data-framer-name="Inverse" data-highlight="true" href="#home-contact" tabIndex={0} style={{ width: "100%", opacity: "1" }}>
                <div className="framer-n2tvl0" data-framer-name="Vector" style={{ backgroundColor: "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))", transform: "scale(0)", opacity: "1" }} />
                <div className="framer-1cz5rc9" data-framer-component-type="RichTextContainer" style={{ ["--extracted-r6o4lv"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                  <p className="framer-text framer-styles-preset-1s378tr" data-styles-preset="QivRp3Nud" dir="auto" style={{ ["--framer-text-color"]: "var(--extracted-r6o4lv, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))" }}>
                    Contact
                  </p>
                </div>
              </a>
            </div>
            <div className="framer-29v6qa-container" style={{ opacity: "1" }}>
              <a className="framer-c6z8u framer-GxmSJ framer-3x0ad0 framer-v-3x0ad0 framer-17jup9s" data-framer-name="Inverse" data-highlight="true" href="#home-blog" tabIndex={0} style={{ width: "100%", opacity: "1" }}>
                <div className="framer-n2tvl0" data-framer-name="Vector" style={{ backgroundColor: "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))", transform: "scale(0)", opacity: "1" }} />
                <div className="framer-1cz5rc9" data-framer-component-type="RichTextContainer" style={{ ["--extracted-r6o4lv"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                  <p className="framer-text framer-styles-preset-1s378tr" data-styles-preset="QivRp3Nud" dir="auto" style={{ ["--framer-text-color"]: "var(--extracted-r6o4lv, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))" }}>
                    Blog
                  </p>
                </div>
              </a>
            </div>
          </nav>
          <div className="framer-ig1dpd" data-framer-name="Grid" style={{ opacity: "1" }}>
            <div className="framer-1bg18zu" style={{ opacity: "1" }}>
              <div data-framer-background-image-wrapper="true" style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", inset: "0px" }}>
                <img decoding="auto" width={1000} height={1200} sizes="60px" src={assets.founderPortrait} alt={assets.founderAlt} style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center center", objectFit: "cover" }} />
              </div>
            </div>
            <div className="framer-13jhmkd" data-framer-name="Grid" style={{ opacity: "1" }}>
              <div className="framer-3cqjcs" data-framer-name="Grid" style={{ opacity: "1" }}>
                <div className="framer-1g2yfhh" data-framer-name="Vector" style={{ backgroundColor: "var(--token-dca875b7-f855-43c1-bf73-97596e452266, rgb(255, 96, 68))", opacity: "1" }} />
                <div className="framer-8jslbc" data-framer-component-type="RichTextContainer" style={{ ["--extracted-1w1cjl5"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                  <h6 className="framer-text framer-styles-preset-1tde6wz" data-styles-preset="i6r0kI2sg" dir="auto" style={{ ["--framer-text-color"]: "var(--extracted-1w1cjl5, var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255)))" }}>{menu.profileName}</h6>
                </div>
              </div>
              <div className="framer-1llhkxt" data-framer-name="Text" data-framer-component-type="RichTextContainer" style={{ ["--extracted-r6o4lv"]: "var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6))", ["--framer-paragraph-spacing"]: "0px", transform: "none", opacity: "1" }}>
                <p className="framer-text framer-styles-preset-1t53lfp" data-styles-preset="izEPYCVCb" dir="auto" style={{ ["--framer-text-color"]: "var(--extracted-r6o4lv, var(--token-e78e0574-70cc-443d-9ed0-67f0605f5e88, rgba(255, 255, 255, 0.6)))" }}>{menu.profileRole}</p>
              </div>
            </div>
            <div className="framer-159hxm7" data-framer-name="Socials" style={{ opacity: "1" }}>
              <div className="framer-1gur1lo-container" style={{ opacity: "1" }}>
                <a className="framer-b3pjF framer-1qoopbm framer-v-1asdoeb framer-13mbuk0" data-framer-name="Inverse" href="https://www.vigoroussoftech.com/" target="_blank" rel="noopener" style={{ opacity: "1" }}>
                  <svg className="framer-QYJ03 framer-17shpqd" role="presentation" viewBox="0 0 24 24" style={{ ["--1m6trwb"]: "0", ["--21h8s6"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--pgex8v"]: "1.5", transform: "none", opacity: "1" }}>
                    <use href="#1403532491" />
                  </svg>
                </a>
              </div>
              <div className="framer-iwbg4x-container" style={{ opacity: "1" }}>
                <a className="framer-b3pjF framer-1qoopbm framer-v-1asdoeb framer-13mbuk0" data-framer-name="Inverse" href="https://www.vigoroussoftech.com/" target="_blank" rel="noopener" style={{ opacity: "1" }}>
                  <svg className="framer-QMsyA framer-17shpqd" role="presentation" viewBox="0 0 24 24" style={{ ["--1m6trwb"]: "0", ["--21h8s6"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--pgex8v"]: "1.5", transform: "none", opacity: "1" }}>
                    <use href="#1688045918" />
                  </svg>
                </a>
              </div>
              <div className="framer-k0zbmq-container" style={{ opacity: "1" }}>
                <a className="framer-b3pjF framer-1qoopbm framer-v-1asdoeb framer-13mbuk0" data-framer-name="Inverse" href="https://www.vigoroussoftech.com/" target="_blank" rel="noopener" style={{ opacity: "1" }}>
                  <svg className="framer-wRKLY framer-17shpqd" role="presentation" viewBox="0 0 24 24" style={{ ["--1m6trwb"]: "0", ["--21h8s6"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--pgex8v"]: "1.5", transform: "none", opacity: "1" }}>
                    <use href="#284710571" />
                  </svg>
                </a>
              </div>
              <div className="framer-tupl0z-container" style={{ opacity: "1" }}>
                <a className="framer-b3pjF framer-1qoopbm framer-v-1asdoeb framer-13mbuk0" data-framer-name="Inverse" href="https://www.vigoroussoftech.com/" target="_blank" rel="noopener" style={{ opacity: "1" }}>
                  <svg className="framer-SHCqu framer-17shpqd" role="presentation" viewBox="0 0 24 24" style={{ ["--1m6trwb"]: "0", ["--21h8s6"]: "var(--token-681ab5da-b380-493f-a46b-a44cff4aee36, rgb(255, 255, 255))", ["--pgex8v"]: "1.5", transform: "none", opacity: "1" }}>
                    <use href="#942143898" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="framer-cadcse" data-framer-name="Model" style={{ opacity: "1" }}>
          <div className="framer-1y3qsf9" style={{ opacity: "1" }}>
            <div className="framer-1137f1h" style={{ opacity: "1" }}>
              <div className="framer-v9ppym-container" style={{ opacity: "1" }}>
                <a className="framer-mMmZv framer-1pgu075 framer-v-1pgu075 framer-5u9gcs" data-framer-name="Desktop" data-highlight="true" href="#home-industries" tabIndex={0} style={{ height: "100%", width: "100%", opacity: "1" }}>
                  <div className="framer-8wq3jr" data-framer-name="Logo" style={{ width: "auto", aspectRatio: "3.10938 / 1", transform: "translate(-50%, -50%)", opacity: "1" }}>
                    <div data-framer-background-image-wrapper="true" style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", inset: "0px" }}>
                      <img decoding="auto" width={199} height={64} src="/images/hero/LOGOWHITE.png" className="cx-brand-logo" alt="Vigorous Softech" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center center", objectFit: "contain" }} />
                    </div>
                  </div>
                  <div className="framer-1ogh48m" data-framer-name="Noise" style={{ opacity: "0.15" }}>
                    <div data-framer-background-image-wrapper="true" style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", inset: "0px", backgroundImage: "url(\"https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256\")", backgroundRepeat: "repeat", backgroundPosition: "left top", border: "0px", backgroundSize: "128px" }} />
                  </div>
                  <div className="framer-h6sw14" data-framer-name="Overlay" style={{ backgroundColor: "var(--token-ca70edcc-ee1a-4b86-955f-a574c868e7a5, rgba(0, 0, 0, 0.2))", opacity: "1" }} />
                  <div className="framer-12874x6" data-framer-name="Image" style={{ transform: "none", opacity: "1" }}>
                    <div data-framer-background-image-wrapper="true" style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", inset: "0px" }}>
                      <img decoding="auto" width={2560} height={1440} sizes="400px" src="/client/industry-wide-bfsi.jpg" alt="Hero Image" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center center", objectFit: "cover" }} />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="framer-ilo9ey" style={{ opacity: "1" }}>
            <div className="framer-ssth7t" style={{ opacity: "1" }}>
              <div className="framer-1h96was-container" style={{ opacity: "1" }}>
                <a className="framer-mMmZv framer-1pgu075 framer-v-1pgu075 framer-5u9gcs" data-framer-name="Desktop" data-highlight="true" href="#home-industries" tabIndex={0} style={{ height: "100%", width: "100%", opacity: "1" }}>
                  <div className="framer-8wq3jr" data-framer-name="Logo" style={{ width: "auto", aspectRatio: "4.10938 / 1", transform: "translate(-50%, -50%)", opacity: "1" }}>
                    <div data-framer-background-image-wrapper="true" style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", inset: "0px" }}>
                      <img decoding="auto" width={263} height={64} src="/images/hero/LOGOWHITE.png" className="cx-brand-logo" alt="Vigorous Softech" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center center", objectFit: "contain" }} />
                    </div>
                  </div>
                  <div className="framer-1ogh48m" data-framer-name="Noise" style={{ opacity: "0.15" }}>
                    <div data-framer-background-image-wrapper="true" style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", inset: "0px", backgroundImage: "url(\"https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256\")", backgroundRepeat: "repeat", backgroundPosition: "left top", border: "0px", backgroundSize: "128px" }} />
                  </div>
                  <div className="framer-h6sw14" data-framer-name="Overlay" style={{ backgroundColor: "var(--token-ca70edcc-ee1a-4b86-955f-a574c868e7a5, rgba(0, 0, 0, 0.2))", opacity: "1" }} />
                  <div className="framer-12874x6" data-framer-name="Image" style={{ transform: "none", opacity: "1" }}>
                    <div data-framer-background-image-wrapper="true" style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", inset: "0px" }}>
                      <img decoding="auto" width={2560} height={1440} sizes="400px" src="/client/industry-wide-mfg.jpg" alt="Hero Image" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center center", objectFit: "cover" }} />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
