
import RQProvider from "@/components/common/RQProvider";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppWrapper from "@/components/common/window/app/AppWrapper";
import AppWidget from "@/components/common/window/AppWidget";

const IndexPage = () => {
  return(
    <RQProvider>
      {/* <FormContainer/> */}
      <AppProvider>
        <AppWrapper/>
      </AppProvider>
      <AppWidget/>
    </RQProvider>
    )
}

export default IndexPage;