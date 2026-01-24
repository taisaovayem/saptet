export function Bookmark() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4 p-4">
        <a href="https://facebook.com" title="Facebook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
            />
          </svg>
        </a>
        <a href="https://youtube.com" title="Youtube">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <mask id="SVGsyA92bmM">
              <g
                fill="none"
                fillOpacity="0"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path
                  fill="#fff"
                  strokeDasharray="64"
                  strokeDashoffset="64"
                  d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="0.6s"
                    dur="0.5s"
                    values="0;1"
                  />
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.6s"
                    values="64;0"
                  />
                </path>
                <path fill="#000" stroke="none" d="M12 11L12 12L12 13z">
                  <animate
                    fill="freeze"
                    attributeName="d"
                    begin="1.1s"
                    dur="0.2s"
                    values="M12 11L12 12L12 13z;M10 8.5L16 12L10 15.5z"
                  />
                  <set
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="1.1s"
                    to="1"
                  />
                </path>
              </g>
            </mask>
            <rect
              width="24"
              height="24"
              fill="currentColor"
              mask="url(#SVGsyA92bmM)"
            />
          </svg>
        </a>
        <a href="https://chatgpt.com" title="Chat GPT">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              d="M18.38 27.94v-14.4l11.19-6.46c6.2-3.58 17.3 5.25 12.64 13.33"
              strokeWidth="1"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              d="m18.38 20.94l12.47-7.2l11.19 6.46c6.2 3.58 4.1 17.61-5.23 17.61"
              strokeWidth="1"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              d="m24.44 17.44l12.47 7.2v12.93c0 7.16-13.2 12.36-17.86 4.28"
              strokeWidth="1"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              d="M30.5 21.2v14.14L19.31 41.8c-6.2 3.58-17.3-5.25-12.64-13.33"
              strokeWidth="1"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              d="m30.5 27.94l-12.47 7.2l-11.19-6.46c-6.21-3.59-4.11-17.61 5.22-17.61"
              strokeWidth="1"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              d="m24.44 31.44l-12.47-7.2V11.31c0-7.16 13.2-12.36 17.86-4.28"
              strokeWidth="1"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
