const { artifacts } = require("truffle");
const FundraiserRegistry = artifacts.require("FundraiserRegistry");
const truffleAssert = require("truffle-assertions");

contract("FundraiserRegistry", async (accounts) => {
  let registryInstance;
  let owner = accounts[0];

  before(async () => {
    registryInstance = await FundraiserRegistry.new();
  });

  it("should allow the owner to register a fundraiser", async () => {
    const fundraiserAddress = accounts[1];
    const result = await registryInstance.registerFundraiser(
      fundraiserAddress,
      { from: owner }
    );

    truffleAssert.eventEmitted(result, "FundraiserRegistered", (ev) => {
      return (
        ev.fundraiserAddress === fundraiserAddress && ev.registeredBy === owner
      );
    });
  });

  it("should retrieve fundraisers", async () => {
    const fundraisers = await registryInstance.getFundraisers();
    assert.equal(fundraisers.length, 1);
    assert.equal(fundraisers[0], accounts[1]);
  });

  it("should allow the owner to remove a fundraiser", async () => {
    const fundraiserAddress = accounts[1];
    const result = await registryInstance.removeFundraiser(fundraiserAddress, {
      from: owner,
    });

    truffleAssert.eventEmitted(result, "FundraiserRemoved", (ev) => {
      return (
        ev.fundraiserAddress === fundraiserAddress && ev.removedBy === owner
      );
    });

    const fundraisers = await registryInstance.getFundraisers();
    assert.equal(fundraisers.length, 0);
  });
});
