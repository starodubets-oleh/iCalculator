import React, { ButtonHTMLAttributes, ReactElement } from 'react';

import classNames from 'classnames';

import styles from './styles.module.scss';

type TColor = 'grey' | 'orange' | 'light';

export interface IBaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TColor;
  selected?: boolean;
}

const colorsClassesMap: Record<NonNullable<IBaseButtonProps['color']>, string> = {
  grey: styles.grey,
  orange: styles.orange,
  light: styles.light,
}

const BaseButton = ({ children, className, selected, color = 'grey', ...rest }: IBaseButtonProps): ReactElement => (
  <button
    className={classNames(
      styles.button,
      colorsClassesMap[color],
      { [styles.selected]: selected },
      className
    )}
    {...rest}
  >
    {children}
  </button>
)

export default BaseButton;