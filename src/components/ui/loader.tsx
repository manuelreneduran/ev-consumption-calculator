const Loader = ({ size = 40, color = "#000000" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {[...Array(8)].map((_, index) => (
          <rect
            key={index}
            x="18.5"
            y="2"
            width="3"
            height="12"
            rx="1.5"
            fill={color}
            transform={`rotate(${index * 45} 20 20)`}
            opacity={1 - index * 0.1}
          >
            <animate
              attributeName="opacity"
              values="1;0;1"
              dur="1s"
              begin={`${index * 0.125}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
    </svg>
  );
};

export default Loader;
