import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Lỗi 403",
  description: "Generated by tuan anh",
};

export default function HeThongLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}