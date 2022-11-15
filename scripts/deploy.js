const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("guru");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("avengers", {value: hre.ethers.utils.parseEther("0.001")});
    await txn.wait();
    console.log("Minted domain avengers.guru");

    txn = await domainContract.setRecord("avengers", "I am a guru for the avengers");
    await txn.wait();
    console.log("Set record for avengers.guru");

    const address = await domainContract.getAddress("avengers");
    console.log("Owner of domain avengers:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

};

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

runMain();