package com.hogwarts.wedding.model;

import java.time.LocalDateTime;

/**
 * Model representing an invited wedding guest to the Vance-Sterling union.
 */
public class Guest {
    private final String id;
    private final String fullName;
    private final HogwartsHouse house;
    private final boolean attending;
    private final String feastPreference;
    private final String owlMessage;
    private final LocalDateTime registeredAt;

    public Guest(String id, String fullName, HogwartsHouse house, boolean attending, String feastPreference, String owlMessage) {
        this.id = id;
        this.fullName = fullName;
        this.house = house;
        this.attending = attending;
        this.feastPreference = feastPreference;
        this.owlMessage = owlMessage;
        this.registeredAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public String getFullName() { return fullName; }
    public HogwartsHouse getHouse() { return house; }
    public boolean isAttending() { return attending; }
    public String getFeastPreference() { return feastPreference; }
    public String getOwlMessage() { return owlMessage; }
    public LocalDateTime getRegisteredAt() { return registeredAt; }

    @Override
    public String toString() {
        return String.format("Guest[name='%s', house=%s, attending=%b]", fullName, house.getDisplayName(), attending);
    }
}