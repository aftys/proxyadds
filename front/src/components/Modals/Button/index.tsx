import React, { FC, MouseEvent } from 'react';

interface ButtonProps {
  icon: React.ReactNode;
  bgColor: string;
  color: string;
  bgHoverColor: string;
  size: string;
  text: string;
  borderRadius: string;
  width: string;
  close: () => void;
}

const Button: FC<ButtonProps> = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  close,
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    close();
  };

  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color, borderRadius }}
      onClick={handleClick}
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
