import styles from "@/components/profile/layout/SceneBadge.module.scss";

export type SceneBadgeProps = {
  /** 현재 씬 이름. */
  label: string;
  /** 씬을 나타내는 색. 주면 라벨 앞에 작은 사각 표식이 붙는다. */
  accent?: string;
};

/**
 * 헤더에서 현재 씬을 알려주는 표식.
 *
 * 헤더의 다른 요소는 전부 둥근 알약 꼴이라, 여기만 각진 사각형으로 둬서
 * 조작 버튼이 아니라 상태 표시라는 게 형태로 구분되게 했다.
 */
export const SceneBadge = ({ label, accent }: SceneBadgeProps) => {
  return (
    <span
      className={styles.badge}
      style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}
    >
      {accent && <span className={styles.dot} />}
      {label}
    </span>
  );
};

export default SceneBadge;
