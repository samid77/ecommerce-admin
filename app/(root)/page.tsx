import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center p-10 text-lg font-semibold">
      <div className="p-3 bg-gray-200 rounded-lg">
        Root page, protected route
      </div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default SetupPage
  