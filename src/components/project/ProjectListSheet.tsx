"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { IList } from "@/components/common/window/searchFrom/SearchType";
import { usePostViewStore } from "@/components/profile/store/usePostViewStore";

import styles from "@/components/project/ProjectListSheet.module.scss";

const ProjectListSheet = () => {
  const [projects, setProjects] = useState<IList[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { viewed } = usePostViewStore();

  useEffect(() => {
    fetch("https://developed-heath-mr-chu.koyeb.app/api/notion/projectList")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.project ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h2 className={styles.title}>Projects</h2>
        <p className={styles.subtitle}>
          {loading ? "" : `${projects.length}개 프로젝트`}
        </p>
      </div>

      {loading ? (
        <div className={styles.loading}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <ul className={styles.list}>
          {projects.map((p) => (
            <li
              key={p.id}
              className={styles.item}
              onClick={() => router.push(`/project/${p.id}`)}
            >
              <div
                className={`${styles.coinSlot} ${viewed[p.id] ? styles.earned : ""}`}
              >
                <img
                  src="/assets/icons/coin.svg"
                  alt="coin"
                  className={styles.coinImg}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{p.projectName}</div>
                <div className={styles.company}>{p.company}</div>
              </div>
              <ChevronRight size={18} className={styles.chevron} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectListSheet;
