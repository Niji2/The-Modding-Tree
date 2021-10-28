addLayer("j", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "J", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "juicer points", // Name of prestige currency
    baseResource: "juice", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "j", description: "J: Reset for Juicer Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Juicer Upgrade 1",
            description: "Double your Juice gain!",
            cost: new Decimal(1),
        },
        12: {
            title: "Juicer Upgrade 2",
            description: "Gain more Juice based on your Juicer Points!",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        }
    },
    doReset(resettingLayer){
        let keep = []
        if(resettingLayer == this.layer) return
        if (resettingLayer == "sb" && hasUpgrade('sb', 12)) keep.push("upgrades")
        layerDataReset(this.layer, keep) 
    },
    layerShown(){return true}
})
addLayer("sb", {
    name: "Sussy Baka",
    symbol: "SB",
    position: "A",
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "sussy bakas", // Name of prestige currency
    baseResource: "juicer points", // Name of resource prestige is based on
    baseAmount() {return player.j.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade(this.layer, 13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for Sussy Bakas", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Be a bit more Sussy",
            description: "^ your juice gain",
            cost: new Decimal(1),
        },
        12: {
            title: "Be a bit more Baka",
            description: "Keep your Juicer Point upgrade on reset",
            cost: new Decimal(5),
        },
        13: {
            title: "Be a bit more Sussy Baka",
            description: "Doubles your Sussy Baka gain",
            cost: new Decimal(10),
        }
    }    
})