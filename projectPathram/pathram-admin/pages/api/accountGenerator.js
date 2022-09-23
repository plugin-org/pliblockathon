import { firebaseAdmin } from "../../firebase-admin";
export default async function accountGenerator(req, res) {
  try {
    const x_api_key = "06b9533e-0862-4dec-b1f4-6c595949793f";

    // Step1: Generate XDC wallet
    // Will get mnemonic and xpub
    const generatedWalletResponse = await fetch(
      `https://api-eu1.tatum.io/v3/xdc/wallet`,
      {
        method: "GET",
        headers: {
          "x-api-key": x_api_key,
        },
      }
    );

    const generatedWallet = await generatedWalletResponse.json();
    // console.log(generatedWallet);

    // STEP2: Generate XDC account address from Extended public key
    // Will get XDC Account Public Address
    const xpub = generatedWallet.xpub;
    const index = 0;
    const XDCPublicAddressResponse = await fetch(
      `https://api-eu1.tatum.io/v3/xdc/address/${xpub}/${index}`,
      {
        method: "GET",
        headers: {
          "x-api-key": x_api_key,
        },
      }
    );
    const XDCPublicAddress = await XDCPublicAddressResponse.json();
    // console.log(XDCPublicAddress);

    // STEP3: Generate XDC private key
    // Will get XDC Private Key
    const XDCPrivateKeyResponse = await fetch(
      `https://api-eu1.tatum.io/v3/xdc/wallet/priv`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": x_api_key,
        },
        body: JSON.stringify({
          index: 0,
          mnemonic: generatedWallet.mnemonic,
        }),
      }
    );

    const XDCPrivateKey = await XDCPrivateKeyResponse.json();
    // console.log(XDCPrivateKey);

    const public_address = XDCPublicAddress.address;
    const private_key = XDCPrivateKey.key;

    console.log(public_address);
    console.log(private_key);
    res
      .status(200)
      .json({
        message: "Keys generated successfully",
        public: public_address.replace('xdc', '0x'),
        secret: private_key,
      });

	
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
