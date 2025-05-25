import ModalLayout from "@/components/common/page/layout/ModalLayout";

const Layout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
        <ModalLayout text="About">
          {children}
        </ModalLayout>
    );
  }

export default Layout;