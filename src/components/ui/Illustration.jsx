export function ReceiptIllustration({ className = 'w-24 h-24' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M25 15C25 12.2386 27.2386 10 30 10H70C72.7614 10 75 12.2386 75 15V88L66.5 82L58.5 88L50 82L41.5 88L33.5 82L25 88V15Z"
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line
        x1="35"
        y1="24"
        x2="65"
        y2="24"
        stroke="var(--border)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="34"
        x2="55"
        y2="34"
        stroke="var(--muted-foreground)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="44"
        x2="65"
        y2="44"
        stroke="var(--muted-foreground)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <circle cx="40" cy="58" r="5" fill="var(--primary)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="60" cy="58" r="5" fill="var(--secondary)" stroke="var(--border)" strokeWidth="2" />
      <line
        x1="35"
        y1="72"
        x2="65"
        y2="72"
        stroke="var(--border)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function CoinsIllustration({ className = 'w-24 h-24' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse
        cx="50"
        cy="70"
        rx="28"
        ry="14"
        fill="var(--primary)"
        stroke="var(--border)"
        strokeWidth="3"
      />
      <path
        d="M22 55C22 62.7 34.5 69 50 69C65.5 69 78 62.7 78 55V70C78 77.7 65.5 84 50 84C34.5 84 22 77.7 22 70V55Z"
        fill="var(--primary)"
        stroke="var(--border)"
        strokeWidth="3"
      />
      <ellipse
        cx="50"
        cy="45"
        rx="28"
        ry="14"
        fill="var(--primary)"
        stroke="var(--border)"
        strokeWidth="3"
      />
      <ellipse
        cx="50"
        cy="28"
        rx="28"
        ry="14"
        fill="var(--primary)"
        stroke="var(--border)"
        strokeWidth="3"
      />
      <circle cx="50" cy="28" r="6" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
    </svg>
  )
}

export function FriendsIllustration({ className = 'w-24 h-24' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="35" cy="40" r="16" fill="#FFB4A2" stroke="var(--border)" strokeWidth="3" />
      <path
        d="M15 80C15 65 24 58 35 58C46 58 55 65 55 80"
        fill="var(--secondary)"
        stroke="var(--border)"
        strokeWidth="3"
      />
      <circle cx="65" cy="42" r="16" fill="#A0C4FF" stroke="var(--border)" strokeWidth="3" />
      <path
        d="M47 80C47 67 55 60 65 60C75 60 83 67 83 80"
        fill="var(--primary)"
        stroke="var(--border)"
        strokeWidth="3"
      />
    </svg>
  )
}
