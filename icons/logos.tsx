import PolkadotLogo from "@/icons/polkadot.svg";
import AssetHubLogo from "@/icons/assethub.svg";
import PaseoLogo from "@/icons/paseo.svg";
import PaseoAssethubLogo from "@/icons/paseo-assethub.svg";
import Image from "next/image";

export const logos = {
  polkadot: <Image src={PolkadotLogo} alt="Polkadot" width={24} height={24} />,
  assetHub: <Image src={AssetHubLogo} alt="Asset Hub" width={24} height={24} />,
  paseo: <Image src={PaseoLogo} alt="Paseo" width={24} height={24} />,
  paseoAssethub: (
    <Image
      src={PaseoAssethubLogo}
      alt="Paseo Assethub"
      width={24}
      height={24}
    />
  ),
};
