package com.hogwarts.wedding.model;

import java.util.List;

/**
 * Represents the four historical houses of Hogwarts School of Witchcraft and Wizardry.
 */
public enum HogwartsHouse {
    GRYFFINDOR(
        "Gryffindor",
        "#740001",
        "#D3A625",
        "Lion",
        "Where dwell the brave at heart, their daring, nerve, and chivalry set Gryffindors apart.",
        List.of("Courage", "Bravery", "Determination", "Chivalry")
    ),
    SLYTHERIN(
        "Slytherin",
        "#1A472A",
        "#AAAAAA",
        "Serpent",
        "Where you will make your real friends, those cunning folk use any means to achieve their ends.",
        List.of("Ambition", "Cunning", "Resourcefulness", "Leadership")
    ),
    RAVENCLAW(
        "Ravenclaw",
        "#0E1A40",
        "#946B2D",
        "Eagle",
        "Where those of wit and learning will always find their kind.",
        List.of("Intelligence", "Wisdom", "Creativity", "Curiosity")
    ),
    HUFFLEPUFF(
        "Hufflepuff",
        "#ECB939",
        "#372E29",
        "Badger",
        "Where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil.",
        List.of("Loyalty", "Patience", "Fair Play", "Kindness")
    );

    private final String displayName;
    private final String primaryColor;
    private final String secondaryColor;
    private final String mascot;
    private final String motto;
    private final List<String> traits;

    HogwartsHouse(String displayName, String primaryColor, String secondaryColor, String mascot, String motto, List<String> traits) {
        this.displayName = displayName;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        this.mascot = mascot;
        this.motto = motto;
        this.traits = traits;
    }

    public String getDisplayName() { return displayName; }
    public String getPrimaryColor() { return primaryColor; }
    public String getSecondaryColor() { return secondaryColor; }
    public String getMascot() { return mascot; }
    public String getMotto() { return motto; }
    public List<String> getTraits() { return traits; }

    public static HogwartsHouse fromString(String name) {
        for (HogwartsHouse house : values()) {
            if (house.name().equalsIgnoreCase(name) || house.displayName.equalsIgnoreCase(name)) {
                return house;
            }
        }
        return GRYFFINDOR;
    }
}