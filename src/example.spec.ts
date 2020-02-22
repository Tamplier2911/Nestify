// feature
class FriendList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this._anounceFriendship(name);
  }

  removeFriend(name) {
    // this.friends = this.friends.filter(friend => friend !== name);
    const index = this.friends.indexOf(name);
    if (index === -1) throw Error("No such friend were found.");
    this.friends.splice(index, 1);
  }

  _anounceFriendship(name) {
    global.console.log(`${name} is now my friend.`);
  }
}

// test
describe("FriendList", () => {
  let friendsList;
  beforeEach(() => {
    friendsList = new FriendList();
  });

  it("initialize friend list", () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it("add friend to the list", () => {
    friendsList.addFriend("Rebecca");
    expect(friendsList.friends.length).toEqual(1);
    expect(friendsList.friends[0]).toEqual("Rebecca");
  });

  it("remove freind from the list", () => {
    friendsList.addFriend("Molly");
    expect(friendsList.friends.length).toEqual(1);
    friendsList.removeFriend("Molly");
    expect(friendsList.friends.length).toEqual(0);
    expect(() => friendsList.removeFriend("John")).toThrow();
  });

  it("annouces friendship", () => {
    friendsList._anounceFriendship = jest.fn();
    expect(friendsList._anounceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend("Clara");
    expect(friendsList._anounceFriendship).toHaveBeenCalledTimes(1);
  });
});

// mock
// friendList._anounceFriendship = jest.fn();
