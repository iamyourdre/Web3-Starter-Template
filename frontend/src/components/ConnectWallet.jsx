import React, { useEffect, useState } from 'react';
import useWallet from '../hooks/useWallet';
import Loading from './Loading';
import { FaStar } from 'react-icons/fa';
import { use } from 'react';

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
  
  // useEffect(() => {
  //   if (wallet) {
  //     document.getElementById('connect_modal').close();
  //   }
  // }, [wallet]);

  useEffect(() => {
    if(error) {
      setWalletTypeSelected(null);
    }
  }, [error]);

  return (
    <>
      <button className="btn btn-neutral rounded-full" onClick={()=>{
        document.getElementById('connect_modal').showModal();
        setError(null);
      }}>
        Connect Wallet
      </button>
      
      <dialog id="connect_modal" className="modal h-screen">
        <div className="modal-box">

          {!wallet && (
            <div className="flex flex-col gap-3">
              {!loading && (
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
                </form>
              )}

              {loading ? (
                <div className="flex flex-col gap-4 border rounded-lg py-8 items-center justify-center">
                  <div className="items-center justify-center flex">
                    {walletTypeSelected ? (
                      <img src={walletTypeSelected.icon} alt={walletTypeSelected.name} className='h-11 absolute z-10'/>
                    ): null}
                    <Loading addClass={'w-28 opacity-50'} />
                  </div>
                  <span className='text-md text-gray-500 text-md'>
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
            <div className="flex flex-col gap-4">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
              </form>
              <h1 className="font-semibold text-xl">Connected Wallet</h1>
              <div className="flex gap-2 items-center">
                <FaStar className='text-yellow-400'/>
                <span className='text-lg font-semibold'>
                  {wallet}
                </span>
              </div>
              <button className="btn btn-primary" onClick={disconnectWallet}>
                Disconnect
              </button>
            </div>
          )}

        </div>
      </dialog>

    </>
  );
};

export default ConnectWallet;