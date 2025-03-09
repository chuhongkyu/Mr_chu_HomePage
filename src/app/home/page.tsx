
import CommonLayout from "@/components/common/CommonLayout";
import RQProvider from "@/components/common/RQProvider";
import AppWrapper from "@/components/common/window/app/AppWrapper";
import FormContainer from "@/components/common/window/from/FormContainer";

export default function Home() {
  return (
    <CommonLayout>
      <RQProvider>
        <FormContainer/>
        <AppWrapper/>
      </RQProvider>
    </CommonLayout>
  );
}