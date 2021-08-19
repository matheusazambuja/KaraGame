import { SVGProps } from 'react';

export function BgHeroGeneric(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="bgHeroGeneric" clip-path="url(#clip0)">
        <g id="Vector 1115" filter="url(#filter0_f)">
          <path d="M864.786 579.029C1172.43 678.427 1509.83 914.764 1625.42 905.864C1832.36 889.929 1693.99 343.179 1441.23 187.824C1204.04 42.0452 -226.467 126.645 189.235 434.324C410.396 598.015 602.963 494.437 864.786 579.029Z" fill="url(#paint0_linear)" fill-opacity="0.4" />
        </g>
      </g>
      <defs>
        <filter id="filter0_f" x="-207" y="-363" width="2269.13" height="1834.81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient id="paint0_linear" x1="379.52" y1="888.186" x2="913.502" y2="-63.11" gradientUnits="userSpaceOnUse">
          <stop offset="0.0001" stop-color="#3082E2" />
          <stop offset="1" stop-color="#4E1919" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0">
          <rect width="1920" height="1080" fill="white" />
        </clipPath>
      </defs>
    </svg>

  );
}