
import RQProvider from "@/components/common/RQProvider";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppWrapperClientLoader from "@/components/common/window/app/AppWrapperClientLoadet";
// import AppWrapper from "@/components/common/window/app/AppWrapper";

const IndexPage = () => {
  return(
    <RQProvider>
      {/* <FormContainer/> */}
      <AppProvider>
        <AppWrapperClientLoader/>
      </AppProvider>
    </RQProvider>
    )
}

export default IndexPage;