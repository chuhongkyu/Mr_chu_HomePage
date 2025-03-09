
import CommonLayout from "@/components/common/CommonLayout";
import RQProvider from "@/components/common/RQProvider";
import FormContainer from "@/components/common/window/from/FormContainer";

export default function Home() {
  return (
    <CommonLayout>
      <RQProvider>
        <FormContainer/>
      </RQProvider>
    </CommonLayout>
  );
}