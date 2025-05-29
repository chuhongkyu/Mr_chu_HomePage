
import RQProvider from "@/components/common/RQProvider";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppWrapperClientLoader from "@/components/common/window/app/AppWrapperClientLoadet";
// import AppWrapper from "@/components/common/window/app/AppWrapper";
import AppWidget from "@/components/common/window/AppWidget";

const IndexPage = () => {
  return(
    <RQProvider>
      {/* <FormContainer/> */}
      <AppProvider>
        <AppWrapperClientLoader/>
      </AppProvider>
      <AppWidget/>
    </RQProvider>
    )
}

export default IndexPage;