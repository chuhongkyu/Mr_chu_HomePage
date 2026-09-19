import IconCloseRegular from "@seed-design/react-icon/lib/IconCloseRegular";

import styles from "@/components/profile/common/CloseButton.module.scss";

const ICON_SIZE = { sm: 14, md: 18 } as const;

export type CloseButtonProps = {
  onClick: () => void;
  /** 버튼 안에 글자가 없다. 없으면 화면 낭독기가 "버튼" 으로만 읽는다. */
  label?: string;
  size?: keyof typeof ICON_SIZE;
  className?: string;
};

/**
 * 시트와 핫스팟 카드가 함께 쓰는 닫기 버튼.
 *
 * `×` 글자를 쓰지 마라. 폰트마다 굵기와 중심이 달라 원 안에서 치우친다.
 */
export const CloseButton = ({
  onClick,
  label = "닫기",
  size = "md",
  className,
}: CloseButtonProps) => {
  return (
    <button
      type="button"
      className={className ? `${styles.button} ${className}` : styles.button}
      data-size={size}
      onClick={onClick}
      aria-label={label}
    >
      <IconCloseRegular size={ICON_SIZE[size]} />
    </button>
  );
};

export default CloseButton;
