// "use dom";
// import React, { useState, useEffect } from "react";
// import { BalanceResponse, convert } from "mainnet-js";
// import { decodeCashAddress } from "@bitauth/libauth";
// import { defineCustomElements } from "@bitjson/qr-code";
// import {
//   CurrencySymbols,
//   CurrencyShortNames,
// } from "../src/interfaces/interfaces";
// import { copyToClipboard } from "../src/utils/utils";
// import { useStore } from "../src/stores/store";
// import { useSettingsStore } from "../src/stores/settingsStore";
// import { useWindowSize } from "../src/hooks/useWindowSize";

// Initialize QR code elements
// defineCustomElements(window);

export default function WalletView() {
  // const store = useStore();
  // const settingsStore = useSettingsStore();
  // const { width } = useWindowSize();
  // // State
  // const [displayBchQr, setDisplayBchQr] = useState(true);
  // const [bchSendAmount, setBchSendAmount] = useState<number | undefined>();
  // const [currencySendAmount, setCurrencySendAmount] = useState<
  //   number | undefined
  // >();
  // const [destinationAddr, setDestinationAddr] = useState("");
  // // Computed values
  // const isMobile = width < 480;
  // const nrTokenCategories = store.tokenList?.length;
  // const numberFormatter = new Intl.NumberFormat("en-US", {
  //   maximumFractionDigits: 8,
  // });
  // const bchDisplayUnit =
  //   store.network === "mainnet"
  //     ? settingsStore.bchUnit === "bch"
  //       ? " BCH"
  //       : " sats"
  //     : settingsStore.bchUnit === "bch"
  //     ? " tBCH"
  //     : " tsats";
  // const displayUnitLong =
  //   store.network === "mainnet"
  //     ? settingsStore.bchUnit === "bch"
  //       ? " BCH"
  //       : " satoshis"
  //     : settingsStore.bchUnit === "bch"
  //     ? " tBCH"
  //     : " testnet satoshis";
  // const addressQrcode = displayBchQr
  //   ? store.wallet?.address
  //   : store.wallet?.tokenaddr;
  // // Functions
  // const switchAddressTypeQr = () => {
  //   setDisplayBchQr(!displayBchQr);
  // };
  // const parseAddrParams = async () => {
  //   if (destinationAddr.includes("?amount=")) {
  //     const [address, params] = destinationAddr.split("?");
  //     setDestinationAddr(address);
  //     let bchAmount = Number(params.split("amount=")[1]);
  //     if (settingsStore.bchUnit === "sat") {
  //       bchAmount = Math.round(bchAmount * 100_000_000);
  //     }
  //     setBchSendAmount(bchAmount);
  //     setCurrencyAmount();
  //   }
  // };
  // const setCurrencyAmount = async () => {
  //   if (typeof bchSendAmount !== "number") {
  //     setCurrencySendAmount(undefined);
  //     return;
  //   }
  //   const newCurrencyValue = await convert(
  //     bchSendAmount,
  //     settingsStore.bchUnit,
  //     settingsStore.currency
  //   );
  //   setCurrencySendAmount(Number(newCurrencyValue.toFixed(2)));
  // };
  // const setBchAmount = async () => {
  //   if (typeof currencySendAmount !== "number") {
  //     setBchSendAmount(undefined);
  //     return;
  //   }
  //   const newBchValue = await convert(
  //     currencySendAmount,
  //     settingsStore.currency,
  //     settingsStore.bchUnit
  //   );
  //   setBchSendAmount(Number(newBchValue));
  // };
  // const useMaxBchAmount = async () => {
  //   if (store.maxAmountToSend?.[settingsStore.bchUnit]) {
  //     setBchSendAmount(store.maxAmountToSend[settingsStore.bchUnit]);
  //     await updateCurrencyBalance();
  //     await setCurrencyAmount();
  //   } else {
  //     alert("Wallet doesn't hold any Bitcoin Cash");
  //   }
  // };
  // const updateCurrencyBalance = async () => {
  //   if (store.balance && store.maxAmountToSend) {
  //     const newFiatValue = await convert(
  //       store.maxAmountToSend[settingsStore.bchUnit] ?? 0,
  //       "bch",
  //       settingsStore.currency
  //     );
  //     const refreshedBalance: BalanceResponse = {
  //       ...store.balance,
  //       [settingsStore.currency]: newFiatValue,
  //     };
  //     // Update store balance here
  //   }
  // };
  // const sendBch = async () => {
  //   try {
  //     if (!store.wallet) return;
  //     if (!destinationAddr) throw new Error("No destination address provided");
  //     if (!bchSendAmount) throw new Error("No valid amount provided");
  //     if (bchSendAmount > (store.maxAmountToSend?.sat ?? 0))
  //       throw new Error("Not enough BCH in wallet");
  //     if (
  //       !destinationAddr.startsWith("bitcoincash:") &&
  //       !destinationAddr.startsWith("bchtest:")
  //     ) {
  //       const networkPrefix =
  //         store.network === "mainnet" ? "bitcoincash:" : "bchtest:";
  //       throw new Error(`Address prefix ${networkPrefix} is required`);
  //     }
  //     const decodedAddress = decodeCashAddress(destinationAddr);
  //     if (typeof decodedAddress === "string")
  //       throw new Error("Invalid BCH address provided");
  //     const sendBchOutput = {
  //       cashaddr: destinationAddr,
  //       value: bchSendAmount,
  //       unit: settingsStore.bchUnit,
  //     };
  //     alert("Sending transaction...");
  //     const { txId } = await store.wallet.send([sendBchOutput]);
  //     const alertMessage = `Sent ${
  //       bchSendAmount + displayUnitLong
  //     } to ${destinationAddr}`;
  //     alert(alertMessage);
  //     console.log(alertMessage);
  //     // Reset fields
  //     setBchSendAmount(undefined);
  //     setCurrencySendAmount(undefined);
  //     setDestinationAddr("");
  //   } catch (error) {
  //     console.error(error);
  //     const errorMessage =
  //       typeof error === "string" ? error : "Something went wrong";
  //     alert(errorMessage);
  //   }
  // };
  // return (
  //   <fieldset
  //     style={{
  //       marginTop: "20px",
  //       paddingTop: "2rem",
  //       maxWidth: "75rem",
  //       margin: "auto 10px",
  //     }}
  //   >
  //     {store.network === "mainnet" && (
  //       <div style={{ fontSize: "1.2em" }}>
  //         {CurrencyShortNames[settingsStore.currency]} balance:
  //         <span style={{ color: "hsla(160, 100%, 37%, 1)" }}>
  //           {store.balance &&
  //           store.balance[settingsStore.currency] !== undefined
  //             ? `${store.balance[settingsStore.currency].toFixed(2)} ${
  //                 CurrencySymbols[settingsStore.currency]
  //               }`
  //             : ""}
  //         </span>
  //       </div>
  //     )}
  //     <span>
  //       BCH balance:
  //       <span style={{ color: "hsla(160, 100%, 37%, 1)" }}>
  //         {store.balance && store.balance[settingsStore.bchUnit] !== undefined
  //           ? `${numberFormatter.format(
  //               store.balance[settingsStore.bchUnit]
  //             )}${displayUnitLong}`
  //           : ""}
  //       </span>
  //     </span>
  //     {!isMobile ? (
  //       <span>
  //         , Tokens:
  //         <span style={{ color: "hsla(160, 100%, 37%, 1)" }}>
  //           {nrTokenCategories !== undefined
  //             ? `${nrTokenCategories} different categories`
  //             : ""}
  //         </span>
  //       </span>
  //     ) : (
  //       <div style={{ marginBottom: "10px" }}>
  //         Tokens:
  //         <span style={{ color: "hsla(160, 100%, 37%, 1)" }}>
  //           {nrTokenCategories !== undefined
  //             ? `${nrTokenCategories} different categories`
  //             : ""}
  //         </span>
  //       </div>
  //     )}
  //     <div style={{ wordBreak: "break-all" }}>
  //       BCH address:
  //       <span
  //         onClick={() => copyToClipboard(store.wallet?.address)}
  //         style={{ cursor: "pointer" }}
  //       >
  //         <span className="depositAddr">{store.wallet?.address ?? ""}</span>
  //         <img className="copyIcon" src="images/copyGrey.svg" alt="copy" />
  //       </span>
  //     </div>
  //     {/* <qr-code
  //       contents={addressQrcode}
  //       onClick={() => copyToClipboard(addressQrcode)}
  //       className="qr-code"
  //     >
  //       <img
  //         src={displayBchQr ? "images/bch-icon.png" : "images/tokenicon.png"}
  //         slot="icon"
  //         alt="icon"
  //       />
  //     </qr-code> */}
  //     <div style={{ textAlign: "center" }}>
  //       <div
  //         id="switchAddress"
  //         className="icon"
  //         onClick={switchAddressTypeQr}
  //         style={{
  //           fontSize: "20px",
  //           fontWeight: 700,
  //           width: "fit-content",
  //           margin: "auto",
  //           marginTop: "-5px",
  //           cursor: "pointer",
  //         }}
  //       >
  //         ⇄
  //       </div>
  //     </div>
  //     <div style={{ marginTop: "5px" }}>
  //       Send BCH:
  //       <input
  //         value={destinationAddr}
  //         onChange={(e) => {
  //           setDestinationAddr(e.target.value);
  //           parseAddrParams();
  //         }}
  //         id="destinationAddr"
  //         placeholder="address"
  //       />
  //       <span className="sendAmountGroup">
  //         <span style={{ position: "relative", width: "50%" }}>
  //           <input
  //             value={bchSendAmount || ""}
  //             onChange={(e) => {
  //               setBchSendAmount(Number(e.target.value));
  //               setCurrencyAmount();
  //             }}
  //             id="sendAmount"
  //             type="number"
  //             placeholder="amount"
  //           />
  //           <i className="input-icon" style={{ color: "black" }}>
  //             {bchDisplayUnit}
  //           </i>
  //         </span>
  //         <button onClick={useMaxBchAmount} className="fillInMaxBch">
  //           max
  //         </button>
  //       </span>
  //     </div>
  //     <input
  //       onClick={sendBch}
  //       type="button"
  //       className="primaryButton"
  //       id="send"
  //       value="Send"
  //       style={{ marginTop: "8px" }}
  //     />
  //   </fieldset>
  // );
  return <></>;
}

// Add the original CSS
// const style = `
// .qr-code {
//   display: block;
//   cursor: pointer;
//   width: 230px;
//   height: 230px;
//   margin: 5px auto 0 auto;
//   background-color: #fff;
// }
// `;

// const styleSheet = document.createElement("style");
// styleSheet.type = "text/css";
// styleSheet.innerText = style;
// document.head.appendChild(styleSheet);
