var NFTcontractabi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "nftCollection","type": "address"},{"indexed": false,"internalType": "uint256","name": "maxBuyPrice","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "expirationDate","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "balance","type": "uint256"}],"name": "NewSubscription","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "u","type": "uint256"}],"name": "emitU256","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256[]","name": "u","type": "uint256[]"}],"name": "emitU256Array","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "subId","type": "uint256"}],"name": "expiredSubWithNft","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "nftCollection","type": "address"},{"indexed": false,"internalType": "uint256","name": "tokenId","type": "uint256"}],"name": "tokenBought","type": "event"},{"inputs": [{"internalType": "uint256","name": "_subId","type": "uint256"}],"name": "addETHToSubscription","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "address","name": "_newWhitelistAddress","type": "address"}],"name": "addWhitelistedAddress","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_oldUserAddress","type": "address"},{"internalType": "address","name": "_newUserAddress","type": "address"}],"name": "changeUserAddress","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address[14]","name": "addrs","type": "address[14]"},{"internalType": "uint256[18]","name": "uints","type": "uint256[18]"},{"internalType": "uint8[8]","name": "feeMethodsSidesKindsHowToCalls","type": "uint8[8]"},{"internalType": "bytes","name": "calldataBuy","type": "bytes"},{"internalType": "bytes","name": "calldataSell","type": "bytes"},{"internalType": "bytes","name": "replacementPatternBuy","type": "bytes"},{"internalType": "bytes","name": "replacementPatternSell","type": "bytes"},{"internalType": "bytes","name": "staticExtradataBuy","type": "bytes"},{"internalType": "bytes","name": "staticExtradataSell","type": "bytes"},{"internalType": "uint8[2]","name": "vs","type": "uint8[2]"},{"internalType": "bytes32[5]","name": "rssMetadata","type": "bytes32[5]"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "createOrder","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "emergencyWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_nftCollectionAddress","type": "address"}],"name": "extendSubscription","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "uint256[]","name": "","type": "uint256[]"},{"internalType": "bytes","name": "","type": "bytes"}],"name": "onERC1155BatchReceived","outputs": [{"internalType": "bytes4","name": "","type": "bytes4"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "bytes","name": "","type": "bytes"}],"name": "onERC1155Received","outputs": [{"internalType": "bytes4","name": "","type": "bytes4"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "bytes","name": "","type": "bytes"}],"name": "onERC721Received","outputs": [{"internalType": "bytes4","name": "","type": "bytes4"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_whitelistedAddress","type": "address"}],"name": "removeWhitelistedAddress","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_subId","type": "uint256"}],"name": "revokeSubscription","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_withdrawFee","type": "uint256"},{"internalType": "uint256","name": "_globalExtensionFee","type": "uint256"},{"internalType": "uint256","name": "_globalSubscriptionFee","type": "uint256"}],"name": "setGlobalFees","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bool","name": "_allowNewSubscription","type": "bool"},{"internalType": "bool","name": "_allowNewSubscriptionForWhitelistedOnly","type": "bool"}],"name": "setGlobalSubscriptionCreationAutorization","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bool","name": "_state","type": "bool"}],"name": "setGlobalUsersCreationAutorization","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_nftCollectionAddress","type": "address"},{"internalType": "bool","name": "_ban","type": "bool"}],"name": "setNftCollectionBanState","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_userAddress","type": "address"},{"internalType": "bool","name": "_authorized","type": "bool"}],"name": "setUserAutorization","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_userAddress","type": "address"},{"internalType": "uint256","name": "_userFee","type": "uint256"}],"name": "setUserFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_nftCollectionAddress","type": "address"},{"internalType": "uint256","name": "_maxBuyPriceForTokenInCollection","type": "uint256"}],"name": "subscribe","outputs": [],"stateMutability": "payable","type": "function"},{"inputs": [{"internalType": "address","name": "_newBotAddress","type": "address"}],"name": "transferBotOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_newOwnerAddress","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawAllForUser","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawAllNFT","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_amount","type": "uint256"}],"name": "withdrawDevBalance","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_nftContract","type": "address"},{"internalType": "uint256","name": "_tokenId","type": "uint256"}],"name": "withdrawNFT","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_subId","type": "uint256"}],"name": "withdrawSubscription","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_bot","type": "address"},{"internalType": "address","name": "_devTeam","type": "address"},{"internalType": "address","name": "_opensea","type": "address"},{"internalType": "address[]","name": "_whitelistAddresses","type": "address[]"},{"internalType": "uint256","name": "_withdrawFee","type": "uint256"},{"internalType": "uint256","name": "_globalSubscriptionFee","type": "uint256"},{"internalType": "uint256","name": "_globalExtensionFee","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [{"internalType": "address","name": "_nftCollection","type": "address"},{"internalType": "uint256[]","name": "_prices","type": "uint256[]"}],"name": "checkIfOrdersValid","outputs": [{"internalType": "bool[]","name": "","type": "bool[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getAddresses","outputs": [{"internalType": "address[3]","name": "","type": "address[3]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getCreationAutorization","outputs": [{"internalType": "bool","name": "","type": "bool"},{"internalType": "bool","name": "","type": "bool"},{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getDevTeamBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getFees","outputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getMyBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_collectionAdr","type": "address"}],"name": "getMyBalanceForSubscription","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getMyFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getMySubscriptions","outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"components": [{"internalType": "address","name": "nftCollection","type": "address"},{"internalType": "uint256","name": "balance","type": "uint256"},{"internalType": "uint256","name": "maxBuyPrice","type": "uint256"},{"internalType": "uint64","name": "expirationDate","type": "uint64"},{"internalType": "uint256","name": "userId","type": "uint256"},{"components": [{"internalType": "uint256","name": "tokenId","type": "uint256"},{"internalType": "uint32","name": "amount","type": "uint32"}],"internalType": "struct askipNftBotContract.Token[]","name": "tokenBought","type": "tuple[]"}],"internalType": "struct askipNftBotContract.Subscription","name": "subscription","type": "tuple"}],"internalType": "struct askipNftBotContract.linkIdSubs[]","name": "","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_nftCollectionAddress","type": "address"}],"name": "getNftCollectionBanState","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getSubscriptions","outputs": [{"components": [{"internalType": "uint256","name": "id","type": "uint256"},{"components": [{"internalType": "address","name": "nftCollection","type": "address"},{"internalType": "uint256","name": "balance","type": "uint256"},{"internalType": "uint256","name": "maxBuyPrice","type": "uint256"},{"internalType": "uint64","name": "expirationDate","type": "uint64"},{"internalType": "uint256","name": "userId","type": "uint256"},{"components": [{"internalType": "uint256","name": "tokenId","type": "uint256"},{"internalType": "uint32","name": "amount","type": "uint32"}],"internalType": "struct askipNftBotContract.Token[]","name": "tokenBought","type": "tuple[]"}],"internalType": "struct askipNftBotContract.Subscription","name": "subscription","type": "tuple"}],"internalType": "struct askipNftBotContract.linkIdSubs[]","name": "","type": "tuple[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_userAddress","type": "address"}],"name": "getUserAutorization","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_userAddress","type": "address"}],"name": "getUserBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_userAddress","type": "address"}],"name": "getUserFee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getWhitelistedAddresses","outputs": [{"internalType": "address[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "bytes4","name": "interfaceId","type": "bytes4"}],"name": "supportsInterface","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"}]