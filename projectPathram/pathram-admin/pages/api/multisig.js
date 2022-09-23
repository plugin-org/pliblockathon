const fs = require("fs");

export default async function multisig(req, res) {
  const signers = req.body.signers;
  const eventTypeName = req.body.eventTypeName;
  try {
    var result;

    var fs = require("fs");
    fs.readFile(
      "hardhat-multisig-new/contracts/template.js",
      "utf8",
      function (err, data) {
        if (err) {
          return console.log(err);
        }

        result = data.replace("ARGS_OWNERS", JSON.stringify(signers));
        result = result.replace("EVENT_TYPE_NAME", `"${eventTypeName}"`);

        console.log(JSON.stringify(signers));
        console.log(signers);

        fs.writeFileSync(
          "hardhat-multisig-new/deploy/01-deploy-fund-me.js",
          result,
          "utf8",
          function (err) {
            if (err) return console.log(err);
          }
        );
      }
    );

    const execSync = require("child_process").execSync;
    // import { execSync } from 'child_process';  // replace ^ if using ES modules

    const output = execSync("cd hardhat-multisig-new && yarn hardhat deploy", {
      encoding: "utf-8",
    }); // the default is 'buffer'
    console.log("Output was:\n", output);
    let new_output = output.toString();
    // console.log(new_output);
    // console.log(typeof new_output);
    let multisigAddress = new_output.match(/(\b0x[a-fA-F0-9]{40}\b)/g);
    // console.log(new_output.match(/(\b0x[a-fA-F0-9]{40}\b)/g))

    if (multisigAddress.length) {
      res.status(200).json({
        msg: "Multisig wallet deployed successfully",
        data: multisigAddress.pop(),
      });
    } else {
      res
        .status(400)
        .json({ msg: "Multisig deployment failes. Please try again later." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
