package com.hogwarts.wedding.model;

/**
 * Represents a milestone ceremony in the Order of Events.
 */
public record WeddingTimelineEvent(
    int sequenceOrder,
    String timeFormatted,
    String title,
    String location,
    String description,
    String dressCodeAdvice,
    String transportCoordinates
) {}