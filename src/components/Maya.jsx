export default function Maya({ name = 'מאיה' }) {
  return (
    <div className="maya-wrap">
      <svg viewBox="0 0 120 120" width="104" height="104" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="#cfe6d4" />
        <path d="M22 118c2-24 18-36 38-36s36 12 38 36z" fill="#2f6e4b" />
        <path d="M50 78h20v10c0 5-4 8-10 8s-10-3-10-8z" fill="#e8b48f" />
        <path d="M28 58c0-22 14-36 32-36s32 14 32 36c0 14-3 26-8 32H36c-5-6-8-18-8-32z" fill="#4a2e22" />
        <ellipse cx="60" cy="58" rx="22" ry="25" fill="#f3c9a8" />
        <path d="M37 52c4-14 13-20 25-20 10 0 18 6 21 16-10-2-20-6-26-12-4 8-11 13-20 16z" fill="#4a2e22" />
        <ellipse cx="51" cy="60" rx="2.8" ry="3.4" fill="#2b1d17" />
        <ellipse cx="69" cy="60" rx="2.8" ry="3.4" fill="#2b1d17" />
        <circle cx="46" cy="68" r="4" fill="#f0a98f" opacity=".55" />
        <circle cx="74" cy="68" r="4" fill="#f0a98f" opacity=".55" />
        <path d="M53 71q7 6 14 0" fill="none" stroke="#8a4d3a" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <em>{name}</em>
    </div>
  )
}
