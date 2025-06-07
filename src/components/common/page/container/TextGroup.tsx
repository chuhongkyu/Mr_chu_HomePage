import { WithChildren } from "@/types/global";

const TextGroup = ({children}: WithChildren) => {
  return (
    <div className="text-group">
        {children}
    </div>
  )
}

export default TextGroup;