// Character Class:
class Character {
  //STATIC CHARACTER CLASS PROPERTIES:
  static MAX_HEALTH = 100; // Sets max health as a characteristic of all characters.

  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  //Roll method on character class:
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod; //Rolls a D20
    console.log(`${this.name} rolled a ${result}.`);
  }
}

//Class for Adventurer, child class of Character
class Adventurer extends Character {
  //STATIC ADVENTURER CLASS PROPERTIES:
  static ROLES = ["Fighter", "Healer", "Wizard"];

  constructor(name, role, companion = null) {
    //Add a check to the constructor of the Adventurer class that ensures the given role matches one of these values:
    if (!Adventurer.ROLES.includes(role)) {
      //If the ROLES static property does not contain the passed in argument of roll...
      throw new Error(
        `${role} is not a valid role. Valid roles are: ${Adventurer.ROLES.join(
          ", "
        )}`
      ); //Throw an error
    }

    super(name);
    // Adventurers have specialized roles.
    this.role = role;
    // Every adventurer starts with a bed and 50 gold coins.
    this.inventory.push("bedroll", "50 gold coins");
    //For the optional companion:
    this.companion = companion;
  }
  // Adventurers have the ability to scout ahead of them.
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
  // Adventurers have the ability to gather herb materials.
  gather() {
    console.log(`${this.name} is gathering materials...`);
    this.inventory.push("herbs");
  }
  duel(opponent) {
    if (!(opponent instanceof Adventurer)) {
      throw new Error("Duel can only be conducted between Adventurers.");
    }
    console.log(
      `Duel starts between ${this.name} (the ${this.role}) and ${opponent.name} (the ${opponent.role})!`
    );

    while (this.health > 50 && opponent.health > 50) {
      //While my and my opponents health are both above 50...
      const myRoll = super.roll();
      const opponentRoll = opponent.roll();
      if (myRoll > opponentRoll) {
        opponent.health -= 1;
        console.log(
          `${this.name} hits ${opponent.name}, ${opponent.name} loses 1 health (${opponent.name} health now ${opponent.health})`
        );
      } else if (myRoll < opponentRoll) {
        this.health -= 1;
        console.log(
          `${opponent.name} hits ${this.name}, ${this.name} loses 1 health (${this.name} health now ${this.health})`
        );
      } else {
        console.log("Both adventurers stand firm. It's a tie for this round.");
      }
      if (this.health <= 50 || opponent.health <= 50) {
        //If either of our health's drops below 50...
        const winner =
          this.health > opponent.health ? this.name : opponent.name; //If my health is greater declar me winner or else declare my opponent the winner
        console.log(`Duel ends. Winner is ${winner}!`);
        break;
      }
    }
  }
}

// Companion class with properties and methods specific to the companions.
class Companion extends Character {
  constructor(name, type, companion = null) {
    //defaults the companion's companion to null, but can be added optionally
    super(name);
    // Companions have specific types.
    this.type = type;
    // Every companion starts with food and a bedroll.
    this.inventory.push("food", "bedroll");
    //For the optional companion's companion:
    this.companion = companion;
  }
  // Companions have the ability to follow.
  follow() {
    console.log(`${this.name} is following you...`);
    //Pseudo code here for the ability to follow the character
  }
  // Companions have the ability to scout.
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
  // Companions have the ability to seek small treasures.
  treasureHunt() {
    console.log(`${this.name} is looking around for small shiiny things...`);
    super.roll();
  }
}

// First, define Frank
const frank = new Companion("Frank", "Flea");
frank.inventory.push("small hat", "sunglasses");

// Then, define Leo with Frank as his companion
const leo = new Companion("Leo", "Cat", frank);

// Finally, define Robin with Leo as his companion
const robin = new Adventurer("Robin", "Wizard", leo);
robin.inventory = ["sword", "potion", "artifact"];

robin.inventory.forEach((item) => {
  console.log(item);
});

robin.roll();
leo.roll();

frank.inventory.forEach((item) => {
  console.log(item);
});

///////////////////////////////////////////////////////////////////
//AdventurerFactory - Make as many adventurers as we want!
class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

//Create a healer factory
const healers = new AdventurerFactory("Healer");
//Create as many specifically named healers as we want, here we are just making 1 though:
const robin = healers.generate("Robin");
///////////////////////////////////////////////////////////////////
