import ModalLayout from "@/components/common/page/layout/ModalLayout";

const Layout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
        <ModalLayout text="Unity">
          {children}
        </ModalLayout>
    );
  }

export default Layout;