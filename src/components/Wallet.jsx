import React from "react";
import useAccount from "../hooks/useAccount";
import useLoading from "../hooks/useLoading";
import { useNetwork } from "../context/NetworkContext";
import useBalance from "../hooks/useBalance";
import Dashboard from "./Dashboard";

const Wallet = () => {
  const { account, connectWallet, disconnectWallet } = useAccount();
  const [loading, startLoading] = useLoading(); //loader
  const { network, networkError } = useNetwork(); //checking network for changes
  const { ethBalance, nexoBalance, wethBalance, error } = useBalance(account);

  const handleConnect = () => {
    startLoading(connectWallet);
  };

  const handleDisconnect = () => {
    startLoading(disconnectWallet);
  };

  const isAllowedNetwork = network === "0x1" || network === "0xaa36a7";

  return (
    <div className=" bg-gradient-to-r from-slate-50 to-indigo-600  absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 flex justify-center min-h-screen bg-gray-200 p-4">
      {/* Wallet background   */}
      <div className="bg-gradient-to-b from-neutral-50 to-stone-200 shadow-2xl rounded-2xl p-8 shadow-lg w-full max-w-4xl">
        {/* Crypto Dashboard Logo  */}
        <div className="flex items-center justify-center space-x-2 mb-20">
          <h4 className="text-3xl font-mono tracking-wide text-black-900 text-center">
            Crypto Dashboard
          </h4>
          <h2 className="text-sm font-bold">with </h2>
          <div className="flex justify-center items-center">
  <img
    src="/src/assets/MetamaskLogo.png"
    alt="MetamaskLogo"
    className="lg:w-25 lg:h-10"
  />
</div>
        </div>
        {!account ? (
          <div className="">
            <h3 className="text-center text-sm font-mono mb-2">
              Try it yourself!
            </h3>

            <div className="flex justify-center">
              <button
                onClick={handleConnect}
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 border border-teal-600 rounded shadow flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Connecting...
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* User is using a prohibtet network */}
            {networkError && !isAllowedNetwork && (
              <div
                className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Danger alert!</span> Please
                  switch your network to Etherium in the Metamask extension.
                </div>
              </div>
            )}

            {isAllowedNetwork && (
              <>
                <Dashboard
                  account={account}
                  network={network}
                  ethBalance={ethBalance}
                  nexoBalance={nexoBalance}
                  wethBalance={wethBalance}
                />

                {/* Disconnect Wallet Button */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleDisconnect}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-600 rounded shadow flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 me-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Disconnecting...
                      </>
                    ) : (
                      "Disconnect Wallet"
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
