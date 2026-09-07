package com.hogwarts.wedding.service;

import com.hogwarts.wedding.model.Guest;
import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * Service simulating the enchanted Owlery dispatch message queue.
 */
public class OwlPostDispatcher {

    public record DispatchedOwl(String trackingId, Guest guest, long flightDurationMs, String waxSealType) {}

    private final ConcurrentLinkedQueue<DispatchedOwl> activeFlights = new ConcurrentLinkedQueue<>();

    public DispatchedOwl dispatchScroll(Guest guest) {
        String trackingId = "OWL-" + System.currentTimeMillis();
        long duration = 3000 + (long) (Math.random() * 2000);
        String seal = guest.isAttending() ? "Imperial Crimson Dragon Wax" : "Silver Mourning Wax";

        DispatchedOwl owl = new DispatchedOwl(trackingId, guest, duration, seal);
        activeFlights.add(owl);
        return owl;
    }

    public int getInFlightCount() {
        return activeFlights.size();
    }
}