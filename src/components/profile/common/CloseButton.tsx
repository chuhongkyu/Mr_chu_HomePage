import IconCloseRegular from "@seed-design/react-icon/lib/IconCloseRegular";

import styles from "@/components/profile/common/CloseButton.module.scss";

/** 원 지름에 맞춘 아이콘 크기. */
const ICON_SIZE = { sm: 14, md: 18 } as const;

export type CloseButtonProps = {
  onClick: () => void;
  /**
   * 무엇을 닫는지. 화면 낭독기가 읽는다.
   * 버튼 안에 글자가 없어서 이게 없으면 "버튼" 으로만 읽힌다.
   */
  label?: string;
  /** sm 24px — 카드 머리에. md 32px — 시트처럼 넓은 면에. */
  size?: keyof typeof ICON_SIZE;
  /** 자리를 잡는 쪽에서 위치를 얹을 때 쓴다. */
  className?: string;
};

/**
 * 닫기 버튼.
 *
 * 시트와 핫스팟 카드가 같은 걸 쓴다. 전에는 시트가 배경 없는 아이콘을,
 * 카드가 채운 원 안의 `×` 글자를 따로 그렸다. 같은 동작인데 생김새가
 * 달랐고, `×` 는 폰트마다 굵기와 중심이 달라 원 안에서 미묘하게 치우쳤다.
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
