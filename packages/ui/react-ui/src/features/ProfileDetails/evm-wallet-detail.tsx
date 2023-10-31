import { UserCircle2 } from "lucide-react";
import { useAccount } from "wagmi";
import { cn } from "../../shared/lib/styles";
import { Button } from "../../shared/ui/button";
import type { WalletName } from "../../shared/ui/icons/WalletIcon";
import { WalletIcon } from "../../shared/ui/icons/WalletIcon";

export function EvmWalletDetail({
  switchWallet,
  className,
}: {
  switchWallet?: () => void | Promise<void>;
  className?: string;
}) {
  const { connector, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div
        className={cn("bsa-flex bsa-items-center bsa-px-5 bsa-py-3", className)}
      >
        <UserCircle2 className="bsa-mr-3 bsa-h-8 bsa-w-8" />{" "}
        <div className="bsa-text-lg">Not Connected</div>
      </div>
    );
  }

  const walletName = (connector?.name.toLowerCase() || "") as WalletName;

  return (
    <div className="bsa-flex bsa-w-full bsa-items-center">
      <div className="bsa-flex bsa-flex-grow bsa-items-center">
        <span className="bsa-text-sm">Connected with {connector?.name}</span>
        <WalletIcon
          walletName={walletName}
          className="bsa-ml-2 bsa-max-h-[1.25rem] bsa-px-[0.125rem] bsa-py-[0.15625rem]"
        />
      </div>
      <Button
        variant="outline"
        onClick={switchWallet}
        className="bsa-text-sm"
        size="sm"
      >
        Change wallet
      </Button>
    </div>
  );
}