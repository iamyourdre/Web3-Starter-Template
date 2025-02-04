import React, { useEffect, useState } from 'react';
import useWallet from '../hooks/useWallet';
import Loading from './Loading';
import { FaLinkSlash, FaWallet } from 'react-icons/fa6';
import { CiCircleCheck } from "react-icons/ci";

const ConnectWallet = () => {
  const { wallet, connectMetamask, disconnectWallet, loading, error, setError } = useWallet();
  const [walletTypeSelected, setWalletTypeSelected] = useState(null);

  const walletTypes = [
    {
      name: 'Metamask',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/768px-MetaMask_Fox.svg.png',
      popular: true,
      connect: connectMetamask,
    },
  ];
  
  useEffect(() => {
    if (wallet) {
      setTimeout(() => {
        document.getElementById('connect_modal').close();
      }, 1000);
    }
  }, [wallet]);

  useEffect(() => {
    if(error) {
      setWalletTypeSelected(null);
    }
  }, [error]);

  return (
    <>

      {wallet ? (
        <button className="btn btn-neutral btn-outline rounded-lg flex" onClick={()=>{
          document.getElementById('connect_modal').showModal();
          setError(null);
        }}>
          <FaWallet /> {wallet.slice(0, 5)}..{wallet.slice(-4)}
        </button>
      ) : (
        <button className="btn btn-neutral rounded-lg" onClick={()=>{
          document.getElementById('connect_modal').showModal();
          setError(null);
        }}>
          Connect Wallet
        </button>
      )}
      
      <dialog id="connect_modal" className="modal h-screen">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5">✕</button>
          </form>

          {!wallet && (
            <div className="flex flex-col gap-3">

              {loading ? (
                <div className="flex flex-col gap-4 border rounded-lg py-8">
                  <div className="items-center justify-center flex h-28">
                    {walletTypeSelected ? (
                      <img src={walletTypeSelected.icon} alt={walletTypeSelected.name} className='h-11 absolute z-10'/>
                    ): null}
                    <Loading addClass={'w-28 opacity-50'} />
                  </div>
                  <span className='text-md text-gray-500 text-md text-center'>
                    <p>Connecting to {walletTypeSelected ? walletTypeSelected.name : "Wallet"}</p>
                    <p>Please accept any request</p>
                  </span>
                </div>
                ) : (
                  <>
                    <h1 className="font-semibold text-xl">Connect Wallet</h1>
                    {error ? (
                      <p className='text-md text-red-600 text-md'>
                        {error}
                      </p>
                    ) : (
                      <p className='text-md text-gray-500 text-md'>
                        Select a wallet to continue.
                      </p>
                    )}
                  </>
                )
              }
              <div className="flex flex-col gap-1 font-medium text-lg">
                {walletTypes.map((walletType, index) => (
                  <button key={index} disabled={loading} onClick={() => {
                    walletType.connect();
                    setWalletTypeSelected(walletType);
                  }} className={`flex items-center border p-2.5 gap-2.5 rounded-lg ${loading ? 'bg-gray-200' : 'bg-white'}`}>
                    <img src={walletType.icon} alt={walletType.name} className='h-11'/>
                    <span className='flex-1 text-left'>{walletType.name}</span>
                    {walletType.popular && (
                      <div className="badge p-2 badge-ghost">
                        Popular
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {wallet && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-4 border rounded-lg py-8">
                <div className="items-center justify-center flex h-28">
                  {/* {walletTypeSelected ? (
                    <img src={walletTypeSelected.icon} alt={walletTypeSelected.name} className='h-11 absolute z-10'/>
                  ): null} */}
                  <CiCircleCheck className='text-8xl text-green-500' />
                  {/* <Loading addClass={'w-28 opacity-50 text-purple-500'} /> */}
                </div>
                <span className='text-md text-gray-500 text-md text-center'>
                  <p>Wallet Connected!</p>
                  <p className='truncate underline'>{wallet}</p>
                </span>
              </div>
              <div className="flex flex-col gap-1 font-medium text-lg">
                  <button disabled={loading} onClick={disconnectWallet} className={`flex items-center p-2.5 gap-2.5 rounded-lg text-red-500 hover:bg-red-500 hover:text-white border border-red-500`}>
                    <FaLinkSlash className='h-11 ml-1' />
                    <span className='text-left'>Disconnect Wallet</span>
                  </button>
              </div>
            </div>
          )}

        </div>
      </dialog>

    </>
  );
};

export default ConnectWallet;