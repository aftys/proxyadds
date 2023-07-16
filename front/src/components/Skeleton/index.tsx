import React from 'react';
import { useStateContext } from '../../contexts';

interface SkeletonProps {
  count?: number;
  wrapper?: React.ElementType;
  className?: string;
  containerClassName?: string;
  containerTestId?: string;
  circle?: boolean;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  direction?: 'ltr' | 'rtl';
  duration?: number;
  enableAnimation?: boolean;
  inline?: boolean;
  baseColor?: string;
  highlightColor?: string;
}

const SkeletonThemeContext = React.createContext({});

const defaultEnableAnimation = true;

function styleOptionsToCssProperties({
  width,
  height,
  borderRadius,
  circle,
  direction,
  duration,
  enableAnimation = defaultEnableAnimation,
  baseColor,
  highlightColor,
}: SkeletonProps) {
  const { darkMode } = useStateContext();
  const defaultBaseColor = darkMode ? 'rgb(27, 38, 61)' : '#e5e7eb';
  const defaultHighlightColor = darkMode ? 'rgb(36, 51, 82)' : '#fff';
  const style: React.CSSProperties = {};

  if (direction === 'rtl') style['--animation-direction'] = 'reverse';
  if (typeof duration === 'number') style['--animation-duration'] = `${duration}s`;
  if (!enableAnimation) style['--pseudo-element-display'] = 'none';
  if (typeof width === 'string' || typeof width === 'number') style.width = width;
  if (typeof height === 'string' || typeof height === 'number') style.height = height;
  if (typeof borderRadius === 'string' || typeof borderRadius === 'number') style.borderRadius = borderRadius;
  if (circle) style.borderRadius = '50%';
  if (typeof baseColor !== 'undefined') style['--base-color'] = baseColor;
  else style['--base-color'] = defaultBaseColor;
  if (typeof highlightColor !== 'undefined') style['--highlight-color'] = highlightColor;
  else style['--highlight-color'] = defaultHighlightColor;

  return style;
}

export default function Skeleton({
  count = 1,
  wrapper: Wrapper,
  className: customClassName,
  containerClassName,
  containerTestId,
  circle = false,
  style: styleProp,
  ...originalPropsStyleOptions
}: SkeletonProps) {
  const contextStyleOptions = React.useContext(SkeletonThemeContext);
  const propsStyleOptions = { ...originalPropsStyleOptions };

  for (const [key, value] of Object.entries(originalPropsStyleOptions)) {
    if (typeof value === 'undefined') {
      delete propsStyleOptions[key];
    }
  }

  const styleOptions: SkeletonProps = {
    ...contextStyleOptions,
    ...propsStyleOptions,
    circle,
  };

  const style: React.CSSProperties = {
    ...styleProp,
    ...styleOptionsToCssProperties(styleOptions),
  };

  let className = 'react-loading-skeleton border-[1px] shadow-sm border-gray-300 dark:bg-dark-bg-second dark:border-gray-700';

  if (customClassName) className += ` ${customClassName}`;

  const inline = styleOptions.inline ?? false;

  const elements: React.ReactNode[] = [];
  const countCeil = Math.ceil(count);

  for (let i = 0; i < countCeil; i++) {
    let thisStyle = style;

    if (countCeil > count && i === countCeil - 1) {
      const width = thisStyle.width ?? '100%';
      const fractionalPart = count % 1;
      const fractionalWidth =
        typeof width === 'number'
          ? width * fractionalPart
          : `calc(${width} * ${fractionalPart})`;
      thisStyle = { ...thisStyle, width: fractionalWidth };
    }

    const skeletonSpan = (
      <span className={className} style={thisStyle} key={i}>
        &zwnj;
      </span>
    );

    if (inline) {
      elements.push(skeletonSpan);
    } else {
      elements.push(
        <React.Fragment key={i}>
          {skeletonSpan}
          <br />
        </React.Fragment>
      );
    }
  }

  return (
    <span
      className={containerClassName}
      data-testid={containerTestId}
      aria-live="polite"
      aria-busy={styleOptions.enableAnimation ?? defaultEnableAnimation}
    >
      {Wrapper
        ? elements.map((el, i) => (
            <Wrapper key={i}>{el}</Wrapper>
          ))
        : elements}
    </span>
  );
}
