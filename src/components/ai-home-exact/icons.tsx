import type { CSSProperties } from "react"

export function PlayVideoIcon() {
  return (
    <div className="play_video_icon w-embed">
      <svg width="11" height="11" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.50002 0.166687C3.28352 0.166687 0.666687 2.78352 0.666687 6.00002C0.666687 9.21652 3.28352 11.8334 6.50002 11.8334C9.71652 11.8334 12.3334 9.21652 12.3334 6.00002C12.3334 2.78352 9.71652 0.166687 6.50002 0.166687ZM6.50002 10.6667C3.92694 10.6667 1.83335 8.5731 1.83335 6.00002C1.83335 3.42694 3.92694 1.33335 6.50002 1.33335C9.0731 1.33335 11.1667 3.42694 11.1667 6.00002C11.1667 8.5731 9.0731 10.6667 6.50002 10.6667Z"
          fill="#181818"
        />
        <path
          d="M6.50002 0.166687C3.28352 0.166687 0.666687 2.78352 0.666687 6.00002C0.666687 9.21652 3.28352 11.8334 6.50002 11.8334C9.71652 11.8334 12.3334 9.21652 12.3334 6.00002C12.3334 2.78352 9.71652 0.166687 6.50002 0.166687ZM6.50002 10.6667C3.92694 10.6667 1.83335 8.5731 1.83335 6.00002C1.83335 3.42694 3.92694 1.33335 6.50002 1.33335C9.0731 1.33335 11.1667 3.42694 11.1667 6.00002C11.1667 8.5731 9.0731 10.6667 6.50002 10.6667Z"
          fill="black"
          fillOpacity="0.2"
        />
        <path d="M4.75002 8.91669L9.41669 6.00002L4.75002 3.08335V8.91669Z" fill="#181818" />
        <path d="M4.75002 8.91669L9.41669 6.00002L4.75002 3.08335V8.91669Z" fill="black" fillOpacity="0.2" />
      </svg>
    </div>
  )
}

export function CardArrowIcon() {
  return (
    <div className="products-card-head-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 11 9" fill="none" className="products-card-head-icon-svg">
        <path
          d="M10.6343 4.5L6.13428 9L5.01904 7.88477L7.61572 5.28809H0.45166L0.45166 3.71191L7.61572 3.71191L5.01904 1.11523L6.13428 0L10.6343 4.5Z"
          fill="currentColor"
        />
      </svg>
    </div>
  )
}

export function ButtonDotBlock() {
  return (
    <div className="btn_dot-block">
      <div className="btn-dot-wrapper">
        <div className="btn-dot" />
      </div>
      <div className="btn_dot-line-wrapper">
        <div className="btn_dot-line" />
      </div>
    </div>
  )
}

export function SliderArrowIcon({ next }: { next?: boolean }) {
  return (
    <div className="w-embed">
      <svg width="100%" height="100%" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        {next ? (
          <path
            d="M19.1433 25.9913C19.5278 26.3511 20.1254 26.3511 20.5099 25.9913L25.7642 21.0742C26.1865 20.679 26.1865 20.009 25.7642 19.6139L20.5099 14.6967C20.1254 14.3369 19.5278 14.3369 19.1433 14.6967L18.9423 14.8847C18.52 15.2799 18.52 15.9499 18.9423 16.345L22.4353 19.6139C22.8576 20.009 22.8576 20.679 22.4353 21.0742L18.9423 24.343C18.52 24.7382 18.52 25.4081 18.9423 25.8033L19.1433 25.9913Z"
            fill="currentColor"
          />
        ) : (
          <path
            d="M22.7688 16.0969C22.3843 15.7371 21.7867 15.7371 21.4022 16.0969L16.1479 21.0141C15.7256 21.4093 15.7256 22.0792 16.1479 22.4744L21.4022 27.3916C21.7867 27.7514 22.3843 27.7514 22.7688 27.3916L22.9698 27.2035C23.3921 26.8083 23.3921 26.1384 22.9698 25.7432L19.4768 22.4744C19.0545 22.0792 19.0545 21.4093 19.4768 21.0141L22.9698 17.7453C23.3921 17.3501 23.3921 16.6802 22.9698 16.285L22.7688 16.0969Z"
            fill="currentColor"
          />
        )}
      </svg>
    </div>
  )
}

export function RoundArrowBtn({ style }: { style?: CSSProperties }) {
  return (
    <div className="round-arrow-btn rotate-45deg align-right" style={style}>
      <img
        src="https://cdn.prod.website-files.com/6717a0dfaf71071a80dfce8b/6a05f1194d8f8de6627db138_Union%20Arrow%20Icon.svg"
        loading="lazy"
        alt=""
      />
    </div>
  )
}
