# Crypto Dashboard with Metamask

## About The Project
This project is a Crypto Dashboard Web Application built with **React**, **ethers.js**, **Tailwind CSS**, and **Moralis**. It allows users to connect with **MetaMask**, view live cryptocurrency data, and seamlessly convert **ETH** to **wETH**. The application is compatible with **Ethereum Mainnet** and **Sepolia Testnet**, providing a flexible environment for testing and real transactions. Additionally, it features real-time notifications and error handling with **react-hot-toast**, ensuring a smooth and user-friendly experience.

## Technical Description 

- **React**: A JavaScript library for building user interfaces.
- **ethers.js**: Ethereum library for interacting with the blockchain.
- **Tailwind**: CSS framework for rapidly building custom designs.
- **Moralis**: Live crypto data fetching service.
- **Vite**: Frontend development server for faster and smoother development.
- **react-hot-toast**: Handling notifications and errors.

## Installation 

- `git clone https://github.com/Mario1515/monitorApp.git`
- `cd monitorApp`
- `npm install`
- `npm run dev`
- Open in your browser: `http://localhost:5173/`

## Notes 
- The application supports only the **Ethereum Mainnet** and **Sepolia Testnet**. If the network is changed, the user will be prompted to switch back to one of the supported networks for continued use.
- It integrates with the **Moralis API** for live crypto price data. If the daily API request limit is exceeded, the app will automatically fall back to using 24-hour historic data for displaying cryptocurrency prices.
  
## Preview
![image](https://github.com/user-attachments/assets/c191dfcc-c303-4041-acac-a0c9577c3602)

![image](https://github.com/user-attachments/assets/cf285367-44df-4fa2-985f-82ca70ca776b)
