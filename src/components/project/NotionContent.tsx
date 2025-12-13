"use client";

import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";

type NotionContentProps = {
  recordMap: ExtendedRecordMap;
};

export default function NotionContent({ recordMap }: NotionContentProps) {
  return <NotionRenderer recordMap={recordMap} fullPage={false} />;
}
