import { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { WalletContext } from '../contexts/WalletContext';
import { toast } from 'react-hot-toast';

const useWallet = () => {
  const { wallet, setWallet } = useContext(WalletContext);
  const [etherBalance, setEtherBalance] = useState(null);
  const [autoConnect, setAutoConnect] = useState(false); // Set to true to auto-connect to MetaMask
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectMetamask = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setWallet(accounts[0]);

        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }], // Sepolia chain ID
        });

        const etherBalance = await web3.eth.getBalance(accounts[0]);
        setEtherBalance(web3.utils.fromWei(etherBalance, 'ether'));
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError('You need to install MetaMask to connect to this app');
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setEtherBalance(null);
    setAutoConnect(false);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (autoConnect) {
        await connectMetamask();
        return () => {};
      }
    };
    checkWalletConnection();
  }, [autoConnect]);

  return { wallet, connectMetamask, disconnectWallet, etherBalance, error, setError, loading, setLoading, setAutoConnect };
};

export default useWallet;