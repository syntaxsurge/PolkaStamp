import Image from 'next/image'

import AssetHubLogo from '@/icons/assethub.svg'
import PaseoAssethubLogo from '@/icons/paseo-assethub.svg'
import PaseoLogo from '@/icons/paseo.svg'
import PolkadotLogo from '@/icons/polkadot.svg'

export const logos = {
  polkadot: <Image src={PolkadotLogo} alt='Polkadot' width={24} height={24} />,
  assetHub: <Image src={AssetHubLogo} alt='Asset Hub' width={24} height={24} />,
  paseo: <Image src={PaseoLogo} alt='Paseo' width={24} height={24} />,
  paseoAssethub: <Image src={PaseoAssethubLogo} alt='Paseo Assethub' width={24} height={24} />,
}
