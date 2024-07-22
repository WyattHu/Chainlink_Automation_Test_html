import { ethers } from "./ethers.js";
import { contractAddress, abi } from "./constant.js";
const btn_connect = document.getElementById("btn_connect");
const btn_setnum = document.getElementById("btn_setnum");
const btn_getnum = document.getElementById("btn_getnum");
const btn_getowner = document.getElementById("btn_getowner");

btn_connect.onclick = connect;
btn_setnum.onclick = setnum;
btn_getnum.onclick = getnum;
btn_getowner.onclick = getowner;

async function connect() {
  if (typeof window.ethereum != "undefined") {
    console.log("Connecting to metamask...");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Connected");
  } else {
    console.log("No metamask!!!");
  }
}
async function setnum() {
  if (typeof window.ethereum != "undefined") {
    console.log("Setting...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transActionResponse = await contract.setNum(0);
    await listenForTransactionMine(transActionResponse, provider);
    console.log("SetNum Finished");
  } else {
    console.log("No metamask!!!");
  }
}
async function getnum() {
  if (typeof window.ethereum != "undefined") {
    console.log("Getting number...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transActionResponse = await contract.getCurrentNumber();
    // await listenForTransactionMine(transActionResponse, provider);
    console.log(transActionResponse)
    console.log("Get number Finished");
  } else {
    console.log("No metamask!!!");
  }
}

async function getowner() {
  if (typeof window.ethereum != "undefined") {
    console.log("Getting owneradderss...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const transActionResponse = await contract.getOwner();
    // await listenForTransactionMine(transActionResponse, provider);
    console.log(transActionResponse)

    console.log("Get owner Finished");
  } else {
    console.log("No metamask!!!");
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
