package com.hogwarts.wedding.model;

import java.util.UUID;

/**
 * Model representing a Platform 9 3/4 Hogwarts Express Ticket.
 */
public class TicketPassage {
    private final String ticketNumber;
    private final String passengerName;
    private final String originStation;
    private final String destinationStation;
    private final String departureDate;
    private final String carriage;
    private final String seatingClass;
    private final String platform;

    public TicketPassage(String passengerName) {
        this.ticketNumber = "HOG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        this.passengerName = passengerName == null || passengerName.isBlank() ? "Honored Guest" : passengerName;
        this.originStation = "London King's Cross";
        this.destinationStation = "Hogwarts Castle Viaduct";
        this.departureDate = "31st October 2026, 11:00 AM Prompt";
        this.carriage = "Always";
        this.seatingClass = "First Class Enchanted";
        this.platform = "9 ¾";
    }

    public String getTicketNumber() { return ticketNumber; }
    public String getPassengerName() { return passengerName; }
    public String getOriginStation() { return originStation; }
    public String getDestinationStation() { return destinationStation; }
    public String getDepartureDate() { return departureDate; }
    public String getCarriage() { return carriage; }
    public String getSeatingClass() { return seatingClass; }
    public String getPlatform() { return platform; }
}