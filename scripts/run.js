const main = async () => {
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("necks");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);
    // console.log("Contract deployed by:", owner.address);

    const txn = await domainContract.register("turtle", {value: hre.ethers.utils.parseEther("0.0001")});
    await txn.wait();

    const address = await domainContract.getAddress("turtle");
    console.log("Owner of domain mortal:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

    //Trying to set a record that doesn't belong to me! We cant register a domain name for another user
    // txn = await domainContract.connect(randomPerson).setRecord("doom", "ENS Polygon");
    // await txn.wait();
};

const runMain = async () => {
    try{
        await main();
        process.exit(0);
    }catch(error) {
        console.log(error);
        process.exit(1);
    }
}
runMain();